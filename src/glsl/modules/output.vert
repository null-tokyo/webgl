varying vec2 vUv;
varying vec3 vPos;

uniform float uTime;
uniform float uDelta;

void main () {
    vUv = uv;
    vec3 p = position;

    float s = (sin(uTime * 2.0 + p.x) + 1.23) + sin(uTime * 1.23 + p.x * 2.123) + sin(uTime * 5.0 + p.x * 0.5);
    s = s * 0.33333;

    p.z += s * 20.0;

    vPos = p;

	vec4 mvPos = vec4(p, 1.0);
	gl_Position = projectionMatrix * modelViewMatrix * mvPos; 
}