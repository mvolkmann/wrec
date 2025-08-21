import Wrec, {html} from '../wrec';

class BulletedList extends Wrec {
  static properties = {
    items: {type: String, required: true }
  };

  static html = html`
   <ul>
     {items.split(',').map(item => html`<li>${item}</li>`).join('')}
   </ul>
  `;
}

BulletedList.register();
