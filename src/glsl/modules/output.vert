varying vec2 vUv;

uniform float uTime;
uniform float uDelta;

void main () {
    vUv = uv;
    vec3 p = position;
    float s = sin(uTime * 4.0 + p.x * 60.0) * 50.0;
    p.z += s;

	vec4 mvPos = vec4(p, 1.0);
	gl_Position = projectionMatrix * modelViewMatrix * mvPos; 
}