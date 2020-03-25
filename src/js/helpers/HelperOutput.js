export default class HelperOutput {
  /**
   * Check if element is an instance of DOM
   *
   * @param obj
   * @returns {boolean}
   */
  static isDomEl(obj) {
    return obj instanceof HTMLElement;
  }
}
