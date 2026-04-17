# Scripts and VS Code Extension

Wrec provides three scripts that aid in web component development.
After installing the wrec package in a project,
the scripts can be run using `npx`.

To generate a `.ts` file containing starter code for a new web component,
enter `npx wrec-scaffold {tag-name}`.
This will generate the file `{tag-name}.ts` in the current directory.
The file will define the class `TagName`.

To check a source file that defines a wrec component for errors,
enter `npx wrec-lint {file-path}`.

To add/update `usedBy` properties in the property configuration objects
found in the `static properties =` object,
enter `npx wrec-usedby [file-path]`.
If no file-path is specified, the script runs on
all .js and .ts files in and below the current directory.

The `usedBy` properties are necessary when reactive JavaScript expressions
contain method calls that do not explicitly pass every property they use.
In that case, wrec relies on `usedBy` properties,
to determine when to reevaluate the expressions.

## "wrec" VS Code Extension

The "wrec" VS Code extension provides commands in the Command Palette
that run the three scripts described above.
It is available in the Visual Studio Marketplace at
https://marketplace.visualstudio.com/items?itemName=RMarkVolkmann.wrec.

In order to use this extension, the `package.json` file for the project
that is opened in VS Code must have a dependency on the wrec package and
it must be installed to use these commands.

- wrec: Scaffold New Component

  This prompts for a tag name and runs the `scaffold` script described above.

- wrec: Lint Current File

  This runs the `lint` script on the currently open and focused source file.
  While this is running, "Wrec lint" will be displayed in the status bar.
  When it completes, the status bar will display
  either "Wrec ok" or "Wrec {issue-count"}".
  Lines where issues are found are marked with yellow squigglies
  and hovering over those displays an error message.
  The issues are also appended to the "OUTPUT" panel,
  which you can open manually by selecting View ... Output (cmd-shift-u)
  to review them there.

- wrec: Set usedBy Properties in Current File

  This runs the `usedby` script on the currently open and focused source file.
