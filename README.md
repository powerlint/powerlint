<img src="https://user-images.githubusercontent.com/24438483/228566525-0553987f-51c1-4297-8687-032944a6e084.png" align="right"
     alt="PowerLint logo" height="160" width="160" />

# PowerLint

[![MIT license](https://img.shields.io/github/license/powerlint/powerlint?style=for-the-badge&labelColor=eef1ef&color=6369d1&logo=open-source-initiative&logoColor=1c2321)](LICENSE)
[![Contributors](https://img.shields.io/github/all-contributors/powerlint/powerlint?style=for-the-badge&labelColor=eef1ef&color=6369d1)](#contributors)
[![GitHub discussions](https://img.shields.io/badge/GitHub-Discussion-black?style=for-the-badge&labelColor=eef1ef&color=6369d1&logo=github&logoColor=1c2321)][discussion]
[![Testing status](https://img.shields.io/github/actions/workflow/status/powerlint/powerlint/test.yml?label=tests&style=for-the-badge&labelColor=eef1ef&logo=vitest&logoColor=1c2321)][tests]
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/powerlint/powerlint?style=for-the-badge&labelColor=eef1ef&logo=snyk&logoColor=1c2321)](#)

PowerLint is a validation/linting tool for [Power BI][powerbi] reports. It inspects `.pbix` files to guarantee that your predefined conditions (e.g. "x" page is hidden, "y" page has "z" visual) are satisfied. Integrating with a Continuous Integration (CI) solution allows you to ensure that destructive modifications are not unintentionally introduced to your Power BI reports.

> *PowerLint is not endorsed by nor affiliated with Microsoft or Power BI in any shape or form. PowerLint is a community project to provide better tooling around Power BI!*

![PowerLint example screenshot](https://user-images.githubusercontent.com/24438483/229304395-c649252b-cc14-4b24-9259-a128933f4432.png)

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

[tests]: https://github.com/powerlint/powerlint/actions/workflows/test.yml
[discussion]: https://github.com/orgs/powerlint/discussions
[powerbi]: https://powerbi.microsoft.com
[turborepo]: https://turbo.build/repo
[pnpm]: https://pnpm.io
