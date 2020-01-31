// CSS
import './css/info.scss';
import './css/modal.scss';
import './css/checkbox.scss';
import './css/overlay.scss';

// Libs
import LibEventBus from './js/libs/LibEventBus';
import LibEventListeners from './js/libs/LibEventListeners';
import LibServices from './js/libs/LibServices';

// Layout
// import LayoutHandler from './js/layout/LayoutModalHandler';
import LayoutModal from './js/layout/LayoutModal';
import LayoutInfo from './js/layout/LayoutInfo';

// Translation
import I18nDe from './js/i18n/I18nDe';
import I18nEn from './js/i18n/I18nEn';

// Helpers
import HelperOutput from './js/helpers/HelperOutput';

export default class Gedepiar {
  static init(customSettings) {
    // Merge the default settings with custom settings
    const defaultSettings = {
      services: [],
      fallbackLang: 'en',
      i18n: {
        de: I18nDe,
        en: I18nEn,
      },
    };
    const settings = { ...defaultSettings, ...customSettings };

    // Add Output Helper to settings
    settings.outputHelper = HelperOutput;

    // Initialize channel for communication between components
    settings.eventbus = new LibEventBus();

    // Prepare services for further usage
    settings.services = LibServices.prepare(settings.services);
    settings.servicesList = Object.values(settings.services);
    settings.servicesAliasList = Object.keys(settings.services);
    settings.servicesCategorized = LibServices.prepareCategorized(settings.servicesList);

    // Set current language
    settings.lang = (typeof document.querySelector('html').getAttribute('lang') !== 'undefined' ? document.querySelector('html').getAttribute('lang') : settings.fallbackLang);

    // Merge custom translations with default translations
    if (typeof customSettings.i18n === 'object') {
      if (typeof defaultSettings.i18n[settings.lang] === 'object' && typeof customSettings.i18n[settings.lang] === 'object') {
        settings.i18n[settings.lang] = {
          ...defaultSettings.i18n[settings.lang],
          ...customSettings.i18n[settings.lang],
        };
      }
    }

    if (typeof settings.i18n[settings.lang] === 'object') {
      settings.translation = settings.i18n[settings.lang];
    } else {
      settings.translation = settings.i18n[settings.fallbackLang];
    }

    // Initailize Event Listeners
    const eventListeners = new LibEventListeners(settings);
    eventListeners.init();

    // Excecute init-Functions of services
    LibServices.init(settings);

    const body = document.querySelector('body');

    // Add Cookie-Modal to DOM
    const modal = new LayoutModal(settings).render();
    body.appendChild(modal);

    // Add Cookie-Info to DOM
    const info = new LayoutInfo(settings).render();
    if (localStorage.getItem('gedepiar-enabled') !== 'true') {
      info.classList.add('is-open');
    }
    info.classList.add('is-open');
    body.appendChild(info);

    // Activate services
    const activateServices = settings.servicesAliasList.filter((item) => localStorage.getItem(`gedepiar-enabled-${item}`) === 'true');
    settings.eventbus.publish('services-activate', activateServices);
    return settings;
  }
}
