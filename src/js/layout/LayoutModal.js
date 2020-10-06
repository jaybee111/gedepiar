import LayoutBtn from './LayoutBtn';
import LayoutCheckbox from './LayoutCheckbox';

export default class LayoutModal {
  constructor(settings) {
    this.settings = settings;
  }

  /**
   * Build Modal
   *
   * @returns {HTMLDivElement}
   */
  render() {
    const modal = document.createElement('div');
    modal.classList.add('gedepiar-modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('gedepiar-modal__content');

    modalContent.appendChild(this.getHeader());
    modalContent.appendChild(this.getBody());
    modalContent.appendChild(this.getFooter());
    modal.appendChild(modalContent);

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
    divHeader.innerText = this.settings.translation.modalHeadline;

    // Add Close - Button to Header
    const attr = {
      labelHtml: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"/></svg>',
      attributes: [
        { href: '#' },
        { title: this.settings.translation.modalBtnClose },
        { class: 'gedepiar-modal__close-handler' },
      ],
    };
    const btnHeaderClose = new LayoutBtn(attr).render();
    btnHeaderClose.addEventListener('click', (e) => {
      e.preventDefault();
      this.settings.eventbus.publish('modal-close');
    });
    divHeader.appendChild(btnHeaderClose);

    return divHeader;
  }

  /**
   * Build Modalbody
   *
   * @returns {HTMLDivElement}
   */
  getBody() {
    const divBody = document.createElement('div');
    divBody.classList.add('gedepiar-modal__body');

    const divBodyInner = document.createElement('div');
    divBodyInner.classList.add('gedepiar-modal__body-inner');

    // Convert categories to array and looping over categories
    const categories = Object.keys(this.settings.servicesCategorized);
    categories.forEach((category) => {
      // Category intro
      const headline = document.createElement('h3');
      headline.innerText = this.settings.translation[`${category}CategoryHeadline`];
      divBodyInner.appendChild(headline);
      const intro = document.createElement('p');
      intro.innerText = this.settings.translation[`${category}CategoryText`];
      divBodyInner.appendChild(intro);

      // Create table
      const table = document.createElement('table');

      // Table Head
      const tableHead = document.createElement('thead');
      const tableHeadRow = document.createElement('tr');
      const tableHeadCell1 = document.createElement('td');
      tableHeadCell1.innerText = this.settings.translation.settingsTableHeadCell1;
      const tableHeadCell2 = document.createElement('td');
      tableHeadCell2.innerText = this.settings.translation.settingsTableHeadCell2;
      tableHeadRow.appendChild(tableHeadCell1);
      tableHeadRow.appendChild(tableHeadCell2);
      tableHead.appendChild(tableHeadRow);

      // Table Body - List services
      const tableBody = document.createElement('tbody');
      this.settings.servicesCategorized[category].forEach((service) => {
        const value = (typeof localStorage.getItem(`gedepiar-enabled-${service.alias}`) !== 'undefined' && localStorage.getItem(`gedepiar-enabled-${service.alias}`) === 'true');
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');

        // Set label and append it to cell
        const label = document.createElement('label');
        label.setAttribute('for', `gedepiar-checkbox-input-${service.alias}`);
        label.innerText = this.settings.translation[`${service.alias}Headline`];
        cell1.appendChild(label);

        // Set checkbox and append it to cell
        const checkboxSettings = {
          id: `gedepiar-checkbox-input-${service.alias}`,
          disabled: service.category === 'mandatory',
          checked: service.category === 'mandatory' || value,
          value: service.alias,
        };
        const checkbox = new LayoutCheckbox(checkboxSettings);
        cell2.appendChild(checkbox.render());

        // Append checkbox and label to row
        row.appendChild(cell1);
        row.appendChild(cell2);

        tableBody.appendChild(row);
      });

      table.appendChild(tableHead);
      table.appendChild(tableBody);
      divBodyInner.appendChild(table);
      divBody.appendChild(divBodyInner);
    });

    return divBody;
  }

  /**
   * Build Modalfooter
   *
   * @returns {HTMLDivElement}
   */
  getFooter() {
    const divFooter = document.createElement('div');
    divFooter.classList.add('gedepiar-modal__footer');

    // Add Save-Button to Footer
    const btnSaveAttr = {
      attributes: [
        { href: '#' },
        { class: ['gedepiar-modal__btn-save', 'gedepiar-modal__btn'] },
      ],
      label: this.settings.translation.modalBtnSave,
    };
    const btnSave = new LayoutBtn(btnSaveAttr).render();
    btnSave.addEventListener('click', (e) => {
      e.preventDefault();
      const activateServices = this.settings.servicesAliasList.filter((item) => document.getElementById(`gedepiar-checkbox-input-${item}`).checked && localStorage.getItem(`gedepiar-enabled-${item}`) !== 'true');
      const disableServices = this.settings.servicesAliasList.filter((item) => !document.getElementById(`gedepiar-checkbox-input-${item}`).checked);
      this.settings.eventbus.publish('services-activate', activateServices);
      this.settings.eventbus.publish('services-disable', disableServices);
      this.settings.eventbus.publish('info-close');
      this.settings.eventbus.publish('modal-close');
    });
    divFooter.appendChild(btnSave);

    // Add Save-All-Button to Footer
    const btnSaveAllAttr = {
      attributes: [
        { href: '#' },
        { class: ['gedepiar-modal__btn-save-all', 'gedepiar-modal__btn'] },
      ],
      label: this.settings.translation.modalBtnSaveAll,
    };
    const btnSaveAll = new LayoutBtn(btnSaveAllAttr).render();
    btnSaveAll.addEventListener('click', (e) => {
      e.preventDefault();
      this.settings.eventbus.publish('services-activate', this.settings.servicesAliasList);
      this.settings.eventbus.publish('info-close');
      this.settings.eventbus.publish('modal-close');
    });
    divFooter.appendChild(btnSaveAll);

    return divFooter;
  }
}
