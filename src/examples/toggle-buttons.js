import {css, html, Wrec} from '../wrec';

//TODO: Compare this to the vanilla version.
// It is a great example of how much wrec simplifies the code.
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

  static html = 'this.makeButtons(this.labels)';

  handleClick(event) {
    this.value = event.target.textContent.trim();
  }

  makeButtons(labels) {
    return labels
      .split(',')
      .map(
        label => html`
          <button
            class="this.value === '${label}' ? 'selected' : ''"
            onClick="handleClick"
          >
            ${label}
          </button>
        `
      );
  }
}

ToggleButtons.register();
