import {html, Wrec} from '../wrec';

class ComputedCycle extends Wrec {
  static properties = {
    base: {type: Number, value: 1},
    first: {type: Number, computed: 'this.base + this.second'},
    second: {type: Number, computed: 'this.first + 1'}
  };

  static html = html`
    <div>Base: <span>this.base</span></div>
  `;
}

ComputedCycle.define('computed-cycle');
