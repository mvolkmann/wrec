import {css, html, Wrec} from '../wrec';

class RectangleArea extends Wrec {
  static properties = {
    height: {type: Number, value: 5},
    width: {type: Number, value: 10},
    // tests/computed-properties.spec.ts assumes area is a computed property.
    // If it is computed inline in the span element below, the test will fail.
    area: {type: Number, computed: 'this.width * this.height'}
  };
  declare width: number;
  declare height: number;
  declare area: number;

  static css = css`
    .area {
      font-weight: bold;
    }
  `;

  static html = html`
    <number-slider label="Width" value="this.width"></number-slider>
    <number-slider label="Height" value="this.height"></number-slider>
    <div class="area">Area: <span>this.area</span></div>
  `;

  propertyChangedCallback(
    propName: string,
    oldValue: unknown,
    newValue: unknown
  ) {
    console.log(
      `propertyChangedCallback: ${propName} changed from ${oldValue} to ${newValue}`
    );
  }
}

RectangleArea.define('rectangle-area');
