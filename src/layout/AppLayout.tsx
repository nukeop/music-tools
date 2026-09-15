import type { ReactNode } from 'react';
import { TopBar } from './TopBar.tsx';

type AppLayoutProps = {
  children?: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-dvh flex-col bg-neutral-950 text-neutral-100">
      <TopBar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
