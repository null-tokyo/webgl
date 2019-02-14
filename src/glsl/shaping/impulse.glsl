//Function from Iñigo Quiles
//www.iquilezles.org/www/articles/functions/functions.htm
float impulse(float k, float x){
    float h = k*x;
    return h*exp(1.0-h);
}