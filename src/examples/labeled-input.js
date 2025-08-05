import Wrec, {css, html} from '../wrec';

class LabeledInput extends Wrec {
  static properties = {
    label: {type: String},
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
      <label>this.label</label>
      <input name="this.name" type="text" value="this.value" />
    </div>
  `;
}

LabeledInput.register();
