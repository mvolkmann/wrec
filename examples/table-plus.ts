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

      > button {
        background-color: transparent;
        border: none;
        color: white;
        cursor: pointer;
      }
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

  data: object[] = [];
  headers: string[] = [];
  properties: string[] = [];
  sortAscending = true;
  sortProperty = '';

  connectedCallback() {
    super.connectedCallback();
    const tr = this.shadowRoot?.querySelector('table > thead > tr');
    if (!tr) return;

    tr.innerHTML = ''; // removes existing children

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.headers.forEach((header, index) => {
          const property = this.properties[index];
          const button = document.createElement('button');
          button.textContent = header;
          button.addEventListener('click', () => {
            const sameProperty = property === this.sortProperty;
            this.sortAscending = sameProperty ? !this.sortAscending : true;

            this.data.sort((a, b) => {
              const aValue = a[property];
              const bValue = b[property];
              let compare =
                typeof aValue === 'string'
                  ? aValue.localeCompare(bValue)
                  : typeof aValue === 'number'
                  ? aValue - bValue
                  : 0;
              return this.sortAscending ? compare : -compare;
            });

            this.data = [...this.data];
            this.sortProperty = property;
          });
          const th = document.createElement('th');
          th.appendChild(button);
          tr.appendChild(th);
        });
      });
    });

    /*
    //TODO: Why do I need to call this twice?
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const ths = this.shadowRoot?.querySelectorAll(
          'table > thead > tr > th'
        );
        console.log('table-plus.ts: ths =', ths);
      });
    });
    */
  }

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

  sort() {}
}

TablePlus.register();
