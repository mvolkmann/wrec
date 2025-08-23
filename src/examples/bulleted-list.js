import Wrec, {html} from '../wrec';

class BulletedList extends Wrec {
  static properties = {
    items: {type: String, required: true}
  };

  static html = html`
    <ul>
      this.items.split(',').map(this.makeItem)
    </ul>
  `;

  makeItem(item) {
    return html`<li>${item}</li>`;
  }
}

BulletedList.register();
