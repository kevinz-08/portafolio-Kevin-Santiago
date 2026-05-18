import { useEffect, useRef } from 'react'

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
precision mediump float;
uniform vec2  u_res;
uniform float u_time;

vec3 mod289(vec3 x){ return x - floor(x*(1./289.))*289.; }
vec4 mod289(vec4 x){ return x - floor(x*(1./289.))*289.; }
vec4 permute(vec4 x){ return mod289(((x*34.)+1.)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }

float snoise(vec3 v){
  const vec2 C = vec2(1./6., 1./3.);
  const vec4 D = vec4(0., .5, 1., 2.);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g  = step(x0.yzx, x0.xyz);
  vec3 l  = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z+vec4(0.,i1.z,i2.z,1.))
    +i.y+vec4(0.,i1.y,i2.y,1.))
    +i.x+vec4(0.,i1.x,i2.x,1.));
  float n_ = .142857142857;
  vec3 ns = n_*D.wyz - D.xzx;
  vec4 j  = p - 49.*floor(p*ns.z*ns.z);
  vec4 x_ = floor(j*ns.z);
  vec4 y_ = floor(j - 7.*x_);
  vec4 x  = x_*ns.x + ns.yyyy;
  vec4 y  = y_*ns.x + ns.yyyy;
  vec4 h  = 1. - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.+1.;
  vec4 s1 = floor(b1)*2.+1.;
  vec4 sh = -step(h, vec4(0.));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m = max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 42.*dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

// Helper: ribbon contribution — wide body textured + thin bright spine
float ribbon(float dist, float bodyR, float spineR, float surf) {
  float body  = smoothstep(bodyR,  0.0, dist) * (0.32 + surf * 0.68);
  float spine = smoothstep(spineR, 0.0, dist) * 0.40;
  return body + spine;
}

