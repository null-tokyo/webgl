varying vec2 vUv;

uniform sampler2D uTex;
uniform float uTime;

@import ../util/noise;

void main () {
    vec4 color = texture2D(uTex, vUv);

    // float s = snoise(vUv);
    // s = floor(s * 20.0) / 20.0;
    // s *= 0.01;

    // //Low-Resolution
    // vec2 uv = vUv;
    // uv.x = floor(uv.x * 55.0) / 55.0;
    // uv.y = floor(uv.y * 55.0) / 55.0;

    // color = texture2D(uTex, uv);

    // //invert
    // // color.r = 1.0 - color.r;
    // // color.g = 1.0 - color.g;
    // // color.b = 1.0 - color.b;

    // color.r = texture2D(uTex, uv + vec2(s, 0.0)).r;
    // color.g = texture2D(uTex, uv + vec2(-s, 0.0)).g;


    gl_FragColor = vec4(color.rgb, 1.0);
}