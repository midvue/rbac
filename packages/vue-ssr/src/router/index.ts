import {
  createRouter as _createRrouter,
  createMemoryHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [];

export function createRouter() {
  return _createRrouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}
