export default class LayoutCheckbox {
  constructor(data) {
    this.data = data;
  }

  /**
   * Render Checkbox
   *
   * @returns {HTMLDivElement}
   */
  render() {
    const checkbox = document.createElement('div');
    if (typeof this.data.class === 'string') {
      checkbox.classList.add(this.data.class);
    }
    checkbox.classList.add('gedepiar-checkbox');

    // Create Wrapper
    const checkboxInputWrapper = document.createElement('div');
    checkboxInputWrapper.classList.add('gedepiar-checkbox-input-wrapper');

    // Check status of checkbox
    if (typeof this.data.disabled === 'boolean' && this.data.disabled) {
      checkboxInputWrapper.classList.add('is-disabled');
    } else {
      checkboxInputWrapper.addEventListener('click', (e) => {
        const el = e.currentTarget;
        if (el.classList.contains('is-active')) {
          el.querySelector('input').checked = false;
          el.classList.remove('is-active');
        } else {
          el.querySelector('input').checked = true;
          el.classList.add('is-active');
        }
      });
    }

    // Add class is-active if is checked
    if (typeof this.data.checked === 'boolean' && this.data.checked) {
      checkboxInputWrapper.classList.add('is-active');
    }

    // Create input-element
    const checkboxInput = document.createElement('input');
    checkboxInput.setAttribute('type', 'checkbox');

    // Add status checked to input
    if (typeof this.data.checked === 'boolean' && this.data.checked) {
      checkboxInput.checked = true;
    }

    // Set value
    if (typeof this.data.value === 'string') {
      checkboxInput.value = this.data.value;
    }

    // Set ID
    if (typeof this.data.id === 'string') {
      checkboxInput.id = this.data.id;
    }

    // Add input to wrapper
    checkboxInputWrapper.appendChild(checkboxInput);

    // Add sliding element
    const checkboxSlide = document.createElement('div');
    checkboxSlide.classList.add('gedepiar-checkbox__slide');
    checkboxInputWrapper.appendChild(checkboxSlide);

    checkbox.appendChild(checkboxInputWrapper);

    // Add label to checkbox
    if (typeof this.data.label === 'string') {
      const label = document.createElement('label');
      label.classList.add('gedepiar-checkbox__label');
      label.innerText = this.data.label;
      if (typeof this.data.id === 'string') {
        label.setAttribute('for', this.data.id);
      }
      checkbox.appendChild(label);
    }

    return checkbox;
  }
}
