import { css, html, Wrec } from "wrec";

type LooseObject = Record<string, unknown>;

class SortableTable extends Wrec {
  static properties = {
    data: { type: Array<LooseObject> },
    descending: { type: Boolean, dispatch: true },
    headings: { type: String },
    properties: { type: String, value: "" },
    propertyArray: {
      type: Array<string>,
      computed: "this.properties.split(',')",
    },
    sortedData: {
      computed: "this.sort(this.data, this.sortProperty, this.descending)",
      type: Array<LooseObject>,
    },
    sortProperty: { type: String, dispatch: true },
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
          this.makeHeadings(this.headings, this.propertyArray)
        </tr>
      </thead>
      <tbody>
        this.makeRows(this.sortedData, this.propertyArray)
      </tbody>
    </table>
    <slot name="footnote"></slot>
  `;

  makeHeadings(headings: string, propertyArray: string[]) {
    if (propertyArray.length === 0) return "";
    return headings
      .split(",")
      .map((heading, i) => this.makeTh(heading, propertyArray[i]));
  }

  makeRows(sortedData: LooseObject[], propertyArray: string[]) {
    return sortedData.map((obj) => this.makeTr(obj, propertyArray));
  }

  makeTd(value: unknown) {
    return html`<td>${value}</td>`;
  }

  makeTh(heading: string, property: string) {
    return html`
      <th
        data-property="${property}"
        role="button"
        title="${`sort by ${heading}`}"
        onClick="this.updateSort('${property}')"
      >
        <span>${heading}</span>
        <span class="sort-indicator">
          this.sortIndicator(this.sortProperty, this.descending, '${property}')
        </span>
      </th>
    `;
  }

  makeTr(obj: LooseObject, propertyArray: string[]) {
    return html`
      <tr>
        ${propertyArray.map((propName) => this.makeTd(obj[propName]))}
      </tr>
    `;
  }

  sort(data: LooseObject[], sortProperty: string, descending: boolean) {
    if (!sortProperty) return data;

    return data.toSorted((a: LooseObject, b: LooseObject) => {
      const aValue = a[sortProperty];
      const bValue = b[sortProperty];
      const compare =
        typeof aValue === "string"
          ? aValue.localeCompare(bValue as string)
          : typeof aValue === "number"
            ? aValue - (bValue as number)
            : 0;
      return descending ? -compare : compare;
    });
  }

  sortIndicator(sortProperty: string, descending: boolean, property: string) {
    if (property !== sortProperty) return "";
    return descending ? "▼" : "▲";
  }

  updateSort(property: string) {
    const same = property === this.sortProperty;
    this.batchSet({
      sortProperty: property,
      descending: same ? !this.descending : false,
    });
  }
}

customElements.define("sortable-table", SortableTable);
