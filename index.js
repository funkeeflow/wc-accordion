class AnimatedDetail {
  /**
   * All credits go to Louis Hoebregts (@Mamboleoo)
   * Code taken from his article on css-tricks.com
   * https://css-tricks.com/how-to-animate-the-details-element-using-waapi/
   *
   * This slightly modified and renamed.
   */
  constructor(el, animationDuration = 200, animationEase = 'linear') {
    this.el = el;
    this.summary = el.querySelector('summary');
    this.content = el.querySelector('summary + *');
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.easing = animationEase;
    this.duration = animationDuration;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    try {
      this.summary.addEventListener('click', (e) => this.onClick(e));
    } catch (error) {
      console.warn(error)
    }
  }

  onClick(e) {
    e.preventDefault();
    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    this.el.style.overflow = 'hidden';
    this.isClosing = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;

    const duration = getComputedStyle(this.el).getPropertyValue('--animation-duration') || getComputedStyle(this.el).getPropertyValue('--animation-duration-end');
    const easing = getComputedStyle(this.el).getPropertyValue('--animation-easing') || getComputedStyle(this.el).getPropertyValue('--animation-easing-end');

    if (this.animation) this.animation.cancel();

    if (this.prefersReducedMotion.matches === false) {

      this.animation = this.el.animate(
        {
          height: [startHeight, endHeight],
        },
        {
          duration: parseInt(duration) || this.duration,
          easing: easing || this.easing,
        }
      );

      this.animation.onfinish = () => this.onAnimationFinish(false);
      this.animation.oncancel = () => (this.isClosing = false);
    } else {
      this.onAnimationFinish(false);
    }
  }

  open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.style.overflow = 'hidden';
    this.el.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight
      }px`;

    if (this.animation) this.animation.cancel();

    const duration = getComputedStyle(this.el).getPropertyValue('--animation-duration') || getComputedStyle(this.el).getPropertyValue('--animation-duration-start');

    const easing = getComputedStyle(this.el).getPropertyValue('--animation-easing') || getComputedStyle(this.el).getPropertyValue('--animation-easing-start');

    if (this.prefersReducedMotion.matches === false) {
      this.animation = this.el.animate(
        {
          height: [startHeight, endHeight],
        },
        {
          duration: parseInt(duration) || this.duration,
          easing: easing || this.easing,
        }
      );

      this.animation.onfinish = () => this.onAnimationFinish(true);
      this.animation.oncancel = () => (this.isExpanding = false);
    } else {
      this.onAnimationFinish(true)
    }
  }

  onAnimationFinish(open) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = this.el.style.overflow = '';
  }
}
const html = String.raw;
export class Accordion extends HTMLElement {
  template = html`
    <style>
      :host{display: block;}
    </style>
    <slot></slot>
  `;

  static get observedAttributes() {
    return ['mode'];
  }

  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = this.template;

    this.defaultSlot = Array.from(
      this.shadowRoot.querySelectorAll('slot')
    ).filter((slot) => !slot.name)[0];

    this.elements = [];
  }

  openAll = () => {
    this.elements.forEach((el) => {
      el.open();
    });
  };

  closeAll = () => {
    this.elements.forEach((el) => {
      el.shrink();
    });
  };

  open = (index) => {
    try {
      this.elements[index].open();
    } catch (error) {
      console.error(error);
    }
  };

  close = (index) => {
    try {
      this.elements[index].shrink();
    } catch (error) {
      console.error(error);
    }
  };

  handleOnChange = (event) => {
    if (event.target.checked) {
      this.openAll();
    } else {
      this.closeAll();
    }
  };

  handleExclusiveOpen = (event) => {
    this.elements.forEach((detail) => {
      if (detail.el !== event.target.parentNode) {
        detail.shrink();
      }
    });
  };

  attributeChangedCallback() {
    const modeExclusive = this.getAttribute('mode') === 'exclusive';
    if (modeExclusive) {
      this.defaultSlot.assignedElements().forEach((el) => {
        try {
          el.querySelector('summary').addEventListener(
            'click',
            this.handleExclusiveOpen
          );
        } catch (error) {
          console.warn(error);
        }
      });
    } else {
      this.defaultSlot.assignedElements().forEach((el) => {
        try {
          el.querySelector('summary').removeEventListener(
            'click',
            this.handleExclusiveOpen
          );
        } catch (error) {
          console.warn(error)
        }
      });
    }
  }

  connectedCallback() {
    this.defaultSlot.assignedElements().forEach((el) => {
      if (el.tagName === 'DETAILS') {
        this.elements.push(new AnimatedDetail(el));
      }
    });
  }

  disconnectedCallback() { }
}

customElements.define('wc-accordion', Accordion);
