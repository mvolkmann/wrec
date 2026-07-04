import { expect, test } from "@playwright/test";

test("submits default and current values and restores defaults on reset", async ({ page }) => {
  await page.goto("index.html");

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
