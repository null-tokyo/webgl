varying vec3 vPos;

uniform float uTime;

void main () {
    vec3 normal = normalize(cross(dFdx(vPos), dFdy(vPos)));
    vec3 light = normalize(vec3(cos(uTime * 3.0), 1.0, sin(uTime * 3.0)));
    float diffuse = clamp(dot(normal, light), 0.1, 1.0);
    vec3 color = vec3(1.0, 1.0, 1.0) * diffuse;

    float d = length(color);

    color = mix(vec3(0.5522, 0.5977, 1.0000), vec3(0.7936, 0.9777, 0.3487), d);
    
    gl_FragColor = vec4(color, 1.0);
}