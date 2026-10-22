import { useEffect, useRef } from 'react';

type Stop = readonly [offset: number, color: string];

// The blurred landscape behind the glass: pale sky, green hills, a dark railing and water.
const DAY_SCENE: readonly Stop[] = [
  [0, '#cdd9dc'],
  [0.3, '#c3d0d0'],
  [0.4, '#a9bcb2'],
  [0.5, '#7d9a84'],
  [0.62, '#56755f'],
  [0.71, '#2f4a45'],
  [0.75, '#1c2a30'],
  [0.8, '#2a4654'],
  [1, '#1a2d3a'],
];

const NIGHT_SCENE: readonly Stop[] = [
  [0, '#1a232c'],
  [0.4, '#1d2a2a'],
  [0.5, '#1f3328'],
  [0.65, '#172822'],
  [0.74, '#0b1215'],
  [0.8, '#122430'],
  [1, '#0c1820'],
];

type Bokeh = {
  readonly x: number;
  readonly y: number;
  /** Radius as a fraction of the largest viewport side. */
  readonly r: number;
  readonly rgb: string;
  readonly alpha: number;
};

const BOKEH: readonly Bokeh[] = [
  { x: 0.32, y: 0.45, r: 0.037, rgb: '246, 180, 124', alpha: 0.9 },
  { x: 0.14, y: 0.685, r: 0.031, rgb: '222, 104, 64', alpha: 0.85 },
  { x: 0.025, y: 0.8, r: 0.028, rgb: '240, 122, 46', alpha: 0.85 },
  { x: 0.81, y: 0.69, r: 0.03, rgb: '180, 80, 74', alpha: 0.5 },
  { x: 0.46, y: 0.5, r: 0.037, rgb: '233, 196, 154', alpha: 0.2 },
  { x: 0.4, y: 0.52, r: 0.034, rgb: '233, 186, 150', alpha: 0.15 },
  { x: 0.82, y: 0.42, r: 0.032, rgb: '215, 195, 160', alpha: 0.15 },
  { x: 0.92, y: 0.5, r: 0.03, rgb: '169, 195, 163', alpha: 0.15 },
  { x: 0.88, y: 0.64, r: 0.03, rgb: '169, 195, 163', alpha: 0.12 },
  { x: 0.14, y: 0.83, r: 0.028, rgb: '143, 163, 176', alpha: 0.15 },
];

/** A drop that slides down the glass, absorbing the droplets on its way. */
type Runner = {
  x: number;
  y: number;
  r: number;
  speed: number;
  delay: number;
  phase: number;
  travelled: number;
};

const random = (min: number, max: number) => min + Math.random() * (max - min);

const createLayer = (width: number, height: number, scale: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(scale, scale);
  return { canvas, ctx };
};

const drawDroplet = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
  ctx.fillStyle = 'rgba(8, 18, 22, 0.4)';
  ctx.beginPath();
  ctx.ellipse(x, y, r, r * 1.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.beginPath();
  ctx.arc(x + r * 0.2, y + r * 0.4, r * 0.35, 0, Math.PI * 2);
  ctx.fill();
};

const randomDropletRadius = () => 0.6 + Math.random() ** 3 * 2.6;

/** Picks how hard it rains next, from a drizzle (0) to a downpour (1). */
const randomIntensity = () => random(0.05, 1);

const resetRunner = (runner: Runner, width: number, height: number) => {
  runner.x = random(0, width);
  runner.y = random(-10, height * 0.6);
  runner.r = random(2.2, 4);
  runner.speed = random(40, 120);
  runner.delay = random(0, 8);
  runner.phase = random(0, Math.PI * 2);
  runner.travelled = 0;
};

