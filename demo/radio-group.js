import Wrec, {css, html} from './wrec.min.js';

class RadioGroup extends Wrec {
  static properties = {
    labels: {type: String},
    legend: {type: String},
    name: {type: String, required: true},
    values: {type: String},
    value: {type: String}
  };

  static css = css`
    :host > div {
      display: flex;
      gap: 0.5rem;
    }

    fieldset {
      border-color: var(--border-color, 'black');
      display: inline-flex;
      flex-direction: column;
      align-items: start;
      gap: 0.5rem;

      > legend {
        color: var(--legend-color, 'black');
      }

      > div {
        display: flex;
        flex-direction: var(--direction, row);
        gap: var(--gap, 1rem);
      }
    }

    input {
      margin: 0;
    }
  `;

  static html = html`
    <fieldset>
      <legend>this.legend</legend>
      <slot name="before"></slot>
      <div>this.makeButtons(this.labels, this.values, this.value)</div>
      <slot name="after"></slot>
    </fieldset>
  `;

  handleChange(event) {
    this.value = event.target.value;
  }

  makeButtons(labels, values) {
    const labelArray = labels.split(',');
    const valueArray = values.split(',').map(value => value.trim());
    // prettier-ignore
    return valueArray.map((value, index) => html`
      <div>
        <input
          type="radio"
          id=${value}
          name=${this.name}
          onchange="handleChange"
          value=${value}
          ${value === this.value ? 'checked' : ''}
        />
        <label for=${value}>${labelArray[index]}</label>
      </div>
    `).join('');
  }

  propertyChangedCallback(propName, _oldValue, newValue) {
    if (propName === 'value') {
      // Update the checked state of the radio buttons.
      const inputs = this.shadowRoot.querySelectorAll('input');
      for (const input of inputs) {
        input.checked = input.value === newValue;
      }
    }
  }
}

RadioGroup.register();
