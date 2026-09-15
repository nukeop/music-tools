import tailwind from 'bun-plugin-tailwind';

await Bun.build({
  entrypoints: ['./index.html'],
  outdir: './dist',
  target: 'browser',
  minify: true,
  sourcemap: 'linked',
  plugins: [tailwind],
});
