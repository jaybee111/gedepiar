export default class LibCategories {
  /**
   * Organize services into categories
   *
   * @param services
   * @returns {[]}
   */
  static init(services) {
    const cateogries = [];
    services.forEach((item) => {
      if (typeof item.category !== 'undefined') {
        if (typeof cateogries[item.category] === 'undefined') {
          cateogries[item.category] = [];
        }
        cateogries[item.category].push(item);
      } else {
        throw new Error(`Add a category for service ${item.settings.alias}`);
      }
    });

    return cateogries;
  }
}
