// This differs from sortable-table.ts in that it
// uses pure functions and the context property.
import {css, html, Wrec} from '../wrec';

type LooseObject = Record<string, unknown>;

// These are pure functions that are listed in
// the context property of the SortedTable class.

function makeTd(value: unknown) {
  return html`<td>${value}</td>`;
}

function makeTr(obj: LooseObject, propertyArray: string[]) {
  return html`
    <tr>
      ${propertyArray.map(propName => makeTd(obj[propName]))}
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

class SortableTable extends Wrec {
  static context = {makeTd, makeTr, makeTrs, sort, sortIndicator};

  static properties = {
    data: {type: Array<LooseObject>},
    descending: {type: Boolean, dispatch: true},
    headings: {type: String},
    properties: {type: String, value: ''},
    propertyArray: {
      type: Array<string>,
      computed: "this.properties.split(',')"
    },
    sortedData: {
      computed: 'sort(this.data, this.sortProperty, this.descending)',
      type: Array<LooseObject>
    },
    sortProperty: {type: String, dispatch: true},
    ths: {
      computed: 'this.makeThs()',
      type: String,
      uses: 'headings, propertyArray, sortProperty, descending'
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
      cursor: pointer;
      > span {
        pointer-events: none;
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
        data-property="${property}"
        role="button"
        tabindex="0"
        title="${`sort by ${heading}`}"
        onClick="this.updateSort('${property}')"
      >
        <span>${heading}</span>
        <span class="sort-indicator">
          sortIndicator(this.sortProperty, this.descending, '${property}')
        </span>
      </th>
    `;
  }

  makeThs() {
    console.log(
      'sortable-table.ts makeThs: this.propertyArray =',
      this.propertyArray
    );
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

customElements.define('sortable-table', SortableTable);
