import { Outlet } from '@tanstack/react-router';
import { ToolNav } from './ToolNav';
import { TopBar } from './TopBar';

export function AppLayout() {
  return (
    <div className="flex h-dvh flex-col bg-background text-background-fg">
      <div className="grid bg-panel text-panel-fg sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <TopBar />
        <ToolNav className="sm:col-start-2 sm:row-start-1" />
      </div>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
