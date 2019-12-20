// CSS
import './css/info.scss';

// Libs
import LibEventBus from './js/libs/LibEventBus';
import LibEventListeners from './js/libs/LibEventListeners';
import LibServices from './js/libs/LibServices';
import LibCategories from './js/libs/LibCategories';

// Layout
// import LayoutHandler from './js/layout/LayoutModalHandler';
import LayoutModal from './js/layout/LayoutModal';
import LayoutInfo from './js/layout/LayoutInfo';

// Translation
import I18nDe from './js/i18n/I18nDe';
import I18nEn from './js/i18n/I18nEn';

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

    // Initialize channel for communication between components
    settings.eventbus = new LibEventBus();

    // Prepare services for further usage
    settings.services = LibServices.prepare(settings.services);

    // Set current language
    settings.lang = (typeof document.querySelector('html').getAttribute('lang') !== 'undefined' ? document.querySelector('html').getAttribute('lang') : settings.fallbackLang);

    // Merge custom translations with default translations
    if (typeof customSettings.i18n !== 'undefined') {
      if (typeof defaultSettings.i18n[settings.lang] !== 'undefined' && typeof customSettings.i18n[settings.lang] !== 'undefined') {
        settings.i18n[settings.lang] = {
          ...defaultSettings.i18n[settings.lang],
          ...customSettings.i18n[settings.lang],
        };
      }
    }

    if(customSettings.hasOwnProperty('i18n') && customSettings.i18n.hasOwnProperty(settings.lang)){
        if(default_translation.hasOwnProperty(lang)){
            translation = {...default_translation[lang],...cookie_settings.translation[lang]};
        } else {
            translation = {...default_translation['en'],...cookie_settings.translation[lang]};
        }
    } else {
        if(default_translation.hasOwnProperty(lang)){
            translation = default_translation[lang];
        } else {
            translation = default_translation['en'];
        }
    }


    settings.translation = settings.i18n[settings.lang];

    // Initialize categories
    settings.categories = LibCategories.init(settings.services);

    // Initailize Event Listeners
    const eventListeners = new LibEventListeners(settings);
    eventListeners.init();

    // Excecute init-Functions of services
    LibServices.init(settings.services);

    const body = document.querySelector('body');

    // Add Cookie-Modal to DOM
    const modal = new LayoutModal(settings);
    body.appendChild(modal.render());

    // Add Cookie-Modal-Handler to DOM
    /* let modalHandler = new GedepiarModalHandler(settings);
    modalHandler.render(); */

    // Add Cookie-Info to DOM
    const info = new LayoutInfo(settings);
    body.appendChild(info.render());
  }
}
