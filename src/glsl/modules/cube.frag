varying vec3 vPos;
varying vec3 vColor;

uniform float uTime;

void main () {
    vec3 normal = normalize(cross(dFdx(vPos), dFdy(vPos)));
    vec3 light = normalize(vec3(cos(uTime * 1.0) * 10.0, 0.0, 10.0));
    float diffuse = clamp(dot(normal, light), 0.1, 1.0);
    vec3 color = vColor * diffuse;

    gl_FragColor = vec4(color, 1.0);
}