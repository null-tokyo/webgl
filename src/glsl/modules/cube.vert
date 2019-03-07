varying vec3 vPos;
varying vec3 vColor;
varying mat4 vNormalMat;
varying vec3 vNormal;
varying float vFogFactor;

uniform float uTime;
uniform float uDelta;
uniform vec3 uColorArray[2];
uniform vec3 uCameraDirection;
uniform vec3 uCameraPosition;
uniform float uFogStart;
uniform float uFogEnd;

attribute vec3 offset;
attribute float colorIndex;
attribute vec4 orientation;

@import ../util/inverse;
@import ../util/transpose;
@import ../util/noise;

vec3 applyQuaternionToVector( vec4 q, vec3 v ){
    return v + 2.0 * cross( q.xyz, cross( q.xyz, v ) + q.w * v );
}

const float near = 0.01;
const float far  = 1.0;
const float linerDepth = 1.0 / (far - near);

void main () {
    vPos = applyQuaternionToVector(orientation, position);
    vNormal = applyQuaternionToVector(orientation, normal);
    vColor = uColorArray[int(colorIndex)];

    // float s = snoise(offset);

    // vec3 o = offset;
    // o.x += cos(uTime * s);
    // o.y += sin(uTime * s);
    // o.z += sin(uTime * s);

    vec4 mvPos = vec4(offset + vPos, 1.0);

    vPos = mvPos.xyz;
    vNormalMat = inverse(modelViewMatrix);

    vec3 eyePosition = uCameraDirection * -1.0;
    vec3 invLight = normalize(vNormalMat * vec4(10.0 * cos(uTime), 10.0, 10.0, 0.0)).xyz;
    vec3 invEye = normalize(vNormalMat * vec4(eyePosition,1.0)).xyz;
    vec3 halfLE = normalize(invLight + invEye);
    float diffuse = clamp(dot(vNormal, invLight), 0.0, 1.0);
    float specular = pow(clamp(dot(vNormal, halfLE), 0.0, 1.0), 50.0);
    
    //色 = 頂点色 * 拡散光 + 反射光 + 環境光
    vColor = vColor * diffuse;
    vColor += vec3(1.0, 1.0, 1.0) * 0.2;
    vColor += specular;

    vec3  pos = (modelMatrix * vec4(vPos, 1.0)).xyz;
    float linerPos = length(uCameraPosition - pos) * linerDepth;
    vFogFactor = clamp((uFogEnd - linerPos) / (uFogEnd - uFogStart), 0.0, 1.0);

	gl_Position = projectionMatrix * modelViewMatrix * mvPos; 
}