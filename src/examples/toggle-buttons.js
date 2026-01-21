import {css, html, Wrec} from '../wrec';

//TODO: Compare this to the vanilla version.
class ToggleButtons extends Wrec {
  static properties = {
    labels: {type: String},
    value: {type: String, dispatch: true}
  };

  static css = css`
    /*TODO: Can you remove the span wrapper and use :host here? */
    span {
      display: flex;
      gap: 0.25rem;
    }

    button {
      background-color: var(--button-bg-color, lightgreen);
      border: none;
      border-radius: 0.5rem;
      color: var(--button-color, black);
      font-weight: bold;
      padding: 0.5rem;
    }

    button.selected {
      background-color: var(--button-selected-bg-color, green);
      color: var(--button-selected-color, white);
    }
  `;

  static html = html`<span>this.makeButtons(this.labels)</span>`;

  connectedCallback() {
    super.connectedCallback();
    requestAnimationFrame(this.updateSelected.bind(this));
  }

  handleClick(event) {
    this.value = event.target.textContent;
    this.updateSelected();
  }

  makeButtons(labels) {
    return labels
      .split(',')
      .map(label => html`<button onClick="handleClick">${label}</button>`);
  }

  updateSelected() {
    const {value} = this;
    for (const button of this.shadowRoot.querySelectorAll('button')) {
      const match = button.textContent === value;
      button.classList.toggle('selected', match);
      if (!match) button.removeAttribute('class');
    }
  }
}

ToggleButtons.register();
