import Wrec, {css, html} from '../wrec.js';

class TablePlus extends Wrec {
  static properties = {
    headers: {type: Array<string>, value: []},
    data: {type: Array, value: []}
  };

  static css = css`
    .sort-indicator {
      color: white;
      display: inline-block;
      width: 1rem;
    }
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
  sortSpan: HTMLSpanElement | null = null;
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
      const span = document.createElement('span');
      span.className = 'sort-indicator';

      const button = document.createElement('button');
      button.textContent = header;
      button.addEventListener('click', () => {
        const sameProperty = span === this.sortSpan;
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

        // Clear sort indicator from previously selected header.
        if (this.sortSpan) this.sortSpan.textContent = '';

        span.textContent = this.sortAscending ? '\u25B2' : '\u25BC';
        this.sortHeader = header;
        this.sortSpan = span;
      });

      const th = document.createElement('th');
      th.appendChild(button);
      th.appendChild(span);
      tr.appendChild(th);
    });
  }
}

TablePlus.register();
