import { GlassOrbData, PhysicsConfig } from '../types';

export const DEFAULT_PHYSICS_CONFIG: PhysicsConfig = {
  friction: 0.982,
  bounceRestitution: 0.72,
  collisionElasticity: 0.78,
  zeroGFactor: 0.045,
  magnetStrength: 0.008,
  throwMultiplier: 1.15,
};

export class GlassOrbPhysicsEngine {
  private orbs: GlassOrbData[] = [];
  private width: number = 1920;
  private height: number = 1080;
  private config: PhysicsConfig;
  private draggedOrbId: number | null = null;
  private dragOffset = { x: 0, y: 0 };
  private pointerHistory: { x: number; y: number; time: number }[] = [];
  private mousePos: { x: number; y: number } | null = null;
  private time: number = 0;

  constructor(initialOrbs: GlassOrbData[], width: number, height: number, config: PhysicsConfig = DEFAULT_PHYSICS_CONFIG) {
    this.orbs = initialOrbs.map(o => ({ ...o }));
    this.width = width;
    this.height = height;
    this.config = config;
  }

  public setDimensions(w: number, h: number) {
    const oldW = this.width;
    const oldH = this.height;
    this.width = Math.max(w, 320);
    this.height = Math.max(h, 400);

    // If resizing, scale positions smoothly
    if (oldW > 0 && oldH > 0 && (oldW !== this.width || oldH !== this.height)) {
      const scaleX = this.width / oldW;
      const scaleY = this.height / oldH;
      this.orbs.forEach(orb => {
        if (this.draggedOrbId !== orb.id) {
          orb.x *= scaleX;
          orb.y *= scaleY;
          this.clampOrb(orb);
        }
      });
    }
  }

  public setOrbs(newOrbs: GlassOrbData[]) {
    this.orbs = newOrbs.map(o => ({ ...o }));
  }

  public getOrbs(): GlassOrbData[] {
    return this.orbs;
  }

  public startDrag(orbId: number, pointerX: number, pointerY: number) {
    const orb = this.orbs.find(o => o.id === orbId);
    if (!orb) return;

    this.draggedOrbId = orbId;
    this.dragOffset.x = orb.x - pointerX;
    this.dragOffset.y = orb.y - pointerY;
    orb.vx = 0;
    orb.vy = 0;

    this.pointerHistory = [{ x: pointerX, y: pointerY, time: performance.now() }];
  }

  public updateDrag(pointerX: number, pointerY: number) {
    if (this.draggedOrbId === null) return;
    const orb = this.orbs.find(o => o.id === this.draggedOrbId);
    if (!orb) return;

    // Direct responsive tracking
    orb.x = pointerX + this.dragOffset.x;
    orb.y = pointerY + this.dragOffset.y;
    this.clampOrb(orb);

    const now = performance.now();
    this.pointerHistory.push({ x: pointerX, y: pointerY, time: now });
    // Keep only last 80ms of pointer history
    if (this.pointerHistory.length > 8) {
      this.pointerHistory.shift();
    }
  }

  public endDrag() {
    if (this.draggedOrbId === null) return;
    const orb = this.orbs.find(o => o.id === this.draggedOrbId);
    
    if (orb && this.pointerHistory.length >= 2) {
      const oldest = this.pointerHistory[0];
      const newest = this.pointerHistory[this.pointerHistory.length - 1];
      const dt = Math.max(newest.time - oldest.time, 16) / 1000;
      
      const vx = ((newest.x - oldest.x) / dt) * 0.016 * this.config.throwMultiplier;
      const vy = ((newest.y - oldest.y) / dt) * 0.016 * this.config.throwMultiplier;
      
      // Clamp max velocity
      const maxV = 28;
      orb.vx = Math.max(-maxV, Math.min(maxV, vx));
      orb.vy = Math.max(-maxV, Math.min(maxV, vy));
    }

    this.draggedOrbId = null;
    this.pointerHistory = [];
  }

  public setMousePosition(pos: { x: number; y: number } | null) {
    this.mousePos = pos;
  }

  public getDraggedOrbId(): number | null {
    return this.draggedOrbId;
  }

