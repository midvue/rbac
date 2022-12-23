/**
 * 简单复制对象
 * 从resource->target
 */
export const copyObject = function copyObject(target: any, resource: any) {
  if (typeof target === "undefined") {
    return resource;
  }
  if (typeof resource === "undefined" || resource === null) {
    return target;
  }
  for (const key in resource) {
    if (Object.prototype.hasOwnProperty.call(resource, key)) {
      if (resource[key] === null || resource[key] === "undefined") continue;
      target[key] = resource[key];
    }
  }
  return target;
};

export default {
  copyObject,
};
