import LayoutBtn from './LayoutBtn';

export default class LayoutInfo {
  /**
   *
   * @param settings
   */
  constructor(settings) {
    this.settings = settings;
  }

  /**
   * Render Cookie-Info
   *
   * @returns {HTMLDivElement}
   */
  render() {
    // Button accept all
    const dataBtnAccept = {
      labelHtml: this.settings.translation.infoBtnAccept,
      attributes: [
        { href: '#' },
        { class: ['gedepiar-info__btn-accept', 'gedepiar-info__btn'] },
      ],
    };
    const btnAccept = new LayoutBtn(dataBtnAccept).render();
    btnAccept.addEventListener('click', (e) => {
      e.preventDefault();
      this.settings.eventbus.publish('services-activate', this.settings.servicesAliasList);
      this.settings.eventbus.publish('info-close');
    });

    // Button accept Essential
    const dataBtnAcceptEssential = {
      label: this.settings.translation.infoBtnAcceptEssential,
      attributes: [
        { href: '#' },
        { class: ['gedepiar-info__btn-accept-essential', 'gedepiar-info__btn'] },
      ],
    };
    const btnAcceptEssential = new LayoutBtn(dataBtnAcceptEssential).render();
    btnAcceptEssential.addEventListener('click', (e) => {
      e.preventDefault();
      this.settings.eventbus.publish('info-close');
    });

    // Button edit settings
    const dataBtnEdit = {
      label: this.settings.translation.infoBtnEdit,
      attributes: [
        { href: '#' },
        { class: ['gedepiar-info__btn-edit', 'gedepiar-info__btn'] },
      ],
    };
    const btnEdit = new LayoutBtn(dataBtnEdit).render();
    btnEdit.addEventListener('click', (e) => {
      e.preventDefault();
      this.settings.eventbus.publish('modal-open');
    });

    // Add Description including link to data privacy
    const infoText = document.createElement('p');
    const link = document.createElement('a');
    link.setAttribute('href', this.settings.translation.dataPrivacyTarget);
    link.classList.add('gedepiar-info__data-privacy-link');
    link.innerText = this.settings.translation.dataPrivacyLabel;

    infoText.innerHTML = this.settings.translation.infoText.replace('{{dataPrivacyTarget}}', link.outerHTML);

    // Footnav
    const footnav = document.createElement('ul');
    footnav.classList.add('gedepiar-info__footnav');
    if (
      typeof this.settings.translation.imprintTarget !== 'undefined'
      && typeof this.settings.translation.imprintLabel !== 'undefined'
    ) {
      const liImprint = document.createElement('li');
      const aImprint = document.createElement('a');
      aImprint.setAttribute('href', this.settings.translation.imprintTarget);
      aImprint.innerText = this.settings.translation.imprintLabel;
      liImprint.appendChild(aImprint);
      footnav.appendChild(liImprint);
    }
    if (
      typeof this.settings.translation.dataPrivacyTarget !== 'undefined'
      && typeof this.settings.translation.dataPrivacyLabel !== 'undefined'
    ) {
      const liDataPrivacy = document.createElement('li');
      const aDataPrivacy = document.createElement('a');
      aDataPrivacy.setAttribute('href', this.settings.translation.dataPrivacyTarget);
      aDataPrivacy.innerText = this.settings.translation.dataPrivacyLabel;
      liDataPrivacy.appendChild(aDataPrivacy);
      footnav.appendChild(liDataPrivacy);
    }

    // Wrapper
    const divWrapper = document.createElement('div');
    divWrapper.classList.add('gedepiar-info');

    if (!localStorage.getItem('gedepiar-accepted')) {
      divWrapper.classList.add('is-open');
    }

    // Add all parts to wrapper
    const divInner = document.createElement('div');
    divInner.classList.add('gedepiar-info__inner');
    divInner.appendChild(infoText);
    divInner.appendChild(btnAccept);
    divInner.appendChild(btnAcceptEssential);
    divInner.appendChild(btnEdit);
    divInner.appendChild(footnav);
    divWrapper.appendChild(divInner);

    // Set display-type of cookie info
    if (this.settings.position === 'right') {
      divWrapper.classList.add('is-right');
    } else if (this.settings.position === 'left') {
      divWrapper.classList.add('is-left');
    } else {
      divWrapper.classList.add('is-full-width');
    }

    return divWrapper;
  }
}
