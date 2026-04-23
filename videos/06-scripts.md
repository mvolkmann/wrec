# Scripts and VS Code Extension

Wrec provides four scripts that aid in web component development.
After installing the wrec package in a project,
the scripts can be run using `npx`.

To generate a `.ts` file containing starter code for a new wrec component,
enter `npx wrec-scaffold {tag-name}`.
This will generate the file `tag-name.ts` in the current directory.
The file will define the class `TagName`.

To check a source file that defines a wrec component for errors,
enter `npx wrec-lint {file-path}`.
For a list of the issues this script can detect,
see the comment at the top of
https://github.com/mvolkmann/wrec/blob/main/scripts/lint.js.

A TypeScript `declare` statement specifies the type of a property
that is defined somewhere else, not in the normal way.
The properties of a wrec component are described in `static properties`,
which is that "somewhere else".
Adding `declare` statements is not required, but they
enable type checking in TypeScript-aware editors.

To automatically add `declare` statements in a given TypeScript source file
for each property described in the `static properties` object,
enter `npx wrec-declare {file-path}`.

When the `type` of a property is `Object` or `Array`, you should
further customize the `declare` statement type to make it more specific.

The configure objects in the `static properties` object
can contain `usedBy` properties.
Those are necessary when reactive JavaScript expressions
contain method calls that use component properties
without explicitly passing them.
In that case, wrec relies on `usedBy` properties,
to determine when to reevaluate the expressions.

To add/update `usedBy` properties in the property configuration objects,
enter `npx wrec-usedby [file-path]`.
If no file-path is specified, the script runs on
all .js and .ts files in and below the current directory.

## "wrec" VS Code Extension

The "wrec" VS Code extension provides commands in the Command Palette
that run the scripts described above.
It is available in the Visual Studio Marketplace at
https://marketplace.visualstudio.com/items?itemName=RMarkVolkmann.wrec.

To use the provided commands
the `package.json` file for the project that is opened in VS Code
must have a dependency on the wrec package and it must be installed.

The commands are:

- wrec: Scaffold New Component

  This prompts for a tag name and runs the `scaffold` script described above.

- wrec: Lint Current File

  This runs the `lint` script on the currently open and focused source file.
  While this is running, "Wrec lint" is displayed in the status bar.
  When it completes, the status bar displays
  either "Wrec ok" or "Wrec {issue-count}".
  Lines where issues are found are marked with yellow squigglies
  and hovering over them displays an error message.
  The issues are also displayed in the "PROBLEMS" panel,
  which you can open manually by selecting View ... Problems (cmd-shift-m)
  to review them.

- wrec: Add declare Statements in Current File

  This runs the `declare` script on the currently open and focused source file.

- wrec: Set usedBy Properties in Current File

  This runs the `usedby` script on the currently open and focused source file.
