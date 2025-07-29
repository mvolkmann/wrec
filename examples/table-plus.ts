import Wrec, {css, html} from '../wrec.js';

class TablePlus extends Wrec {
  static properties = {
    headers: {type: Array<string>, value: []},
    data: {type: Array, value: []}
  };

  static css = css`
    table {
      border-collapse: collapse;
    }
    td,
    th {
      border: 1px solid gray;
      padding: 0.5rem;
    }
    th {
      background-color: cornflowerblue;
      color: white;
    }
  `;

  static html = html`
    <table>
      <thead>
        <tr>
          <!-- this.headers.map(this.makeTh.bind(this)).join('') -->
        </tr>
      </thead>
      <tbody>
        <!-- this.data.map(this.makeTr.bind(this)).join('') -->
      </tbody>
    </table>
  `;

  makeTh(header) {
    return html`<th>${header}</th>`;
  }

  makeTr(obj) {
    return html`<tr>
      ${Object.values(obj)
        .map(v => html`<td>${v}</td>`)
        .join('')}
    </tr>`;
  }
}

TablePlus.register();
