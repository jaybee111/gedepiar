// Services
import ServiceGa from '../services/ServiceGa';
import ServiceGmap from '../services/ServiceGmap';
import ServiceYt from '../services/ServiceYt';
import ServicePhpSession from '../services/ServicePhpSession';
import ServiceVimeo from '../services/ServiceVimeo';
import ServiceMatomo from '../services/ServiceMatomo';

export default class LibServices {
  /**
   * Fire all init-callbacks of activated services
   *
   * @param settings
   */
  static init(settings) {
    settings.servicesList.forEach((item) => {
      // Check for custom init functions
      if (typeof item.onInit === 'function') {
        item.onInit(item.elements, settings);
      }

      // Check for services with overlay
      if (Array.isArray(item.elements.overlay)) {
        item.elements.overlay.forEach((element) => {
          const overlay = document.createElement('div');
          overlay.classList.add('gedepiar-overlay', `gedepiar-overlay-${item.alias}`);

          // Preview image
          const previewImg = element.getAttribute('data-gedepiar-overlay-img');
          if (previewImg) {
            overlay.classList.add('has-img');
            overlay.setAttribute('style', `background-image:url(${previewImg})`);
          }

          const overlayInner = document.createElement('div');
          overlayInner.classList.add('gedepiar-overlay__inner');

          // Headline
          const headline = document.createElement('h3');
          headline.classList.add('gedepiar-overlay__headline');
          headline.innerText = settings.translation[`${item.alias}OverlayHeadline`];

          // Content
          const p = document.createElement('p');
          p.innerText = settings.translation[`${item.alias}OverlayContent`];

          const content = document.createElement('div');
          content.classList.add('gedepiar-overlay__content');
          content.appendChild(headline);
          content.appendChild(p);

          // Button
          const btn = document.createElement('a');
          btn.classList.add('gedepiar-overlay__btn');
          btn.innerText = settings.translation[`${item.alias}OverlayBtnLabel`];
          btn.setAttribute('href', '#');
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            settings.eventbus.publish('services-activate', [item.alias]);
          });

          overlayInner.appendChild(content);
          overlayInner.appendChild(btn);
          overlay.appendChild(overlayInner);

          // Check if service is disabled
          if (!this.isActivated(item.alias)) {
            overlay.classList.add('is-open');
          }

          const overlayWrapper = document.createElement('div');
          overlayWrapper.classList.add('gedepiar-overlay__wrapper', `gedepiar-overlay__wrapper-${item.alias}`);
          overlayWrapper.appendChild(overlay);
          const clonedElement = element.cloneNode(true);
          overlayWrapper.appendChild(clonedElement);

          // Replace element with overlay wrapper
          element.parentNode.replaceChild(overlayWrapper, element);
        });
      }
    });
  }

  /**
   * Add individual service object to service array or use predefined service
   * Parse html for data-attributes
   *
   * @param services
   * @returns {*}
   */
  static prepare(services) {
    const servicesHolder = {};
    services.forEach((item) => {
      let alias;
      if (typeof item === 'string') {
        if (item === 'ga') {
          servicesHolder[item] = ServiceGa;
        } else if (item === 'matomo') {
          servicesHolder[item] = ServiceMatomo;
        } else if (item === 'gmap') {
          servicesHolder[item] = ServiceGmap;
        } else if (item === 'yt') {
          servicesHolder[item] = ServiceYt;
        } else if (item === 'vimeo') {
          servicesHolder[item] = ServiceVimeo;
        } else if (item === 'phpsess') {
          servicesHolder[item] = ServicePhpSession;
        }
        alias = item;
      } else if (typeof item === 'object') {
        servicesHolder[item.alias] = item;
        alias = item.alias;
      }

      // Search for html-Tags with data-attribute "data-gedepiar-service"
      servicesHolder[alias].elements = {
        all: [],
        inlineScript: [],
        script: [],
        overlay: [],
        other: [],
      };
      const elements = document.querySelectorAll(`[data-gedepiar-service="${alias}"]`);
      elements.forEach((element) => {
        servicesHolder[alias].elements.all.push(element);
        if (element.tagName.toLowerCase() === 'script' && !element.hasAttribute('src')) {
          // Inline Scripttag
          servicesHolder[alias].elements.inlineScript.push(element);
        } else if (element.tagName.toLowerCase() === 'script' && element.hasAttribute('src')) {
          // Scripttag
          servicesHolder[alias].elements.script.push(element);
        } else if (element.hasAttribute('data-gedepiar-overlay') || element.hasAttribute('data-gedepiar-overlay-img')) {
          // Html-Tag with overlay
          servicesHolder[alias].elements.overlay.push(element);
        } else {
          // Other
          servicesHolder[alias].elements.other.push(element);
        }
      });
    });

    return servicesHolder;
  }

  /**
   * Categorize services
   *
   * @param services
   * @returns {*}
   */
  static prepareCategorized(services) {
    const cateogries = {};
    services.forEach((item) => {
      if (typeof item.category === 'string') {
        if (typeof cateogries[item.category] === 'undefined') {
          cateogries[item.category] = [];
        }
        cateogries[item.category].push(item);
      } else {
        throw new Error(`Add a category for service "${item.settings.alias}"`);
      }
    });

    return cateogries;
  }

  /**
   * Check if service is activated
   *
   * @param alias
   * @returns {boolean}
   */
  static isActivated(alias) {
    return (localStorage.getItem(`gedepiar-enabled-${alias}`) === 'true');
  }
}
