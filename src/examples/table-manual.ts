import {css, createElement, html, Wrec} from '../wrec';

type LooseObject = Record<string, unknown>;

// This component demonstrates a different way of implementing reactivity.
// Rather than relying on the parsing of JavaScript expressions in HTML,
// it implements the propertyChangedCallback method which is unique to wrec.
class TableManual extends Wrec {
  static properties = {
    headings: {type: Array<string>},
    propNames: {type: Array<string>},
    data: {type: Array<object>}
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
      <tbody></tbody>
    </table>
  `;

  sortAscending = true;
  sortHeader: HTMLTableCellElement | null = null;

  connectedCallback() {
    super.connectedCallback();

    requestAnimationFrame(() => {
      this.buildHeadings();
      this.buildRows();
    });
  }

  buildHeadings() {
    const tr = this.shadowRoot?.querySelector('table > thead > tr');
    if (!tr) return; // should never happen

    tr.innerHTML = ''; // removes existing children

    this.headings.forEach((header: string, index: number) => {
      tr.appendChild(this.buildTh(header, index));
    });
  }

  buildRows() {
    const tbody = this.shadowRoot?.querySelector('table > tbody');
    if (!tbody) return; // should never happen

    // prettier-ignore
    tbody.innerHTML = this.data.map(obj => html`
      <tr>
        ${this.propNames
          .map((propName: string) => `<td>${obj[propName]}</td>`)
          .join('')}
       </tr>
    `).join('');
  }

  buildTh(heading: string, index: number) {
    const propName = this.propNames[index];

    const th = createElement(
      'th',
      {
        'aria-label': `sort by ${heading}`,
        role: 'button',
        tabindex: '0'
      },
      html`
        <span>${heading}</span>
        <span class="sort-indicator"></span>
      `
    ) as HTMLTableCellElement;

    th.addEventListener('click', () => {
      const sameProperty = th === this.sortHeader;
      this.sortAscending = sameProperty ? !this.sortAscending : true;

      this.data.sort((a: LooseObject, b: LooseObject) => {
        const aValue = a[propName];
        const bValue = b[propName];
        let compare =
          typeof aValue === 'string'
            ? aValue.localeCompare(bValue as string)
            : typeof aValue === 'number'
            ? aValue - (bValue as number)
            : 0;
        return this.sortAscending ? compare : -compare;
      });

      // Trigger the property set method by assigning a clone.
      this.data = [...this.data];

      // Clear sort indicator from previously selected header.
      if (this.sortHeader) {
        const sortIndicator = this.sortHeader.querySelector('.sort-indicator');
        if (sortIndicator) sortIndicator.textContent = '';
      }

      // Add sort indicator to currently selected header.
      const sortIndicator = th.querySelector('.sort-indicator');
      if (sortIndicator) {
        sortIndicator.textContent = this.sortAscending ? '\u25B2' : '\u25BC';
      }

      this.sortHeader = th;
    });

    return th;
  }

  propertyChangedCallback(propName: string) {
    if (propName === 'headings') {
      this.buildHeadings();
    } else if (propName === 'propNames' || propName === 'data') {
      this.buildRows();
    }
  }
}

TableManual.register();
