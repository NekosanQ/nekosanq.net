export const catNodeVertexShader = `
  attribute vec3 nodeNormal;
  attribute float nodeWeight;
  attribute float nodeSize;

  uniform float uPixelRatio;
  uniform vec3 uRayDirection;
  uniform vec3 uRayOrigin;

  varying float vHover;
  varying float vNodeWeight;
  varying float vSilhouette;

  float pointerRayDistance(vec3 worldPosition) {
    vec3 fromRay = worldPosition - uRayOrigin;
    float distanceAlongRay = max(dot(fromRay, uRayDirection), 0.0);
    vec3 closestPoint = uRayOrigin + uRayDirection * distanceAlongRay;
    return length(worldPosition - closestPoint);
  }

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * worldPosition;
    vec3 viewNormal = normalize(normalMatrix * nodeNormal);
    vec3 viewDirection = normalize(-viewPosition.xyz);

    float facing = abs(dot(viewNormal, viewDirection));
    float silhouette = 1.0 - smoothstep(0.14, 0.82, facing);
    float hover = 1.0 - smoothstep(0.18, 1.24, pointerRayDistance(worldPosition.xyz));
    float perspective = 48.0 / max(1.0, -viewPosition.z);

    vHover = hover;
    vNodeWeight = nodeWeight;
    vSilhouette = silhouette;

    gl_PointSize = clamp(
      nodeSize * perspective * uPixelRatio * mix(0.94, 1.22, silhouette) * mix(1.0, 1.18, hover),
      1.65 * uPixelRatio,
      10.5 * uPixelRatio
    );
    gl_Position = projectionMatrix * viewPosition;
  }
`;

export const catNodeFragmentShader = `
  varying float vHover;
  varying float vNodeWeight;
  varying float vSilhouette;

  void main() {
    vec2 point = gl_PointCoord - vec2(0.5);
    float radius = length(point);
    float antialias = max(fwidth(radius) * 1.2, 0.0025);
    float pearlDisc = 1.0 - smoothstep(0.205 - antialias, 0.205 + antialias, radius);
    float pearlCore = 1.0 - smoothstep(0.055, 0.145, radius);
    float halo = pow(max(1.0 - radius * 2.0, 0.0), 3.35);
    float highlight = 1.0 - smoothstep(0.02, 0.105, distance(gl_PointCoord, vec2(0.415, 0.38)));

    float topology = clamp(vNodeWeight, 0.62, 1.32);
    float alpha = (halo * 0.25 + pearlDisc * 0.72 + pearlCore * 0.42);
    alpha *= mix(0.9, 1.08, vSilhouette) * mix(0.92, 1.0, topology);

    if (alpha < 0.003) discard;

    vec3 dimSilver = vec3(0.61, 0.69, 0.67);
    vec3 pearlSilver = vec3(0.92, 1.0, 0.975);
    vec3 emerald = vec3(0.0, 0.961, 0.627);
    vec3 silver = mix(dimSilver, pearlSilver, pearlCore * 0.72 + highlight * 0.28);
    vec3 color = mix(silver, emerald, vHover * 0.9);
    float luminance = 0.92 + pearlCore * 0.54 + highlight * 0.36 + vHover * 0.34;

    gl_FragColor = vec4(color * luminance, min(alpha, 1.0));
  }
`;

export const catEdgeVertexShader = `
  attribute vec3 edgeNormal;
  attribute float edgeWeight;

  uniform vec3 uRayDirection;
  uniform vec3 uRayOrigin;

  varying float vEdgeAlpha;
  varying float vHover;
  varying float vSilhouette;

  float pointerRayDistance(vec3 worldPosition) {
    vec3 fromRay = worldPosition - uRayOrigin;
    float distanceAlongRay = max(dot(fromRay, uRayDirection), 0.0);
    vec3 closestPoint = uRayOrigin + uRayDirection * distanceAlongRay;
    return length(worldPosition - closestPoint);
  }

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * worldPosition;
    vec3 viewNormal = normalize(normalMatrix * edgeNormal);
    vec3 viewDirection = normalize(-viewPosition.xyz);

    float facing = abs(dot(viewNormal, viewDirection));
    float silhouette = 1.0 - smoothstep(0.13, 0.88, facing);
    float hover = 1.0 - smoothstep(0.16, 1.32, pointerRayDistance(worldPosition.xyz));
    float topology = clamp(edgeWeight / 1.72, 0.0, 1.0);

    vHover = hover;
    vSilhouette = silhouette;
    vEdgeAlpha = (0.12 + silhouette * 0.2) * mix(0.78, 1.18, topology);
    gl_Position = projectionMatrix * viewPosition;
  }
`;

export const catEdgeFragmentShader = `
  varying float vEdgeAlpha;
  varying float vHover;
  varying float vSilhouette;

  void main() {
    vec3 silver = mix(vec3(0.48, 0.56, 0.54), vec3(0.82, 0.9, 0.875), vSilhouette);
    vec3 emerald = vec3(0.0, 0.961, 0.627);
    vec3 color = mix(silver, emerald, vHover * 0.86);
    float luminance = 0.84 + vSilhouette * 0.24 + vHover * 0.42;
    gl_FragColor = vec4(color * luminance, min(vEdgeAlpha + vHover * 0.1, 0.72));
  }
`;