  private clampOrb(orb: GlassOrbData) {
    const radius = orb.size / 2;
    const minX = radius;
    const maxX = this.width - radius;
    const minY = radius;
    const maxY = this.height - radius;

    if (orb.x < minX) {
      orb.x = minX;
      if (orb.vx < 0) orb.vx = -orb.vx * this.config.bounceRestitution;
    } else if (orb.x > maxX) {
      orb.x = maxX;
      if (orb.vx > 0) orb.vx = -orb.vx * this.config.bounceRestitution;
    }

    if (orb.y < minY) {
      orb.y = minY;
      if (orb.vy < 0) orb.vy = -orb.vy * this.config.bounceRestitution;
    } else if (orb.y > maxY) {
      orb.y = maxY;
      if (orb.vy > 0) orb.vy = -orb.vy * this.config.bounceRestitution;
    }
  }

  public step(deltaTime: number = 16) {
    this.time += deltaTime;

    const count = this.orbs.length;

    // 1. Update positions & apply zero-G drifting + velocities
    for (let i = 0; i < count; i++) {
      const orb = this.orbs[i];
      const isDragged = orb.id === this.draggedOrbId;

      if (!isDragged) {
        // Zero-G ambient floating noise
        const freq = 0.0008 + (orb.id % 5) * 0.0002;
        const phaseX = (orb.id * 1.73);
        const phaseY = (orb.id * 2.37);
        const driftX = Math.sin(this.time * freq + phaseX) * this.config.zeroGFactor * orb.depth;
        const driftY = Math.cos(this.time * freq * 1.1 + phaseY) * this.config.zeroGFactor * orb.depth;

        orb.vx += driftX;
        orb.vy += driftY;

        // Mouse proximity subtle magnetic attraction
        if (this.mousePos) {
          const dx = this.mousePos.x - orb.x;
          const dy = this.mousePos.y - orb.y;
          const dist = Math.hypot(dx, dy);
          const detectionRadius = orb.size / 2 + 100;
          if (dist < detectionRadius && dist > 1) {
            const pull = (1 - dist / detectionRadius) * this.config.magnetStrength;
            orb.vx += (dx / dist) * pull;
            orb.vy += (dy / dist) * pull;
          }
        }

        // Apply friction
        orb.vx *= this.config.friction;
        orb.vy *= this.config.friction;

        // Position update
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Boundary bounce & clamping
        this.clampOrb(orb);
      }

      // Micro rotation
      orb.rotation += orb.rotationSpeed;
    }

    // 2. Inter-orb collision detection & elastic response (Multi-pass for smooth stabilization)
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const orbA = this.orbs[i];
          const orbB = this.orbs[j];

          const dx = orbB.x - orbA.x;
          const dy = orbB.y - orbA.y;
          const distSq = dx * dx + dy * dy;
          const radiusA = orbA.size / 2;
          const radiusB = orbB.size / 2;
          const minDist = radiusA + radiusB;

          if (distSq < minDist * minDist && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            const isADragged = orbA.id === this.draggedOrbId;
            const isBDragged = orbB.id === this.draggedOrbId;

            // Separate orbs proportionally by inverse mass unless dragged
            const totalMass = orbA.mass + orbB.mass;
            const ratioA = isADragged ? 0 : (isBDragged ? 1 : orbB.mass / totalMass);
            const ratioB = isBDragged ? 0 : (isADragged ? 1 : orbA.mass / totalMass);

            orbA.x -= nx * overlap * ratioA * 0.6;
            orbA.y -= ny * overlap * ratioA * 0.6;
            orbB.x += nx * overlap * ratioB * 0.6;
            orbB.y += ny * overlap * ratioB * 0.6;

            // Elastic velocity transfer
            const rvx = orbB.vx - orbA.vx;
            const rvy = orbB.vy - orbA.vy;
            const velAlongNormal = rvx * nx + rvy * ny;

            if (velAlongNormal < 0) {
              const impulse = -(1 + this.config.collisionElasticity) * velAlongNormal / (1 / orbA.mass + 1 / orbB.mass);
              
              if (!isADragged) {
                orbA.vx -= (impulse / orbA.mass) * nx * 0.85;
                orbA.vy -= (impulse / orbA.mass) * ny * 0.85;
              }
              if (!isBDragged) {
                orbB.vx += (impulse / orbB.mass) * nx * 0.85;
                orbB.vy += (impulse / orbB.mass) * ny * 0.85;
              }
            }

            this.clampOrb(orbA);
            this.clampOrb(orbB);
          }
        }
      }
    }
  }
}