const RainyWindow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let width = 0;
    let height = 0;
    let scene: ReturnType<typeof createLayer>;
    let glass: ReturnType<typeof createLayer>;
    let runners: Runner[] = [];
    let frame = 0;
    let last = 0;
    let rainBudget = 0;
    let evaporationClock = 0;
    let intensity = randomIntensity();
    let targetIntensity = intensity;
    let intensityClock = random(8, 25);

    const paintScene = () => {
      scene = createLayer(width, height, 1);
      const gradient = scene.ctx.createLinearGradient(0, 0, 0, height);
      for (const [offset, color] of darkQuery.matches ? NIGHT_SCENE : DAY_SCENE) {
        gradient.addColorStop(offset, color);
      }
      scene.ctx.fillStyle = gradient;
      scene.ctx.fillRect(0, 0, width, height);
    };

    const setup = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * scale;
      canvas.height = height * scale;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);

      paintScene();
      glass = createLayer(width, height, scale);
      for (let i = 0; i < ((width * height) / 2500) * (0.3 + intensity); i++) {
        drawDroplet(glass.ctx, random(0, width), random(0, height), randomDropletRadius());
      }

      runners = Array.from({ length: Math.min(14, Math.ceil(width / 140)) }, () => {
        const runner = {} as Runner;
        resetRunner(runner, width, height);
        return runner;
      });
    };

    const update = (dt: number) => {
      // The rain eases toward a new random intensity every few seconds.
      intensityClock -= dt;
      if (intensityClock <= 0) {
        intensityClock = random(8, 25);
        targetIntensity = randomIntensity();
      }
      intensity += (targetIntensity - intensity) * Math.min(dt / 3, 1);

      // New raindrops hit the glass while the oldest ones slowly evaporate.
      rainBudget += ((width * height) / 2500 / 60) * dt * 2 * intensity;
      while (rainBudget >= 1) {
        drawDroplet(glass.ctx, random(0, width), random(0, height), randomDropletRadius());
        rainBudget--;
      }

      evaporationClock += dt;
      if (evaporationClock >= 1) {
        evaporationClock = 0;
        glass.ctx.globalCompositeOperation = 'destination-out';
        glass.ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
        glass.ctx.fillRect(0, 0, width, height);
        glass.ctx.globalCompositeOperation = 'source-over';
      }

      for (const runner of runners) {
        if (runner.delay > 0) {
          // Heavier rain sets more drops running down the glass.
          runner.delay -= dt * intensity;
          continue;
        }

        // Stick-slip motion: drops stall and then rush down the glass.
        runner.phase += dt * 2;
        const step = runner.speed * dt * (0.25 + Math.max(0, Math.sin(runner.phase)) * 1.5);
        runner.y += step;
        runner.x += Math.sin(runner.phase * 1.7) * step * 0.15;
        runner.travelled += step;

        glass.ctx.globalCompositeOperation = 'destination-out';
        glass.ctx.beginPath();
        glass.ctx.arc(runner.x, runner.y, runner.r * 1.3, 0, Math.PI * 2);
        glass.ctx.fill();
        glass.ctx.globalCompositeOperation = 'source-over';

        if (runner.travelled > runner.r * 4) {
          runner.travelled = 0;
          drawDroplet(
            glass.ctx,
            runner.x + random(-1, 1),
            runner.y - runner.r * 2,
            random(0.5, 1.1),
          );
        }

        if (runner.y - runner.r > height) resetRunner(runner, width, height);
      }
    };

    const render = (time: number) => {
      ctx.drawImage(scene.canvas, 0, 0, width, height);

      const size = Math.max(width, height);
      for (const [i, bokeh] of BOKEH.entries()) {
        const pulse = 1 + Math.sin(time / 2400 + i * 1.3) * 0.12;
        const x = bokeh.x * width + Math.sin(time / 7000 + i) * size * 0.004;
        const y = bokeh.y * height;
        const r = bokeh.r * size * (1 + Math.sin(time / 3100 + i * 0.7) * 0.03);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, `rgba(${bokeh.rgb}, ${bokeh.alpha * pulse})`);
        gradient.addColorStop(0.8, `rgba(${bokeh.rgb}, ${bokeh.alpha * pulse * 0.85})`);
        gradient.addColorStop(1, `rgba(${bokeh.rgb}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.drawImage(glass.canvas, 0, 0, width, height);

      for (const runner of runners) {
        if (runner.delay <= 0) drawDroplet(ctx, runner.x, runner.y, runner.r);
      }
    };

    const tick = (time: number) => {
      update(Math.min((time - last) / 1000, 0.05));
      last = time;
      render(time);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      setup();
      if (reducedMotionQuery.matches) {
        render(0);
        return;
      }
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const handleSchemeChange = () => {
      paintScene();
      if (reducedMotionQuery.matches) render(0);
    };

    start();
    window.addEventListener('resize', start);
    darkQuery.addEventListener('change', handleSchemeChange);
    reducedMotionQuery.addEventListener('change', start);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', start);
      darkQuery.removeEventListener('change', handleSchemeChange);
      reducedMotionQuery.removeEventListener('change', start);
    };
  }, []);

  return (
    <div aria-hidden='true' className='fixed inset-0 -z-10'>
      <canvas ref={canvasRef} className='h-full w-full' />
      {/* Fog over the glass, so the text keeps its contrast in both color schemes. */}
      <div
        className='absolute inset-0'
        style={{
          background: [
            'radial-gradient(ellipse 60% 40% at 50% 50%, color-mix(in srgb, var(--background) 85%, transparent), transparent)',
            'linear-gradient(to bottom, color-mix(in srgb, var(--background) 20%, transparent), color-mix(in srgb, var(--background) 45%, transparent) 50%, color-mix(in srgb, var(--background) 85%, transparent))',
          ].join(', '),
        }}
      />
    </div>
  );
};

export default RainyWindow;
