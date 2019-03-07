varying vec2 vUv;

uniform sampler2D tDiffuse1;
uniform sampler2D tDiffuse2;
uniform float uMixBrend;

void main () {
    vec4 texel1 = texture2D( tDiffuse1, vUv );
    vec4 texel2 = texture2D( tDiffuse2, vUv );
    gl_FragColor = mix( texel1, texel2, uMixBrend );
}