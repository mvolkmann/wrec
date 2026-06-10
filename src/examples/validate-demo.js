import { css, html, Wrec } from "../wrec";

function nonNegative(value) {
  if (value < 0) {
    return "min must be a non-negative number.";
  }
}

function range(low, high) {
  return function (value) {
    if (value < low || value > high) {
      return `Value must be between ${low} and ${high}.`;
    }
  };
}

class ValidateDemo extends Wrec {
  static properties = {
    min: {
      type: Number,
      validate: nonNegative,
      value: 0,
    },
    max: {
      type: Number,
      validate: range(0, 5),
      value: 0,
    },
    message: {
      type: String,
      value: "",
    },
  };

  static css = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
        
      & > div {
        label {
          display: inline-block;
          text-align: end;
          width: 2rem;
        }
      }

      & > p {
        color: red;
        margin: 0;
        white-space: pre-line;
      }
    }
  `;

  static html = html`
    <form method="post" action="https://httpbin.org/post">
      <div>
        <label for="min">Min</label>
        <input id="min" type="number" value="this.min" />
      </div>
      <div>
        <label for="max">Max</label>
        <input id="max" type="number" value="this.max" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
      <p>this.message</p>
    </form>
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("validation", this.handleValidation);
  }

  handleValidation(event) {
    this.message = event.detail.message;
  }

  validate(props) {
    const errors = [];
    if (props.min > props.max) {
      errors.push("min must be less than or equal to max.");
    }
    return errors;
  }
}

ValidateDemo.define("validate-demo");
