export default class LayoutBtn {
  /**
   * @param data
   */
  constructor(data) {
    this.data = data;
  }

  /**
   * Render DOM-Element
   *
   * @returns {HTMLAnchorElement}
   */
  render() {
    const btn = document.createElement('a');
    if (typeof this.data.label === 'string') {
      btn.innerText = this.data.label;
    }
    if (typeof this.data.labelHtml === 'string') {
      btn.innerHTML = this.data.labelHtml;
    }

    if (Array.isArray(this.data.attributes)) {
      this.data.attributes.forEach((item) => {
        if (typeof item === 'object') {
          const key = Object.keys(item)[0];
          const value = Object.values(item)[0];

          if (key === 'class') {
            if (Array.isArray(value)) {
              btn.classList.add(...value);
            } else if (typeof value === 'string') {
              btn.classList.add(value);
            }
          } else {
            btn.setAttribute(key, value);
          }
        }
      });
    }

    return btn;
  }
}
