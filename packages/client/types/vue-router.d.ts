import type { NavigationGuardWithThis, RouteRecordName } from "vue-router";

declare global {
  interface EmRouteRaw {
    path: string;
    redirect?: string;
    name?: string | RouteRecordName | null;
    component?: unknown;
    children?: EmRouteRaw[];
    /**
     * Aliases for the record. Allows defining extra paths that will behave like a
     * copy of the record. Allows having paths shorthands like `/users/:id` and
     * `/u/:id`. All `alias` and `path` values must share the same params.
     */
    alias?: string | string[];
    /**
     * Before Enter guard specific to this record. Note `beforeEnter` has no
     * effect if the record has a `redirect` property.
     */
    beforeEnter?: NavigationGuardWithThis<undefined> | NavigationGuardWithThis<undefined>[];
    /**
     * Arbitrary data attached to the record.
     */
    meta?: Record<string, unknown> & {
      icon?: string;
      title?: string;
      keepAlive?: boolean;
    };
    fullPath?: string;
    hidden?: boolean;
    noShowingChildren?: boolean;
  }
}

export {};
