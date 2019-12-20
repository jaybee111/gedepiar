import LayoutBtn from './LayoutBtn';

export default class LayoutModal {
  constructor(settings, translation) {
    this.settings = settings;
    this.translation = translation;
  }

  render() {
    const modal = document.createElement('div');
    modal.classList.add('gedepiar-modal');
    modal.appendChild(this.getHeader());
    modal.appendChild(this.getBody());
    modal.appendChild(this.getFooter());

    return modal;
  }

  /**
   * Build Modalheader
   *
   * @returns {HTMLDivElement}
   */
  getHeader() {
    const divHeader = document.createElement('div');
    divHeader.classList.add('gedepiar-modal__header');
    divHeader.innerText = this.translation.cookie_modal_headline;
    const headerClose = document.createElement('a');
    headerClose.setAttribute('title', this.translation.cookie_modal_btn_close);
    headerClose.setAttribute('href','#');
    headerClose.classList.add('gedepiar-modal__close-handler');
    headerClose.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"/></svg>';
    headerClose.addEventListener('click', (e) => {
      e.preventDefault();
      this.settings.eventbus.publish('modal-close');
    });
    divHeader.appendChild(headerClose);

    return divHeader;
  }

  /**
   * Build Modalbody
   *
   * @returns {HTMLDivElement}
   */
  getBody() {
    const div_body = document.createElement('div');
    div_body.classList.add('gedepiar-modal__body');

    return div_body;
  }

  /**
   * Build Modalfooter
   *
   * @returns {HTMLDivElement}
   */
  getFooter() {
    // Modal Footer Button
    /* const btn_save = document.createElement('a');
    btn_save.setAttribute('href','#');
    btn_save.classList.add('gedepiar-modal__btn-save','gedepiar-modal__btn');
    btn_save.innerText = translation.cookie_modal_btn_save;
    btn_save.addEventListener('click',  (e) => {
      e.preventDefault();
      this.settings.eventbus.publish('modal-close');
      this.settings.eventbus.publish('cookie-info-close');

      // Select all services for activating or disabling
      const inputs = document.querySelectorAll('.gedepiar-modal input[type="checkbox"]');
      const servicesActivate = [];
      const servicesDisable = [];

      inputs.forEach((item) => {
          const serviceStatus = (typeof localStorage.getItem('gedepiar-enabled-' + item.value) !== 'undefined' && localStorage.getItem('gedepiar-enabled-' + item.value) === 'true');
          if (serviceStatus !== item.checked) {
            if (item.checked) {
                servicesActivate.push(item.value)
            } else {
            servicesDisable.push(item.value);
          }
        }
      });

      // Activate checked services
      const dataActivate = {
          'servicesActivate' : servicesActivate,
          'settings' : this.settings
      };
      this.settings.eventbus.publish('services-activate',dataActivate);

      // Disable unchecked services
      const dataDisable = {
          'servicesActivate' : servicesDisable,
          'settings' : this.settings
      };
      this.settings.eventbus.publish('services-disable',dataDisable);

      localStorage.setItem('gedepiar-accepted',true);
    });

    const btn_save_all = document.createElement('a');
    btn_save_all.setAttribute('href','#');
    btn_save_all.classList.add('gedepiar-modal__btn-save-all','gedepiar-modal__btn');
    btn_save_all.innerText = translation.cookie_modal_btn_save_all;
    btn_save_all.addEventListener('click',function (e) {
      e.preventDefault();
      this.settings.eventbus.publish('modal-close');
      this.settings.eventbus.publish('cookie-info-close');

      const inputs = document.querySelectorAll('.gedepiar-modal input[type="checkbox"]');
      for(let i = 0;i <= inputs.length-1;i++){
          const service = default_services[inputs[i].value];
          inputs[i].closest('.gedepiar-checkbox').classList.add('is-active');
          inputs[i].checked = true;
          const elements = document.querySelectorAll('[data-gedepiar-service="'+service.alias+'"]');
          service_activate(service,elements);
      }

      close_cookie_info();
      close_cookie_modal();
      localStorage.setItem('gedepiar-accepted',true);
    });

    // Modal Footer
    const div_footer = document.createElement('div');
    div_footer.classList.add('gedepiar-modal__footer');
    div_footer.appendChild(btn_save);
    div_footer.appendChild(btn_save_all);

    return div_footer; */
  }
}
