export interface ProjectItem {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  descriptionPt: string;
  category: string;
  roles?: string[];
  year: string;
  link: string;
  liveUrl?: string;
  metrics?: string;
  tags: string[];
  image?: string;
  slug?: string;
  hasCaseStudy?: boolean;
}

export interface GlassOrbData {
  id: number;
  size: number; // diameter in px
  x: number; // current x position in px
  y: number; // current y position in px
  vx: number; // velocity x
  vy: number; // velocity y
  depth: number; // 0.6 (far) to 1.3 (close)
  rotation: number; // current angle in deg
  rotationSpeed: number; // deg per frame
  shapeRatio: number; // 1.0 = round, 0.92-1.08 = subtle organic lens deformation
  deformAngle: number; // tilt of organic deformation
  causticAccent: 'amber-blue' | 'cyan-warm' | 'prism' | 'pure-chrome';
  initialOffset: { xPct: number; yPct: number }; // relative placement on load
  baseScale: number;
  mass: number;
}

export interface PhysicsConfig {
  friction: number; // velocity damping (e.g. 0.985)
  bounceRestitution: number; // wall bounce elasticity (e.g. 0.75)
  collisionElasticity: number; // orb-to-orb bounce (e.g. 0.8)
  zeroGFactor: number; // floating drift speed
  magnetStrength: number; // hover cursor attraction
  throwMultiplier: number; // fling velocity factor
}

export type Language = 'pt' | 'en';

