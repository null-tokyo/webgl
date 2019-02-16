varying vec2 vUv;
varying vec3 vPos;

uniform sampler2D uTex;
uniform float uTime;

@import ../util/noise;

void main () {
    vec3 light = normalize(vec3(0.0 + sin(uTime), 1.0, 1.0));
    vec3 normal = normalize(cross(dFdx(vPos), dFdy(vPos)));
    float diffuse = clamp(dot(normal, light), 0.1, 1.0);
    float s = snoise(vUv + uTime * 0.4) * 2.0 - 1.0;
    s *= 0.005;
    vec4 color = texture2D(uTex, vUv + s);
    //vec2 ruv = vec2(vUv.x + 100.0, vUv.y);
    vec4 r = texture2D(uTex, vec2(vUv + s));
    vec4 b = texture2D(uTex, vec2(vUv.x - 1.0, vUv.y - 1.0));

    gl_FragColor = vec4(r.r, color.gba);
}