# pbilint

pbilint is a validation/linting tool for Power BI reports. It inspects `.pbix` files to guarantee that your predefined conditions (e.g. "x" page is hidden, "y" page has "z" visual) are satisfied. Integrating with a Continuous Integration (CI) solution allows you to ensure that destructive modifications are not unintentionally introduced to your Power BI reports.

## How it works

1. The `pbix` NPM package extracts report metadata and structure from a Power BI report file (`.pbix`). *This package is also published as a standalone API that you can use to parse report files in your projects!*
1. The `pbilint` CLI compares the parsed report details (from the previous step) against a JSON configuration defining your expected structure.
1. The comparison results are formatted and rendered in a way that makes identifying and debugging linter errors easy!
