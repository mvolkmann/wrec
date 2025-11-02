import {css, html, Wrec} from '../wrec';

class LabeledInput extends Wrec {
  static properties = {
    id: {type: String, required: true},
    label: {type: String, required: true},
    name: {type: String},
    value: {type: String}
  };

  static css = css`
    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `;

  static html = html`
    <div>
      <label for="this.id">this.label</label>
      <input id="this.id" name="this.name" type="text" value="this.value" />
    </div>
  `;
}

LabeledInput.register();
