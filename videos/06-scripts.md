# Scripts and VS Code Extension

Wrec provides four scripts that aid in the development of wrec components.
After installing the wrec package in a project,
the scripts can be run using the `npx` command.

To generate a `.ts` file containing starter code for a new wrec component,
enter `npx wrec-scaffold {tag-name}`.
This generates the file `tag-name.ts` in the current directory
that defines the class `TagName`.

Let's see this in action.

- Enter `npx wrec-scaffold delete-me`.
- View the file in VS Code.

To check a source file that defines a wrec component for errors,
enter `npx wrec-lint {file-path}`.
A list of the issues this script detects can be found at
the top of the `lint.js` file at this URL:
https://github.com/mvolkmann/wrec/blob/main/scripts/lint.js.

Let's see this in action.

- Add a few errors in ch09/rectangle-area/rectangle-area.ts.
- `cd` to the ch09/rectangle-area directory.
- Enter `npx wrec-lint rectangle-area.ts`
- Explain the error messages.

A TypeScript `declare` statement specifies the type of a property
that is defined somewhere else, not in the normal way.
The properties of a wrec component are described in an object
that is the value of the `static properties` property,
which is that "somewhere else".
Adding `declare` statements is not required, but they
enable type checking in TypeScript-aware editors.

To automatically add `declare` statements in a given TypeScript source file
for each property described in the `static properties` object,
enter `npx wrec-declare {file-path}`.
The `declare` statements are added
immediately after the `static properties` property.
When the `type` of a property is `Object` or `Array`, you should
further customize the `declare` statement to make the type more specific.

Let's see this in action.

- `cd` to the ch09/rectangle-area directory.
- Enter `npx wrec-declare rectangle-area.ts`
- View the file in VS Code.
- Explain the `declare` statements that were added.
- Hover over a reference to `this.width` to see its type.

The configuration objects in the `static properties` object
can contain `usedBy` properties.
Those are necessary when reactive JavaScript expressions
contain method calls that use component properties
without explicitly passing them.
In that case, wrec relies on `usedBy` properties,
to determine when to reevaluate the expressions.

To add or update `usedBy` properties in the property configuration objects,
enter `npx wrec-usedby [file-path]`.
If no file-path is specified, the script runs on
all `.js` and `.ts` files in and below the current directory.

Let's see this in action.

- `cd` to the ch09/rectangle-area directory.
- Enter `npx wrec-usedby rectangle-area.ts`
- View the file in VS Code.
- Explain the `usedBy` properties that were added.

## "wrec" VS Code Extension

The "wrec" VS Code extension provides Command Palette commands
that run the scripts described above.
It is available in the Visual Studio Marketplace at this URL:
https://marketplace.visualstudio.com/items?itemName=RMarkVolkmann.wrec.

To use the provided commands
the `package.json` file for the project that is opened in VS Code
must have a dependency on the wrec package and it must be installed.

The following VS Code commands are provided:

- The "wrec: Scaffold New Component" command prompts for a tag name
  and runs the `scaffold` script described above.

- The "wrec: Lint Current File" command runs the `lint` script
  on the currently open and focused source file.
  While this is running, "Wrec lint" is displayed in the status bar.
  When it completes, the status bar displays
  either "Wrec ok" or "Wrec {issue-count}".
  Lines where issues are found are marked with yellow squigglies
  and hovering over them displays an error message.
  The issues are also displayed in the "PROBLEMS" panel,
  which you can open manually by selecting View ... Problems
  or by pressing cmd-shift-m.

Let's see this in action.

- Add a few errors in ch09/rectangle-area/rectangle-area.ts.
- Open the Command Palette and select the command.
- Hover over the yellow squigglies to see the error messages.
- Open the PROBLEMS panel to see all the error messages.

- The "wrec: Add declare Statements in Current File" command
  runs the `declare` script on the currently open and focused source file,
  which adds `declare` statements.

- The "wrec: Set usedBy Properties in Current File" command
  runs the `usedby` script on the currently open and focused source file.

## Summary

You've learned about the scripts provided by the wrec library
and the VS Code extension that runs them.
In the next video, we explore how wrec supports
sharing state across wrec components.
