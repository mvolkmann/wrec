import Wrec, {css, html} from '../wrec';

class RadioGroup extends Wrec {
  static formAssociated = true;

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
      <legend style="this.displayIfSet(this.legend)">this.legend</legend>
      <slot name="before"></slot>
      <div>this.makeButtons(this.labels, this.values, this.value)</div>
      <slot name="after"></slot>
    </fieldset>
  `;

  connectedCallback() {
    super.connectedCallback();
    this.#fixValue();
  }

  propertyChangedCallback(propName, oldValue, newValue) {
    if (propName === 'value') {
      // Update the checked state of the radio buttons.
      const inputs = this.shadowRoot.querySelectorAll('input');
      for (const input of inputs) {
        input.checked = input.value === newValue;
      }
    } else if (propName === 'values') {
      this.#fixValue();
    }
  }

  // This handles the case when the specified value
  // is not in the list of values.
  #fixValue() {
    requestAnimationFrame(() => {
      const values = this.values.split(',');
      if (!this.value || !values.includes(this.value)) this.value = values[0];
    });
  }

  // This method cannot be private because it is called when
  // a change event is dispatched from a radio button.
  handleChange(event) {
    this.value = event.target.value;
  }

  makeButtons(labels, values) {
    const labelArray = labels.split(',');
    const valueArray = values.split(',').map(value => value.trim());
    return valueArray
      .map(
        (value, index) =>
          html` <div>
            <input
              type="radio"
              id="${value}"
              name="${this.name}"
              onchange="handleChange"
              value="${value}"
              ${value === this.value ? 'checked' : ''}
            />
            <label for="${value}">${labelArray[index]}</label>
          </div>`
      )
      .join('');
  }
}

RadioGroup.register();
