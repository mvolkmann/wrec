const template = document.createElement('template');
const html = String.raw;
template.innerHTML = html`
  <style>
    label {
      font-weight: bold;
    }
    button {
      background-color: lightgreen;
    }
    button:disabled {
      opacity: 0.8;
    }
  </style>
  <label></label>
  <button id="dec-btn" type="button">-</button>
  <span></span>
  <button id="inc-btn" type="button">+</button>
`;

class CounterVanilla extends HTMLElement {
  static get observedAttributes() {
    return ['count'];
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  attributeChangedCallback() {
    if (this.span) this.#update();
  }

  connectedCallback() {
    const root = this.shadowRoot;
    root.appendChild(template.content.cloneNode(true));

    const label = root.querySelector('label');
    label.textContent = this.getAttribute('label');

    this.decBtn = root.querySelector('#dec-btn');
    this.decBtn.addEventListener('click', () => {
      this.decrement();
    });
    root.querySelector('#inc-btn').addEventListener('click', () => {
      this.increment();
    });

    this.span = root.querySelector('span');
    this.#update();
  }

  // Treat the count attribute as the source of truth
  // rather than adding a property.
  get count() {
    return this.getAttribute('count') || 0;
  }

  set count(newCount) {
    this.setAttribute('count', newCount);
  }

  decrement() {
    this.count--;
    this.#update();
  }

  increment() {
    this.count++;
    this.#update();
  }

  #update() {
    const count = this.getAttribute('count');
    if (this.span) this.span.textContent = count;
    // Using == instead of === because count is a string.
    if (count == 0) {
      this.decBtn.setAttribute('disabled', 'disabled');
    } else {
      this.decBtn.removeAttribute('disabled');
    }
  }
}

customElements.define('counter-vanilla', CounterVanilla);
