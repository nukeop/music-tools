import {
  createRootRoute,
  createRoute,
  createRouter,
  type RouterHistory,
} from '@tanstack/react-router';
import { readBasePath } from './basePath';
import { AppLayout } from './layout/AppLayout';
import { TOOLS } from './tools/registry';

const rootRoute = createRootRoute({
  component: AppLayout,
});

const toolRoutes = TOOLS.map((tool) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: tool.path,
    component: tool.component,
  }),
);

export const routeTree = rootRoute.addChildren(toolRoutes);

export function createAppRouter(history?: RouterHistory) {
  return createRouter({
    routeTree,
    history,
    basepath: readBasePath(),
  });
}

export const router = createAppRouter();

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
