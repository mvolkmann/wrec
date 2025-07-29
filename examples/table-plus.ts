import Wrec, {css, createElement, html} from '../wrec.js';

class TablePlus extends Wrec {
  static properties = {
    headers: {type: Array<string>, value: []},
    data: {type: Array, value: []}
  };

  static css = css`
    .sort-indicator {
      color: white;
      display: inline-block;
      line-height: 1rem;
      margin-left: 0.5rem;
      width: 1rem;
    }
    table {
      border-collapse: collapse;
    }
    td,
    th {
      border: 2px solid gray;
      padding: 0.5rem;
    }
    th {
      background-color: cornflowerblue;
      color: white;
      cursor: pointer;
    }
  `;

  static html = html`
    <table>
      <thead>
        <tr></tr>
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
  sortHeader: HTMLTableCellElement | null = null;

  connectedCallback() {
    super.connectedCallback();

    //TODO: Why do I need to call this twice?
    requestAnimationFrame(() => {
      requestAnimationFrame(() => this.configureSort());
    });
  }

  makeTr(obj) {
    return html`<tr>
      ${this.properties.map(prop => html`<td>${obj[prop]}</td>`).join('')}
    </tr>`;
  }

  configureSort() {
    const tr = this.shadowRoot?.querySelector('table > thead > tr');
    if (!tr) return; // should never happen

    tr.innerHTML = ''; // removes existing children

    this.headers.forEach((header, index) => {
      const property = this.properties[index];
      const th = createElement(
        'th',
        {
          'aria-label': `sort by ${header}`,
          role: 'button',
          tabindex: '0'
        },
        html`
          <span>${header}</span>
          <span class="sort-indicator"></span>
        `
      );

      th.addEventListener('click', () => {
        const sameProperty = th === this.sortHeader;
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
        if (this.sortHeader) {
          const sortIndicator =
            this.sortHeader.querySelector('.sort-indicator');
          if (sortIndicator) sortIndicator.textContent = '';
        }

        const sortIndicator = th.querySelector('.sort-indicator');
        if (sortIndicator) {
          sortIndicator.textContent = this.sortAscending ? '\u25B2' : '\u25BC';
        }
        this.sortHeader = th;
      });

      tr.appendChild(th);
    });
  }
}

TablePlus.register();
