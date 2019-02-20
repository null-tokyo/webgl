varying vec2 vUv;

uniform float uTime;
uniform float uDelta;

void main () {
    vUv = uv;
	vec4 mvPos = vec4(position, 1.0);
	gl_Position = projectionMatrix * modelViewMatrix * mvPos; 
}