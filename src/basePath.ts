export function readBasePath(): string {
  const meta = document.querySelector('meta[name="base-path"]');
  return meta?.getAttribute('content') ?? '/';
}
