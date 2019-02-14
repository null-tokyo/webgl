float circle(in vec2 _st,  in vec2 _center, in float _radius){
    vec2 dist = _st - _center;
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}
