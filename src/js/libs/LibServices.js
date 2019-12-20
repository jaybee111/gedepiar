// Services
import ServiceGa from '../services/ServiceGa';

export default class LibServices {
  /**
   * Fire all init-callbacks of activated services
   *
   * @param services
   */
  static init(services) {
    services.forEach((item) => {
      if (typeof item.onInit === 'function') {
        item.onInit();
      }
    });
  }

  /**
   * Add individual service object to our service array or use predefined service
   *
   * @param services
   * @returns {*}
   */
  static prepare(services) {
    const servicesHolder = [];
    services.forEach((index, item) => {
      if (typeof item === 'string') {
        if (item === 'ga') {
          servicesHolder[item] = ServiceGa;
        }
      } else if (typeof item === 'object') {
        servicesHolder[item.alias] = item;
      }
    });

    return servicesHolder;
  }
}
