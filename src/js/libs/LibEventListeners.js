export default class LibEventListeners {
  constructor(settings) {
    this.settings = settings;
  }

  init() {
    this.openModal();
    this.closeModal();
    this.openInfo();
    this.closeInfo();
    this.activateServices();
    this.disableServices();
  }

  openModal() {
    this.settings.eventbus.subscribe('modal-open', () => {
      const modal = document.querySelector('.gedepiar-modal');
      if (typeof modal !== 'undefined') {
        modal.classList.add('is-open');
      }
    });
  }

  closeModal() {
    this.settings.eventbus.subscribe('modal-close', () => {
      const modal = document.querySelector('.gedepiar-modal');
      if (typeof modal === 'object') {
        modal.classList.remove('is-open');
      }
    });
  }

  openInfo() {
    this.settings.eventbus.subscribe('info-open', () => {
      const info = document.querySelector('.gedepiar-info');
      if (typeof info !== 'undefined') {
        info.classList.add('is-open');
      }
    });
  }

  closeInfo() {
    this.settings.eventbus.subscribe('info-close', () => {
      const info = document.querySelector('.gedepiar-info');
      if (typeof info === 'object') {
        info.classList.remove('is-open');
      }
    });
  }

  /**
   * Execute custom activate-Function and activate checkbox
   */
  activateServices() {
    this.settings.eventbus.subscribe('services-activate', (servicesActivate) => {
      servicesActivate.forEach((item) => {
        localStorage.setItem('gedepiar-accepted', true);
        const service = this.settings.services[item];
        const elements = document.querySelectorAll(`[data-gedepiar-service="${service.alias}"]`);
        // Set local storage entry
        localStorage.setItem(`gedepiar-enabled-${service.alias}`, true);

        // Select all checkbox input and set checked status
        const checkbox = document.getElementById(`gedepiar-checkbox-input-${service.alias}`);
        if (this.settings.outputHelper.isDomEl(checkbox)) {
          checkbox.closest('.gedepiar-checkbox-input-wrapper').classList.add('is-active');
          checkbox.checked = true;
        }

        // Select all overlays and disable them
        const overlays = document.querySelectorAll(`.gedepiar-overlay-${service.alias}`);
        overlays.forEach((itemOverlay) => itemOverlay.classList.remove('is-open'));

        // Loop through iframes an copy source-url from data-attribute to src-attribute
        const iframes = document.querySelectorAll(`iframe[data-gedepiar-service="${service.alias}"]`);
        iframes.forEach((itemIframe) => {
          const src = itemIframe.getAttribute('data-src');
          itemIframe.setAttribute('src', src);
        });

        // Clone script tags and replace it with old one
        // Load scripts with src-tag first, followed by inline scripts
        const processInlineScripts = () => {
          service.elements.inlineScript.forEach((inlineScriptItem) => {
            const newInlineScript = document.createElement('script');
            for (let z = 0; z < inlineScriptItem.attributes.length; z += 1) {
              const attr = inlineScriptItem.attributes[z];
              newInlineScript.setAttribute(attr.name, attr.value);
            }
            newInlineScript.innerHTML = inlineScriptItem.innerHTML;
            newInlineScript.setAttribute('type', 'text/javascript');
            if (inlineScriptItem.parentNode !== null) {
              inlineScriptItem.parentNode.replaceChild(newInlineScript, inlineScriptItem);
            }
          });
        };

        if (service.elements.script.length) {
          let scriptsLoaded = 0;
          service.elements.script.forEach((scriptItem) => {
            // Build new script-tag
            const newScript = document.createElement('script');
            for (let z = 0; z < scriptItem.attributes.length; z += 1) {
              const attr = scriptItem.attributes[z];
              newScript.setAttribute(attr.name, attr.value);
            }
            newScript.setAttribute('type', 'text/javascript');
            if (scriptItem.parentNode !== null) {
              scriptItem.parentNode.replaceChild(newScript, scriptItem);
            }

            // Check if all scripts have been loaded
            newScript.onload = () => {
              scriptsLoaded += 1;
              if (scriptsLoaded === service.elements.script.length) {
                // Add inline scripts
                processInlineScripts();
              }
            };
          });
        }

        // If only inline scripts exist
        if (!service.elements.script.length && service.elements.inlineScript.length) {
          processInlineScripts();
        }

        // Execute custom activate-Function
        if (typeof service.onActivate === 'function') {
          service.onActivate(elements, this.settings);
        }
      });
    });
  }

  /**
   * Execute Custom disable-Function and disable checkbox
   */
  disableServices() {
    this.settings.eventbus.subscribe('services-disable', (servicesDisable) => {
      servicesDisable.forEach((item) => {
        const service = this.settings.services[item];
        const elements = document.querySelectorAll(`[data-gedepiar-service="${service.alias}"]`);
        // Set local storage entry
        localStorage.setItem(`gedepiar-enabled-${service.alias}`, false);

        // Select all checkbox input and disable checked status
        const checkbox = document.getElementById(`gedepiar-checkbox-input-${service.alias}`);
        if (this.settings.outputHelper.isDomEl(checkbox)) {
          checkbox.classList.remove('is-active');
          checkbox.checked = false;
        }

        // Select all overlays and activate them
        const overlays = document.querySelectorAll(`.gedepiar-overlay-${service.alias}`);
        overlays.forEach((itemOverlay) => itemOverlay.classList.add('is-open'));

        // Execute custom disable-Function
        if (typeof service.onDisable === 'function') {
          service.onDisable(elements, this.settings);
        }
      });
    });
  }
}
