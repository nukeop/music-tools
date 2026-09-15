import { rm } from 'node:fs/promises';
import tailwind from 'bun-plugin-tailwind';

await rm('./dist', { recursive: true, force: true });

await Bun.build({
  entrypoints: ['./index.html'],
  outdir: './dist',
  target: 'browser',
  minify: true,
  sourcemap: 'linked',
  splitting: true,
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  plugins: [tailwind],
});
