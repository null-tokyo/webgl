varying vec3 vPos;
varying vec3 vColor;
varying mat4 vNormalMat;
varying vec3 vNormal;
varying float vFogFactor;

//varying vec3 normal;
uniform vec3 uFogColor;

void main () {
    vec3 color = mix(uFogColor, vColor, vFogFactor);
    gl_FragColor = vec4(color, 1.0);
}