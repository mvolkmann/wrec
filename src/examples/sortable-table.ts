import {css, html, Wrec} from '../wrec';

type LooseObject = Record<string, unknown>;

class SortableTable extends Wrec {
  static properties = {
    data: {type: Array<LooseObject>},
    descending: {type: Boolean, dispatch: true, usedBy: ['makeHeadings']},
    headings: {type: String, usedBy: ['makeHeadings']},
    properties: {type: String, value: ''},
    propertyArray: {
      type: Array<string>,
      computed: "this.properties.split(',')",
      usedBy: ['makeHeadings', 'makeRows']
    },
    sortedData: {
      computed: 'this.sort(this.data, this.sortProperty, this.descending)',
      type: Array<LooseObject>,
      usedBy: ['makeRows']
    },
    sortProperty: {type: String, dispatch: true, usedBy: ['makeHeadings']}
  };

  static css = css`
    :host {
      display: inline-block;
    }
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

      > button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;

        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        font: inherit;
        padding: 0;
        width: 100%;
      }
    }
  `;

  static html = html`
    <slot></slot>
    <table>
      <thead>
        <tr>
          this.makeHeadings()
        </tr>
      </thead>
      <tbody>
        this.makeRows()
      </tbody>
    </table>
    <slot name="footnote"></slot>
  `;

  getAriaSort(
    property: string,
    sortProperty: string,
    descending: boolean
  ): string | undefined {
    return property === sortProperty
      ? descending
        ? 'descending'
        : 'ascending'
      : undefined;
  }

  makeHeadings() {
    if (this.propertyArray.length === 0) return '';
    return this.headings
      .split(',')
      .map((heading: string, i: number) =>
        this.makeTh(heading, this.propertyArray[i])
      );
  }

  makeRows() {
    const {propertyArray, sortedData} = this;
    return sortedData.map((obj: LooseObject) =>
      this.makeTr(obj, propertyArray)
    );
  }

  makeTd(value: unknown) {
    return html`<td>${value}</td>`;
  }

  makeTh(heading: string, property: string) {
    const sortIndicator =
      property !== this.sortProperty ? '' : this.descending ? '▼' : '▲';
    return html`
      <th
        aria-sort="this.getAriaSort('${property}', this.sortProperty, this.descending)"
        data-property="${property}"
        title="${`sort by ${heading}`}"
      >
        <button type="button" onClick="this.updateSort('${property}')">
          <span>${heading}</span>
          <span class="sort-indicator">${sortIndicator}</span>
        </button>
      </th>
    `;
  }

  makeTr(obj: LooseObject, propertyArray: string[]) {
    return html`
      <tr>
        ${propertyArray.map(propName => this.makeTd(obj[propName])).join('')}
      </tr>
    `;
  }

  sort(data: LooseObject[], sortProperty: string, descending: boolean) {
    if (!sortProperty) return data;

    return data.toSorted((a: LooseObject, b: LooseObject) => {
      const aValue = a[sortProperty];
      const bValue = b[sortProperty];
      const compare =
        typeof aValue === 'string'
          ? aValue.localeCompare(bValue as string)
          : typeof aValue === 'number'
            ? aValue - (bValue as number)
            : 0;
      return descending ? -compare : compare;
    });
  }

  updateSort(property: string) {
    const same = property === this.sortProperty;
    this.batchSet({
      sortProperty: property,
      descending: same ? !this.descending : false
    });
  }
}

customElements.define('sortable-table', SortableTable);
