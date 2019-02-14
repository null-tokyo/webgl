float rect(vec2 _st, vec2 _center, vec2 _size){
    vec2 dist = _st - _center;

    float top = _center.y + _size.y * 0.5;
    float bottom = _center.y - _size.y * 0.5;
    float left = _center.x - _size.x * 0.5;
    float right = _center.x + _size.x * 0.5;

    vec2 lb = step(vec2(left, bottom), _st);
    vec2 rt = 1.0 - step(vec2(right, top), _st);

    return lb.x * lb.y * rt.x * rt.y;
}