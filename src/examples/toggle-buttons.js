import {css, html, Wrec} from '../wrec';

//TODO: Compare this to the vanilla version.
// It is a great example of how much wrec simplifies the code.
class ToggleButtons extends Wrec {
  static properties = {
    labels: {type: String},
    value: {type: String, dispatch: true}
  };

  static css = css`
    :host > span {
      display: flex;
    }

    button {
      --radius: var(--border-radius, 0.5rem);
      --border: var(--border-width, 1px) solid var(--border-color, gray);
      background-color: var(--button-bg-color, lightgray);
      border: var(--border);
      border-right: none;
      color: var(--button-color, black);
      font-weight: bold;
      padding: var(--radius);
      &:first-of-type {
        border-radius: var(--radius) 0 0 var(--radius);
      }
      &:last-of-type {
        border-radius: 0 var(--radius) var(--radius) 0;
        border-right: var(--border);
      }
    }

    button.selected {
      background-color: var(--button-selected-bg-color, lightgreen);
      color: var(--button-selected-color, black);
    }
  `;

  static html = 'this.makeButtons(this.labels)';

  handleClick(event) {
    this.value = event.target.textContent.trim();
  }

  makeButtons(labels) {
    const labelArray = labels.split(',');
    return labelArray.map(label => {
      const classExpr = `this.value === '${label}' ? 'selected' : ''`;
      return html`
        <button class="${classExpr}" onClick="handleClick">${label}</button>
      `;
    });
  }
}

ToggleButtons.register();
