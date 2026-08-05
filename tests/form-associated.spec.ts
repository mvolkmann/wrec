import { expect, test } from "@playwright/test";

// Verifies that ordinary form-associated values submit and reset correctly.
test("submits default and current values and restores defaults on reset", async ({ page }) => {
  // Builds and exercises a basic form-associated fixture in the browser.
  await page.goto("index.html");

  // Creates a form-associated component and returns its submission and reset state.
  const result = await page.evaluate(async () => {
    const { html, Wrec } = await import("../wrec.ts");

    class FormFixture extends Wrec {
      static formAssociated = true;

      static properties = {
        value: { type: String, value: "initial" },
      };

      static html = html`<input value:input="this.value" />`;
    }

    FormFixture.define("form-fixture-test");

    const form = document.createElement("form");
    const element = document.createElement("form-fixture-test") as FormFixture;
    element.setAttribute("name", "answer");
    form.appendChild(element);
    document.body.replaceChildren(form);
    await customElements.whenDefined("form-fixture-test");
    await new Promise(requestAnimationFrame);

    const initialEntries = [...new FormData(form).entries()];
    element.value = "changed";
    const changedEntries = [...new FormData(form).entries()];
    form.reset();

    return {
      changedEntries,
      initialEntries,
      resetValue: element.value,
    };
  });

  expect(result).toEqual({
    changedEntries: [["answer", "changed"]],
    initialEntries: [["answer", "initial"]],
    resetValue: "initial",
  });
});

// Verifies that resetting does not assign directly to computed properties.
test("does not restore computed properties directly on reset", async ({ page }) => {
  const errors: string[] = [];
  // Records uncaught errors raised by form reset callbacks.
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("index.html");

  // Creates and resets a fixture that has a computed property.
  const result = await page.evaluate(async () => {
    const { html, Wrec } = await import("../wrec.ts");

    class ComputedFormFixture extends Wrec {
      static formAssociated = true;

      static properties = {
        doubled: { type: Number, computed: "this.value * 2" },
        value: { type: Number, value: 2 },
      };

      static html = html`<span>this.doubled</span>`;
    }

    ComputedFormFixture.define("computed-form-fixture-test");

    const form = document.createElement("form");
    const element = document.createElement("computed-form-fixture-test") as ComputedFormFixture;
    element.setAttribute("name", "answer");
    form.appendChild(element);
    document.body.replaceChildren(form);
    await customElements.whenDefined("computed-form-fixture-test");
    await new Promise(requestAnimationFrame);

    element.value = 5;
    form.reset();
    await new Promise(requestAnimationFrame);

    return {
      doubled: element.doubled,
      value: element.value,
    };
  });

  expect(errors).toEqual([]);
  expect(result).toEqual({ doubled: 4, value: 2 });
});

// Verifies that parent property bindings save their resolved initial values.
test("restores the resolved initial value of a parent binding", async ({ page }) => {
  const errors: string[] = [];
  // Records uncaught errors raised by form reset callbacks.
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("index.html");

  // Creates a parent-bound form control and returns its state after reset.
  const result = await page.evaluate(async () => {
    const { html, Wrec } = await import("../wrec.ts");

    class BoundNumberFixture extends Wrec {
      static formAssociated = true;

      static properties = {
        value: { type: Number },
      };

      static html = html`<input type="range" value:input="this.value" />`;
    }

    class ParentBindingFixture extends Wrec {
      static properties = {
        size: { type: Number, value: 18 },
      };

      static html = html`
        <form>
          <bound-number-fixture-test name="size" value="this.size"></bound-number-fixture-test>
        </form>
      `;
    }

    BoundNumberFixture.define("bound-number-fixture-test");
    ParentBindingFixture.define("parent-binding-fixture-test");

    const parent = document.createElement("parent-binding-fixture-test") as ParentBindingFixture;
    document.body.replaceChildren(parent);
    await customElements.whenDefined("parent-binding-fixture-test");
    await new Promise(requestAnimationFrame);

    const form = parent.shadowRoot!.querySelector("form")!;
    const child = form.querySelector("bound-number-fixture-test") as BoundNumberFixture;
    child.value = 32;
    form.reset();
    await new Promise(requestAnimationFrame);

    return {
      childValue: child.value,
      parentValue: parent.size,
    };
  });

  expect(errors).toEqual([]);
  expect(result).toEqual({ childValue: 18, parentValue: 18 });
});
