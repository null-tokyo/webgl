varying vec3 vPos;
varying vec3 vColor;

uniform float uTime;
uniform float uDelta;
uniform vec3 uColorArray[2];

attribute vec3 offset;
attribute float colorIndex;

void main () {
    vPos = position + vec3(0.0, uTime / 2.0, 0.0);
    vColor = uColorArray[int(colorIndex)];
    vec4 mvPos = vec4(offset + vPos, 1.0);
	gl_Position = projectionMatrix * modelViewMatrix * mvPos; 
}