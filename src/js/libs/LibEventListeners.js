export default class LibEventListeners {
  constructor(settings) {
    this.settings = settings;
  }

  init() {
    this.openModal();
    this.closeModal();
    this.activateServices();
    this.activateAllServices();
    this.disableServices();
  }

  openModal() {
    this.settings.eventbus.subscribe('modal-open', () => {
      if (typeof document.querySelector('.gedepiar-modal') === 'undefined') {
        document.querySelector('.gedepiar-modal').classList.add('is-open');
      }
    });
  }

  closeModal() {
    this.settings.eventbus.subscribe('modal-close', () => {
      if (typeof document.querySelector('.gedepiar-modal') === 'undefined') {
        document.querySelector('.gedepiar-modal').classList.remove('is-open');
      }
    });
  }

  /**
   * Execute custom activate-Function, set Localstorage-Item and activate checkbox
   */
  activateServices() {
    this.settings.eventbus.subscribe('services-activate', (data) => {
      data.servicesActivate.forEach((item) => {
        const service = data.settings.services[item];
        const elements = document.querySelectorAll(`[data-gedepiar-service="${service.alias}"]`);
        if (typeof service.onActivate === 'function') {
          service.onActivate(elements, data.settings);
        }
        localStorage.setItem(`gedepiar-enabled-${service.alias}`, true);
        document.getElementById(`gedepair-checkbox-${service.alias}`).classList.add('is-active');
      });
      localStorage.setItem('gedepiar-accepted', true);
    });
  }

  /**
   * Execute custom activate-Function, set Localstorage-Item and activate checkbox for all services
   */
  activateAllServices() {
    this.settings.eventbus.subscribe('services-activate-all', (settings) => {
      settings.services.forEach((item) => {
        const elements = document.querySelectorAll(`[data-gedepiar-service="${item.alias}"]`);
        if (typeof item.onActivate === 'function') {
          item.onActivate(elements, settings);
        }
        localStorage.setItem(`gedepiar-enabled-${item.alias}`, true);
        document.getElementById(`gedepair-checkbox-${item.alias}`).classList.add('is-active');
      });
      localStorage.setItem('gedepiar-accepted', true);
    });
  }

  /**
   * Execute Custom disable-Function, set Localstorage-Item and disable checkbox
   */
  disableServices() {
    this.settings.eventbus.subscribe('services-activate', (data) => {
      data.servicesActivate.forEach((item) => {
        const service = data.settings.services[item];
        const elements = document.querySelectorAll(`[data-gedepiar-service="${service.alias}"]`);
        if (typeof service.onDisable === 'function') {
          item.onDisable(elements, data.settings);
        }
        localStorage.setItem(`gedepiar-enabled-${service.alias}]`, false);
        document.getElementById(`gedepair-checkbox-${service.alias}`).classList.remove('is-active');
      });
      localStorage.setItem('gedepiar-accepted', true);
    });
  }
}
