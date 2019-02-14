vec3 noiseEffect (vec2 st, float time, float e) {
    vec3 g = vec3(0.0);
    g += noise(vec2((st.x + time) * e * 0.1, (st.y + time) * e * 0.1)) * 0.1;
    return g;
}
