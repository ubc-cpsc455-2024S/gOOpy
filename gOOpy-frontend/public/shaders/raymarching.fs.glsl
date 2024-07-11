precision highp float;

// Ray Marching help from https://barradeau.com/blog/?p=575

// our object representation. This should be expanded to be more versatile later on
struct Sphere
{
    vec3 center;
    float radius;
};
#define MAX_SPHERES 50
uniform Sphere spheres[MAX_SPHERES];
uniform int n_spheres; // should change to match number of spheres in editor.
uniform vec3 camera_pos;
uniform vec4 skybox_col;
uniform vec3 skybox_l_color;
uniform float ambientIntensity;

varying vec2 texCoord;

// Smooth Min - goopy shapes!
// adapted from https://iquilezles.org/articles/smin/
// more variations available... We should add more
float smin( float a, float b, float k )
{
    if (k <= 0.0001) return min(a,b);
    k *= 4.0;
    float h = max( k-abs(a-b), 0.0 )/k;
    return min(a,b) - h*h*k*(1.0/4.0);
}

float sphere( vec3 pos, vec3 center, float radius )
{
    return length( pos - center ) - radius;
}

float box( vec3 pos, vec3 center, vec3 size, float corner )
{
    return length( max( abs( pos-center )-size, 0.0 ) ) - corner;
}

float sdf(vec3 p) {
    // TODO this can probably be done cleaner
    float min_val = 99999.0;

    for (int i = 0; i < MAX_SPHERES; i++) {
        if (i > n_spheres - 1) {
            break;
        }
        Sphere s = spheres[i];
        vec3 center = s.center;
        float radius = s.radius;

        min_val = smin(sphere(p, center, radius), min_val, 0.3);
    }

    // Here I manually add a box to the scene. This will be different when editor has more work done.
    return min_val;
}

// from https://iquilezles.org/articles/normalsSDF/
// there might be better versions on this website - try them!
vec3 calcNormal(in vec3 p) {
    const float eps = 0.001;
    const vec2 h = vec2(eps, 0);
    return normalize(vec3(sdf(p+h.xyy) - sdf(p-h.xyy),
                          sdf(p+h.yxy) - sdf(p-h.yxy),
                          sdf(p+h.yyx) - sdf(p-h.yyx)));
}

void main() {
    vec2 uv = texCoord * 2.0 - 1.0;
    vec3 dir = normalize(vec3(uv, 1.));
    vec3 ip;

    float t = 0.0;
    for (int i = 0; i < 64; i++) {
        ip = camera_pos + dir * t;
        float temp = sdf(ip);

        if (temp < 0.01) break;

        t += temp;
        
        // sky hack
        if (i == 63) {
            // might be able to use the angle here to render a skybox
            gl_FragColor = skybox_col;
            return;
        }
    }

    // lighting (blinn phong for now)

    // ambient
    vec3 color = skybox_l_color;
    vec3 ambient = color * ambientIntensity;

    // diffuse
    vec3 L = normalize(vec3(1.0,1.0,-1.0));
    vec3 N = calcNormal(ip);
    float I = clamp(0.0, 1.0, dot(N, L));
    vec3 diffuse = I * color;

    // specular
    vec3 E = camera_pos - ip;
    vec3 H = normalize(E + L);
    float S = dot(N,H);
    vec3 specular = pow(clamp(S, 0.0, 1.0), 8.0) * vec3(0.3);

    gl_FragColor = vec4(diffuse + specular + ambient, 1.0);
}
