varying vec3 vPos;

uniform float uTime;
uniform float uDelta;

void main () {
    vec4 mvPos = vec4(position, 1.0);
	gl_Position = projectionMatrix * modelViewMatrix * mvPos; 
}