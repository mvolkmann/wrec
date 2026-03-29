import {html, Wrec} from '../wrec';

class SelectList extends Wrec {
  static formAssociated = true;

  static properties = {
    labels: {type: String, usedBy: ['makeOptions']},
    value: {type: String},
    values: {type: String, usedBy: ['makeOptions']}
  };

  static html = html`
    <select value="this.value">
      this.makeOptions()
    </select>
  `;

  connectedCallback() {
    super.connectedCallback();
    this.#fixValue();
  }

  // This handles the case when the specified value
  // is not in the list of values.
  #fixValue() {
    requestAnimationFrame(() => {
      const values = this.values.split(',');
      if (!this.value || !values.includes(this.value)) this.value = values[0];
    });
  }

  makeOptions() {
    const labelArray = this.labels.split(',');
    const valueArray = this.values.split(',');
    return valueArray.map(
      (value, index) =>
        html`<option value="${value.trim()}">${labelArray[index]}</option>`
    );
  }
}

SelectList.define('select-list');
