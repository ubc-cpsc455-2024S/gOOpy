precision highp float;

// Ray Marching help from https://barradeau.com/blog/?p=575

// our object representation. This should be expanded to be more versatile later on
struct Shape
{
    int shape_type;
    float property1; // See config file for what these are
    float property2;
    float property3;
    float property4;
    mat4 transform;
};
#define MAX_SHAPES 50
#define SPHERE 0
#define BOX 1
#define TORUS 2
#define CYLINDER 3
#define ARCTORUS 4
uniform Shape shapes[MAX_SHAPES];
uniform int n_shapes;
uniform vec3 camera_pos;
uniform vec4 skybox_col;
uniform vec3 skybox_l_color;
uniform float ambientIntensity;

in vec2 texCoord;
out vec4 fragColor;

// Smooth Min - goopy shapes!
// adapted from https://iquilezles.org/articles/smin/
// more variations available... We should add more
float smin(float a, float b, float k)
{
    if (k <= 0.0001) return min(a,b);
    k *= 4.0;
    float h = max( k-abs(a-b), 0.0 )/k;
    return min(a,b) - h*h*k*(1.0/4.0);
}

float sphere(vec3 pos, float radius)
{
    return length(pos) - radius;
}

float box(vec3 pos, vec3 size, float corner)
{
    return length(max( abs( pos )-size, 0.0)) - corner;
}

float torus(vec3 p, vec2 t)
{
    vec2 q = vec2(length(p.xz)-t.x,p.y);
    return length(q)-t.y;
}

float cylinder(vec3 p, float ra, float rb, float h)
{
    vec2 d = vec2(length(p.xz) - 2.0 * ra + rb, abs(p.y) - h);
    return min(max(d.x,d.y), 0.0) + length(max(d, 0.0)) - rb;
}

float arcTorus(vec3 p, vec2 sc, float ra, float rb)
{
    // rotate arcTorus to match torus
    p = p * mat3(vec3(1.0, 0.0, 0.0),vec3(0.0, 0.0, 1.0),vec3(0.0, 1.0, 0.0));
    p.x = abs(p.x);
    float k = (sc.y*p.x>sc.x*p.y) ? dot(p.xy,sc) : length(p.xy);
    return sqrt(dot(p,p) + ra*ra - 2.0*ra*k) - rb;
}

float sdf(vec3 p) {
    float min_val = 99999.0;

    for (int i = 0; i < MAX_SHAPES; i++) {
        if (i > n_shapes - 1) {
            break;
        }
        Shape s = shapes[i];
        float prop1 = s.property1;
        float prop2 = s.property2;
        float prop3 = s.property3;
        float prop4 = s.property4;

        vec3 p_t = vec3(s.transform*vec4(p, 1.0));


        float sdf_val = 0.0;
        switch(shapes[i].shape_type) {
            case SPHERE:
                sdf_val = sphere(p_t, prop1);
                break;
            case BOX:
                sdf_val = box(p_t, vec3(prop1, prop2, prop3), prop4);
                break;
            case TORUS:
                sdf_val = torus(p_t, vec2(prop1, prop2));
                break;
            case CYLINDER:
                sdf_val = cylinder(p_t, prop1, prop2, prop3);
                break;
            case ARCTORUS:
                sdf_val = arcTorus(p_t, vec2(sin(prop3),cos(prop3)), prop1, prop2);
                break;
        }

        min_val = smin(sdf_val, min_val, 0.3);
    }

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
        if (i == 63 && temp >= 0.5) {
            // might be able to use the angle here to render a skybox
            fragColor = skybox_col;
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
    float I = clamp(dot(N, L), 0.0, 1.0);
    vec3 diffuse = I * color;

    // specular
    vec3 E = camera_pos - ip;
    vec3 H = normalize(E + L);
    float S = dot(N,H);
    vec3 specular = pow(clamp(S, 0.0, 1.0), 8.0) * vec3(0.3);

    fragColor = vec4(diffuse + specular + ambient, 1.0);
}
