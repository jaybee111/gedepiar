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
      label: this.settings.translation.info_btn_accept,
      attributes: [
        { href: '#' },
        { class: ['gedepiar-info__btn-accept', 'gedepiar-info__btn'] },
      ],
    };
    const btnAccept = new LayoutBtn(dataBtnAccept);
    const btnAcceptNode = btnAccept.render();
    btnAcceptNode.addEventListener('click', (e) => {
      e.preventDefault();
      this.settings.eventbus.publish('services-activate-all', this.settings);
    });

    // Button edit settings
    const dataBtnEdit = {
      label: this.settings.translation.info_btn_edit,
      attributes: [
        { href: '#' },
        { class: ['gedepiar-info__btn-edit', 'gedepiar-info__btn'] },
      ],
    };
    const btnEdit = new LayoutBtn(dataBtnEdit);
    const btnEditNode = btnEdit.render();
    btnEditNode.addEventListener('click', (e) => {
      e.preventDefault();
      this.settings.eventbus.publish('modal-open');
    });

    // Cookie-Info-Text
    const infoText = document.createElement('p');
    const link = document.createElement('a');
    link.setAttribute('href', this.settings.translation.data_privacy_target);
    link.classList.add('gedepiar-info__data-privacy-link');
    link.innerText = this.settings.translation.data_privacy_label;
    infoText.innerHTML = this.settings.translation.info_text.replace('{{data_privacy_target}}', link.outerHTML);

    // Wrapper ersteller
    const divWrapper = document.createElement('div');
    divWrapper.classList.add('gedepiar-info');

    if (!localStorage.getItem('gedepiar-accepted')) {
      divWrapper.classList.add('is-open');
    }

    const divInner = document.createElement('div');
    divInner.classList.add('gedepiar-info__inner');
    divInner.appendChild(infoText);
    divInner.appendChild(btnAcceptNode);
    divInner.appendChild(btnEditNode);
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
