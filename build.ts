import { copyFile, rm } from 'node:fs/promises';
import tailwind from 'bun-plugin-tailwind';

const BASE_PATH = '/music-tools';

await rm('./dist', { recursive: true, force: true });

await Bun.build({
  entrypoints: ['./index.html'],
  outdir: './dist',
  target: 'browser',
  minify: true,
  sourcemap: 'linked',
  splitting: true,
  publicPath: `${BASE_PATH}/`,
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  plugins: [tailwind],
});

const builtHtml = await Bun.file('./dist/index.html').text();
const html = builtHtml.replace(
  /<meta name="base-path" content="\/"\s*\/?>/,
  `<meta name="base-path" content="${BASE_PATH}" />`,
);
await Bun.write('./dist/index.html', html);
await copyFile('./dist/index.html', './dist/404.html');