// Helper: hair strand — very thin, wispy
float strand(float dist, float r, float surf) {
  return smoothstep(r, 0.0, dist) * (0.20 + surf * 0.45);
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  float t = u_time * 0.036;

  vec2 p = vec2(uv.x * aspect, uv.y);

  // FBM warp — 3 octaves (dropped w4: negligible 0.04 contribution)
  float w1 = snoise(vec3(p * 0.40,         t * 0.42)) * 0.44;
  float w2 = snoise(vec3(p * 0.85 + 2.30,  t * 0.26)) * 0.20;
  float w3 = snoise(vec3(p * 1.70 - 1.50,  t * 0.17)) * 0.09;
  float warp = w1 + w2 + w3;

  // Independent warp layers — 1 octave each (high-freq octave removed)
  float warpB = snoise(vec3(p * 0.50 + 5.10, t * 0.33)) * 0.38;
  float warpC = snoise(vec3(p * 0.45 - 2.80, t * 0.28)) * 0.34;

  // Directional flow: right → left
  float flow = p.x * 1.3 - t * 0.95;

  // Surface texture — 2 octaves (dropped tex3: 0.22 weight, visually subtle)
  float tex1 = snoise(vec3(flow * 1.5,        uv.y * 3.0, t * 0.78)) * 0.5 + 0.5;
  float tex2 = snoise(vec3(flow * 2.9 + 1.40, uv.y * 6.2, t * 0.56)) * 0.5 + 0.5;
  float surf = tex1 * 0.64 + tex2 * 0.36;

  float diag = (1.0 - uv.x); // contributes to diagonal slope of each ribbon

  // ── 5 main ribbons — spread across full 0→1 vertical range ───────────────
  float c1 = 0.85 + diag * 0.10 + warp;
  float c2 = 0.64 + diag * 0.09 + warp  * 0.82;
  float c3 = 0.43 + diag * 0.11 + warpB * 0.90;
  float c4 = 0.22 + diag * 0.13 + warpC * 0.78;
  float c5 = 0.03 + diag * 0.16 + warp  * 0.55;

  float r1 = ribbon(abs(uv.y - c1), 0.20, 0.055, surf);
  float r2 = ribbon(abs(uv.y - c2), 0.18, 0.048, surf) * 0.88;
  float r3 = ribbon(abs(uv.y - c3), 0.21, 0.060, surf);
  float r4 = ribbon(abs(uv.y - c4), 0.17, 0.045, surf) * 0.82;
  float r5 = ribbon(abs(uv.y - c5), 0.14, 0.035, surf) * 0.60;

  // ── Branching strands — peel off main ribbons with shifted warp ───────────
  float h1 = strand(abs(uv.y - (c2 + 0.09 + warpC * 0.40)), 0.028, surf);
  float h2 = strand(abs(uv.y - (c1 - 0.11 + warpB * 0.35)), 0.022, surf);
  float h3 = strand(abs(uv.y - (c3 + 0.10 + warp  * 0.30)), 0.025, surf);
  float h4 = strand(abs(uv.y - (c4 - 0.08 + warpC * 0.28)), 0.020, surf);
  float h5 = strand(abs(uv.y - (c2 - 0.13 + warpB * 0.32)), 0.018, surf);

  // Soft entry from left edge (ribbons emerge from the left)
  float fadeX = smoothstep(0.0, 0.12, uv.x);

  float total = clamp((r1+r2+r3+r4+r5 + h1+h2+h3+h4+h5) * fadeX, 0.0, 1.0);

  // Combined spine highlight for color pick
  float spines = (
    smoothstep(0.055, 0.0, abs(uv.y - c1)) +
    smoothstep(0.048, 0.0, abs(uv.y - c2)) +
    smoothstep(0.060, 0.0, abs(uv.y - c3))
  ) * fadeX;
  float highlight = clamp(spines * 1.6, 0.0, 1.0);

  vec3 base    = vec3(0.039);
  vec3 bodyCol = vec3(0.12, 0.13, 0.16);
  vec3 peakCol = vec3(0.40, 0.42, 0.46);
  vec3 col = mix(base, mix(bodyCol, peakCol, highlight), total);

  gl_FragColor = vec4(col, 1.0);
}
`

export default function SmokeShader() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return

    const compile = (type, src) => {
      const sh = gl.createShader(type)
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('[SmokeShader] compile error:', gl.getShaderInfoLog(sh))
        gl.deleteShader(sh)
        return null
      }
      return sh
    }

    const vert = compile(gl.VERTEX_SHADER,   VERT)
    const frag = compile(gl.FRAGMENT_SHADER, FRAG)
    if (!vert || !frag) return

    const prog = gl.createProgram()
    gl.attachShader(prog, vert)
    gl.attachShader(prog, frag)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('[SmokeShader] link error:', gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,   1, -1,  -1,  1,
      -1,  1,   1, -1,   1,  1,
    ]), gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes  = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')

    // Cap DPR at 1 — halves pixel count on retina screens (4x fewer shader invocations)
    const MAX_DPR = 1.0

    // ── Resize via ResizeObserver ────────────────────────────────────────────
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      const w   = Math.round(canvas.clientWidth  * dpr)
      const h   = Math.round(canvas.clientHeight * dpr)
      if (canvas.width === w && canvas.height === h) return
      canvas.width  = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    // ── Render loop ──────────────────────────────────────────────────────────
    let startTs  = null
    let raf      = null
    let visible  = true
    let frameIdx = 0

    const render = (ts) => {
      if (!startTs) startTs = ts
      frameIdx++
      // Throttle to ~30fps — ribbons are slow-moving, 30fps is imperceptible
      if (frameIdx % 2 === 0) {
        gl.uniform2f(uRes,  canvas.width, canvas.height)
        gl.uniform1f(uTime, (ts - startTs) * 0.001)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }
      raf = requestAnimationFrame(render)
    }

    // Pause animation when hero scrolls out of view
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !raf) {
          raf = requestAnimationFrame(render)
        } else if (!visible && raf) {
          cancelAnimationFrame(raf)
          raf = null
        }
      },
      { threshold: 0.01 }
    )
    io.observe(canvas)

    raf = requestAnimationFrame(render)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      gl.deleteProgram(prog)
      gl.deleteShader(vert)
      gl.deleteShader(frag)
      gl.deleteBuffer(buf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        zIndex:        0,
        display:       'block',
        pointerEvents: 'none',
      }}
    />
  )
}
