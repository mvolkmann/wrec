//import {CodeBubble} from 'code-bubble';
//const options = {};
//new CodeBubble(options);

const html = String.raw;

/**
 * A group of radio buttons.
 * @tag radio-group
 * @csspart none
 * @cssproperty [--border-color=black] - the fieldset border color
 * @cssproperty [--direction=row] - the direction of the radio buttons
 * @cssproperty [--gap=1rem] - the gap between the radio buttons
 * @cssproperty --legend-color - the color of the legend text
 * @slot before - optional content to insert before the radio buttons
 * @slot after - optional content to insert after the radio buttons
 */
export class RadioGroupVanilla extends HTMLElement {
  #labels = '';
  #legend = '';
  #name = '';
  #value = '';
  #values = '';

  constructor() {
    console.log('radio-group-vanilla.js constructor: entered');
    super();
    this.attachShadow({mode: 'open'});
  }

  attributeChangedCallback(attrName, _oldValue, newValue) {
    if (propName === 'labels') {
      this.#labels = newValue;
    } else if (propName === 'legend') {
      this.#legend = newValue;
    } else if (propName === 'name') {
      this.#labels = newValue;
    } else if (attrName === 'value') {
      this.#value = newValue;
      this.#fixValue();
    } else if (propName === 'values') {
      this.#labels = newValue;
      this.#fixValue();
    }
    this.render();
  }

  connectedCallback() {
    this.#labels = this.getAttribute('labels');
    console.log(
      'radio-group-vanilla.js connectedCallback: this.#labels =',
      this.#labels
    );
    this.#legend = this.getAttribute('legend');
    this.#name = this.getAttribute('name');
    this.#value = this.getAttribute('value');
    this.#values = this.getAttribute('values');

    //if (!name) throw new CustomError('name is a required attribute');

    this.render();
  }

  // This handles the case when the specified value
  // is not in the list of values.
  #fixValue() {
    requestAnimationFrame(() => {});
  }

  // This method cannot be private because it is called when
  // a change event is dispatched from a radio button.
  handleChange(event) {
    this.#value = event.target.value;
  }

  makeButtons(valueArray) {
    const labelArray = this.#labels.split(',');
    console.log('radio-group-vanilla.js makeButtons: labelArray =', labelArray);
    return valueArray
      .map(
        (value, index) =>
          html` <div>
            <input
              type="radio"
              id="${value}"
              name="${this.#name}"
              onchange="handleChange"
              value="${this.#value}"
              ${value === this.#value ? 'checked' : ''}
            />
            <label for="${value}">${labelArray[index]}</label>
          </div>`
      )
      .join('');
  }

  render() {
    let value = this.#value;
    const valueArray = this.#values.split(',').map(value => value.trim());
    if (!value || !valueArray.includes(value)) {
      value = this.#value = valueArray[0];
    }

    // Setting innerHTML removes the need to use low-level
    // DOM methods like `createElement` and `appendChild`.
    this.shadowRoot.innerHTML = html`
      <style>
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
      </style>

      <fieldset>
        <legend style="this.displayIfSet(this.#legend)">${this.#legend}</legend>
        <slot name="before"></slot>
        <div>${this.makeButtons(valueArray)}</div>
        <slot name="after"></slot>
      </fieldset>

      <code-bubble>
        <pre>
          <code class="language-html">
            &lt;radio-group-vanilla
              labels=&quot;Purple,Pink&quot;
              legend=&quot;Color&quot;
              name=&quot;color-demo-bubble&quot;
              value=&quot;pink&quot;
              values=&quot;purple,pink&quot;
            &gt;&lt;/radio-group-vanilla&gt;
          </code>
        </pre>
      </code-bubble>
    `;

    this.#fixValue();
  }
}

customElements.define('radio-group-vanilla', RadioGroupVanilla);
