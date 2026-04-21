import {css, html, Wrec} from '../wrec';

type LooseObject = Record<string, unknown>;

class SortableTable extends Wrec {
  static properties = {
    data: {type: Array, usedBy: 'sort'},
    descending: {
      type: Boolean,
      dispatch: true,
      usedBy: ['makeHeadings', 'sort']
    },
    headings: {type: String, usedBy: 'makeHeadings'},
    properties: {type: String, value: ''},
    propertyArray: {
      type: Array,
      computed: "this.properties.split(',')",
      usedBy: ['makeHeadings', 'makeRows']
    },
    sortedData: {
      type: Array,
      computed: 'this.sort()',
      usedBy: 'makeRows'
    },
    sortProperty: {
      type: String,
      dispatch: true,
      usedBy: ['makeHeadings', 'sort']
    }
  };
  declare data: LooseObject[];
  declare descending: boolean;
  declare headings: string;
  declare properties: string;
  declare propertyArray: string[];
  declare sortedData: LooseObject[];
  declare sortProperty: string;

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

  makeHeadings() {
    if (this.propertyArray.length === 0) return '';
    return this.headings
      .split(',')
      .map((heading: string, i: number) =>
        this.makeTh(heading, this.propertyArray[i])
      );
  }

  makeRows() {
    return this.sortedData.map((obj: LooseObject) => this.makeTr(obj));
  }

  makeTd(value: unknown) {
    return html`<td>${value}</td>`;
  }

  makeTh(heading: string, property: string) {
    const ariaSort =
      property !== this.sortProperty
        ? undefined
        : this.descending
          ? 'descending'
          : 'ascending';
    const sortIndicator =
      property !== this.sortProperty ? '' : this.descending ? '▼' : '▲';
    return html`
      <th
        ${ariaSort ? `aria-sort="${ariaSort}"` : ''}
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

  makeTr(obj: LooseObject) {
    return html`
      <tr>
        ${this.propertyArray
          .map((propName: string) => this.makeTd(obj[propName]))
          .join('')}
      </tr>
    `;
  }

  sort() {
    const {data, sortProperty, descending} = this;
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

SortableTable.define('sortable-table');
