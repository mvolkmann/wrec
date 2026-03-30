// This differs from sortable-table.ts in that it
// uses pure functions and the context property.
import {css, html, Wrec} from '../wrec';

type LooseObject = Record<string, unknown>;

// These are pure functions that are listed in
// the context property of the SortedTable class.

function getAriaSort(
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

function makeTd(value: unknown) {
  return html`<td>${value}</td>`;
}

function makeTr(obj: LooseObject, propertyArray: string[]) {
  return html`
    <tr>
      ${propertyArray.map(propName => makeTd(obj[propName])).join('')}
    </tr>
  `;
}

function makeTrs(sortedData: LooseObject[], propertyArray: string[]) {
  return sortedData.map(obj => makeTr(obj, propertyArray));
}

function sort(data: LooseObject[], sortProperty: string, descending: boolean) {
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

function sortIndicator(
  sortProperty: string,
  descending: boolean,
  property: string
) {
  if (property !== sortProperty) return '';
  return descending ? '▼' : '▲';
}

class SortableTable2 extends Wrec {
  static context = {getAriaSort, makeTd, makeTr, makeTrs, sort, sortIndicator};

  static properties = {
    data: {type: Array<LooseObject>},
    descending: {type: Boolean, dispatch: true, usedBy: 'makeThs'},
    headings: {type: String, usedBy: 'makeThs'},
    properties: {type: String, value: ''},
    propertyArray: {
      type: Array<string>,
      computed: "this.properties.split(',')",
      usedBy: 'makeThs'
    },
    sortedData: {
      computed: 'sort(this.data, this.sortProperty, this.descending)',
      type: Array<LooseObject>
    },
    sortProperty: {type: String, dispatch: true, usedBy: 'makeThs'},
    ths: {
      computed: 'this.makeThs()',
      type: String
    }
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
          this.ths
        </tr>
      </thead>
      <tbody>
        makeTrs(this.sortedData, this.propertyArray)
      </tbody>
    </table>
    <slot name="footnote"></slot>
  `;

  makeTh(heading: string, property: string) {
    return html`
      <th
        aria-sort="getAriaSort('${property}', this.sortProperty, this.descending)"
        data-property="${property}"
        title="${`sort by ${heading}`}"
      >
        <button type="button" onClick="this.updateSort('${property}')">
          <span>${heading}</span>
          <span class="sort-indicator">
            sortIndicator(this.sortProperty, this.descending, '${property}')
          </span>
        </button>
      </th>
    `;
  }

  makeThs() {
    if (this.propertyArray.length === 0) return '';
    return this.headings
      .split(',')
      .map((heading: string, i: number) =>
        this.makeTh(heading, this.propertyArray[i])
      )
      .join('');
  }

  updateSort(property: string) {
    const same = property === this.sortProperty;
    this.batchSet({
      sortProperty: property,
      descending: same ? !this.descending : false
    });
  }
}

SortableTable2.define('sortable-table2');
