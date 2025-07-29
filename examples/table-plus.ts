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
  sortButton: HTMLButtonElement | null = null;
  sortHeader = '';

  connectedCallback() {
    super.connectedCallback();

    //TODO: Why do I need to call this twice?
    requestAnimationFrame(() => {
      requestAnimationFrame(() => this.configureSort());
    });
  }

  makeTh(header) {
    return html`<th>${header}</th>`;
  }

  makeTr(obj) {
    return html`<tr>
      ${this.properties.map(prop => html`<td>${obj[prop]}</td>`).join('')}
    </tr>`;
  }

  configureSort() {
    const tr = this.shadowRoot?.querySelector('table > thead > tr');
    if (!tr) return;

    tr.innerHTML = ''; // removes existing children

    this.headers.forEach((header, index) => {
      const property = this.properties[index];

      const th = document.createElement('th');

      const button = document.createElement('button');
      button.textContent = header;
      button.addEventListener('click', () => {
        const sameProperty = button === this.sortButton;
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

        //TODO: Is there a more efficient way to trigger a re-render?
        this.data = [...this.data]; // triggers change

        //TODO: Clear the sort indicator when data is replaced.

        if (this.sortButton) this.sortButton.textContent = this.sortHeader;
        const unicode = this.sortAscending ? '\u25B2' : '\u25BC';
        button.textContent = header + unicode;
        this.sortButton = button;
        this.sortHeader = header;
      });

      th.appendChild(button);
      tr.appendChild(th);
    });
  }
}

TablePlus.register();
