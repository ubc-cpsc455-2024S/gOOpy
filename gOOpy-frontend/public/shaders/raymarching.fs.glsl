precision highp float;

// Ray Marching help from https://barradeau.com/blog/?p=575

// our object representation. This should be expanded to be more versatile later on
struct Shape
{
    vec3 center;
    int shape_type;
    float radius;
};
#define MAX_SHAPES 50
uniform Shape shapes[MAX_SHAPES];
uniform int n_shapes; // should change to match max number of shapes in editor.
uniform vec3 camera_pos;

in vec2 texCoord;

out vec4 fragColor;

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

float torus( vec3 pos, vec3 center, vec2 t )
{
    vec3 p = (pos - center);
    vec2 q = vec2(length(p.xz)-t.x,p.y);
    return length(q)-t.y;
}

float sdf(vec3 p) {
    // TODO this can probably be done cleaner
    float min_val = 99999.0;

    for (int i = 0; i < MAX_SHAPES; i++) {
        if (i > n_shapes - 1) {
            break;
        }
        Shape s = shapes[i];
        vec3 center = s.center;
        float radius = s.radius;

        float sdf_val = 0.0;
        switch(shapes[i].shape_type) {
            case 0:
                sdf_val = sphere(p, center, radius);
                break;
            case 1:
                sdf_val = box(p, center, vec3(radius), 0.2); // TODO controls
                break;
            case 2:
                sdf_val = torus(p, center, vec2(radius, 1.0)); // TODO controls
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
        if (i == 63) {
            // might be able to use the angle here to render a skybox
            fragColor = vec4(0.3, 0.8, 1.0, 1.0);
            return;
        }
    }

    // lighting (blinn phong for now)

    // ambient
    vec3 color = vec3(1., 0.7, 1.0);
    vec3 ambient = color * 0.2;

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

    fragColor = vec4(diffuse + specular + ambient, 1.0);
}
