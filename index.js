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
    this.summary.addEventListener('click', (e) => this.onClick(e));
    this.easing = animationEase;
    this.duration = animationDuration;
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
    const duration =
    getComputedStyle(this.el).getPropertyValue('--animation-duration') || getComputedStyle(this.el).getPropertyValue('--animation-duration-end');
    const easing = getComputedStyle(this.el).getPropertyValue('--animation-easing') || getComputedStyle(this.el).getPropertyValue('--animation-easing-end');
    console.log(easing)
    if (this.animation) this.animation.cancel();

    this.animation = this.el.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: parseInt(duration) || this.duration,
        easing: easing || this.easing,
      }
    );

    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => (this.isClosing = false);
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
    this.animation = this.el.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: parseInt(duration) || this.duration,
        easing: easing || this.easing,
      }
    );
    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => (this.isExpanding = false);
  }

  onAnimationFinish(open) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = this.el.style.overflow = '';
  }
}
export class Accordion extends HTMLElement {
  template = `<slot></slot>`;

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
      console.log(error);
    }
  };

  close = (index) => {
    try {
      this.elements[index].shrink();
    } catch (error) {
      console.log(error);
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
        el.querySelector('summary').addEventListener(
          'click',
          this.handleExclusiveOpen
        );
      });
    } else {
      this.defaultSlot.assignedElements().forEach((el) => {
        el.querySelector('summary').removeEventListener(
          'click',
          this.handleExclusiveOpen
        );
      });
    }
  }

  connectedCallback() {
    this.defaultSlot.assignedElements().forEach((el) => {
      this.elements.push(new AnimatedDetail(el));
    });
  }

  disconnectedCallback() { }
}

customElements.define('wc-accordion', Accordion);
