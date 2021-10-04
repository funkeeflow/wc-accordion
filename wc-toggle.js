class Toggle extends HTMLElement {
  styles = `
    <style>
      label {
        cursor: pointer;
        text-decoration: underline;
      }
      
      input[type='checkbox'] {
        position: absolute;
        z-index: -999;
        left: 0;
        width: 0;
        height: 0;
        opacity: 0;
      }
      
      [type='checkbox']:focus ~ slot {
        outline: 1px solid green;
        outline: 2px solid -webkit-focus-ring-color;
      }
      
      [type='checkbox'] ~ slot:first-of-type {
        display: none;
      }
      
      [type='checkbox'] ~ slot:last-of-type {
        display: initial;
      }
      
      [type='checkbox']:checked ~ slot:first-of-type {
        display: initial;
      }
      
      [type='checkbox']:checked ~ slot:last-of-type {
        display: none;
      }
    </style>`;

  template = `
    ${this.styles}
    <label class="toggle">
      <input type="checkbox" />
      <slot name="off"><span>Off</span></slot>
      <slot name="on"><span>On</span></slot>
    </label>
   `;

  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = this.template;
  }

  handleOnChange = (event) => {
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        detail: {
          checked: event.target.checked,
        },
      })
    );
  };

  connectedCallback() {
    this.shadowRoot
      .querySelector('.toggle')
      .addEventListener('change', this.handleOnChange);
  }

  disconnectedCallback() {}
}

customElements.define('wc-toggle', Toggle);
