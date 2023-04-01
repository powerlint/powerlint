<img src="https://user-images.githubusercontent.com/24438483/228566525-0553987f-51c1-4297-8687-032944a6e084.png" align="right"
     alt="PowerLint logo" height="160" width="160" />

# PowerLint

[![MIT license](https://img.shields.io/github/license/powerlint/powerlint?style=for-the-badge&labelColor=eef1ef&color=6369d1&logo=open-source-initiative&logoColor=1c2321)](LICENSE)
[![Contributors](https://img.shields.io/github/all-contributors/powerlint/powerlint?style=for-the-badge&labelColor=eef1ef&color=6369d1)](#contributors)
[![Linting rules](https://img.shields.io/badge/GitHub-Discussion-black?style=for-the-badge&labelColor=eef1ef&color=6369d1&logo=github&logoColor=1c2321)][discussion]
[![GitHub discussions](https://img.shields.io/badge/Linting%20Rules-4-black?style=for-the-badge&labelColor=eef1ef&color=6369d1)][rules]
[![Testing status](https://img.shields.io/github/actions/workflow/status/powerlint/powerlint/test.yml?label=tests&style=for-the-badge&labelColor=eef1ef&logo=vitest&logoColor=1c2321)][tests]
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/powerlint/powerlint?style=for-the-badge&labelColor=eef1ef&logo=snyk&logoColor=1c2321)](#)

PowerLint is a validation/linting tool for [Power BI][powerbi] reports. It inspects `.pbix` files to guarantee that your predefined conditions (e.g. "x" page is hidden, "y" page has "z" visual) are satisfied. Integrating with a Continuous Integration (CI) solution allows you to ensure that destructive modifications are not unintentionally introduced to your Power BI reports.

> *PowerLint is not endorsed by nor affiliated with Microsoft or Power BI in any shape or form. PowerLint is a community project to provide better tooling around Power BI!*

## Example linter output

> The screenshot below demonstrates how report-wide errors & warnings appear first and then page-specific errors are grouped by page name and displayed last.

![PowerLint CLI screenshot](https://user-images.githubusercontent.com/24438483/229314313-f439f497-8a3e-4b01-ad99-db2d69f9f864.png)

## How it works

1. The `pbix` NPM package extracts report metadata and structure from a Power BI report file. *This package is also published as a standalone API that you can use to parse report files in your projects!*
1. The `powerlint` CLI compares the parsed report details (from the previous step) against a JSON configuration defining your expected structure.
1. The comparison results are formatted and rendered in a way that makes identifying and debugging linter errors easy!

## Monorepo contents

This monorepo is a [turborepo][turborepo] using [pnpm][pnpm] as a package manager, comprised of the following packages:

### `pbix`

The [`pbix` package](packages/pbix) is an API library for parsing and extracting metadata from Power BI report files (with a `.pbix` file extension).

### `powerlint`

The [`powerlint` package](packages/powerlints) is a CLI for linting and validating Power BI reports against predefined conditions. Internally, this CLI uses the [`pbix`](#pbix) library to parse Power BI report files.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.carr.sh"><img src="https://avatars.githubusercontent.com/u/24438483?v=4?s=100" width="100px;" alt="Luke Carr"/><br /><sub><b>Luke Carr</b></sub></a><br /><a href="#code-lukecarr" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Versioning

PowerLint uses [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

All you really need to know is that the major component of the version (`x` in `x.y.z`) is only incremented when breaking changes are introduced that create an incompatibility with prior versions.

[tests]: https://github.com/powerlint/powerlint/actions/workflows/test.yml
[discussion]: https://github.com/powerlint/powerlint/discussions
[rules]: RULES.md
[powerbi]: https://powerbi.microsoft.com
[turborepo]: https://turbo.build/repo
[pnpm]: https://pnpm.io
