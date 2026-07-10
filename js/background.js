// ============================================================================
// background.js — morphing shader gradient-mesh background (WebGL).
// Domain-warped fbm noise mapped to a cold black/ice-cyan field.
// - Pauses when tab hidden.
// - Static CSS-gradient fallback when reduced-motion or no WebGL.
// ============================================================================

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform vec2  uPointer;

// hash + value noise
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i+vec2(0,0)), hash(i+vec2(1,0)), u.x),
             mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = uv;
  p.x *= uRes.x / uRes.y;

  float t = uTime * 0.04;
  // domain warp for a flowing "mesh" feel
  vec2 q = vec2(fbm(p*1.4 + vec2(0.0, t)), fbm(p*1.4 + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p*1.8 + 3.0*q + vec2(1.7, 9.2) + t*0.5),
                fbm(p*1.8 + 3.0*q + vec2(8.3, 2.8) - t*0.5));
  float f = fbm(p*1.6 + 2.5*r);

  // pointer influence — gentle brightening near cursor
  float d = distance(uv, uPointer);
  float glow = smoothstep(0.45, 0.0, d) * 0.10;

  vec3 base   = vec3(0.020, 0.023, 0.027);   // true cold black
  vec3 deep    = vec3(0.02, 0.09, 0.12);     // deep teal shadow
  vec3 accent  = vec3(0.133, 0.827, 0.933);  // ice-cyan #22d3ee

  vec3 col = mix(base, deep, smoothstep(0.35, 0.75, f));
  col += accent * pow(f, 3.5) * 0.14;         // sparse cyan filaments
  col += accent * glow;

  // vignette toward edges keeps focus centered
  float vig = smoothstep(1.15, 0.25, length(uv - 0.5));
  col *= mix(0.55, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn("shader:", gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

function staticFallback(canvas) {
  canvas.style.background =
    "radial-gradient(60% 50% at 50% 0%, rgba(34,211,238,0.06), transparent 60%)," +
    "radial-gradient(40% 40% at 80% 90%, rgba(34,211,238,0.04), transparent 60%)," +
    "linear-gradient(180deg, #06090b, #050506)";
}

export function initBackground() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gl = !reduce && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  if (!gl) { staticFallback(canvas); return; }

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) { staticFallback(canvas); return; }

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, "uRes");
  const uTime = gl.getUniformLocation(prog, "uTime");
  const uPointer = gl.getUniformLocation(prog, "uPointer");

  const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  window.addEventListener("pointermove", (e) => {
    pointer.tx = e.clientX / window.innerWidth;
    pointer.ty = 1.0 - e.clientY / window.innerHeight;
  }, { passive: true });

  let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.floor(window.innerWidth * dpr);
    const h = Math.floor(window.innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  }
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
  resize();

  const start = performance.now();
  let running = true;
  let raf;
  function frame(now) {
    if (!running) return;
    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, (now - start) / 1000);
    gl.uniform2f(uPointer, pointer.x, pointer.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { running = false; cancelAnimationFrame(raf); }
    else if (!running) { running = true; raf = requestAnimationFrame(frame); }
  });
}
