import type { ComponentPublicInstance } from "vue";

export interface TagViewState {
  visible: boolean;
  top: number;
  left: number;
  selectedTag: EmRouteRaw;
  affixTags: EmRouteRaw[];
  tagRefs: ComponentPublicInstance[] | HTMLElement[];
  routes: EmRouteRaw[];
}
