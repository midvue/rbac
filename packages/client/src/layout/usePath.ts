export const usePath = () => {
  /**
   * @param {string} path
   * @returns {Boolean}
   */
  const isExternal = (path: string) => {
    return /^(https?:|mailto:|tel:)/.test(path);
  };

  const resolve = (path: string, subPath: string) => {
    let resolvePath = path;
    if (subPath.startsWith("/")) {
      resolvePath += subPath;
    } else {
      resolvePath += "/" + subPath;
    }
    return resolvePath;
  };

  return { isExternal, resolve };
};
