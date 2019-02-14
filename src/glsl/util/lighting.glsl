//法線を取得する
vec3 getNormal(vec3 vPos){
      return normalize(cross(dFdx(vPos), dFdy(vPos)));
}

//並行光源での影響を計算
vec3 diffuseDirLightColor(vec3 c, vec3 normal, vec3 lightPos) {
      float diffuse = clamp(dot(normal, normalize(lightPos)), 0.1, 1.0);
      return c * diffuse;
}

//環境光源での影響を計算
vec3 diffuseAmbLightColor(vec3 c, vec3 normal, vec3 lightPos, vec3 lightColor) {
      float diffuse = clamp(dot(normal, normalize(lightPos)), 0.0, 1.0);
      return c * diffuse + lightColor;
}

//反射光の取得
float getSpecular(vec3 normal, vec3 lightPos, vec3 eyeDirection){
      vec3 halfLE = normalize(lightPos + eyeDirection);
      return pow(clamp(dot(normal, halfLE), 0.0, 1.0), 50.0);
}

//トゥーンシェーディング      
vec3 diffuseToonColor(vec3 normal, vec3 lightPos, sampler2D tex) {
      float diffuse = clamp(dot(normal, normalize(lightPos)), 0.0, 1.0);
      vec4 color = texture2D(tex, vec2(diffuse, 0.0));
      return color.rgb;
}
