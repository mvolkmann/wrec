import {html, Wrec} from '../wrec.js';

class ObjectDemo extends Wrec {
  static properties = {
    doubleCount: {
      computed: 'this.person.stats.count * 2',
      type: Number
    },
    person: {
      type: Object,
      value: {
        name: 'Ada',
        stats: {
          count: 1
        }
      }
    }
  };

  static html = html`
    <p id="name">${this.person.name}</p>
    <p id="count">${this.doubleCount}</p>
  `;
}

customElements.define('object-demo', ObjectDemo);
