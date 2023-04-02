<!-- markdownlint-disable -->
<img src="https://user-images.githubusercontent.com/24438483/228566525-0553987f-51c1-4297-8687-032944a6e084.png" align="right"
     alt="PowerLint logo" height="160" width="160" />
<!-- markdownlint-enable -->

# PowerLint

[![MIT license][license-shield]][license]
[![Contributors][contributors-shield]](#contributors)
[![GitHub discussions][discussion-shield]][discussion]
[![Linting rules][rules-shield]][rules]
[![Testing status][testing-shield]][tests]
[![Vulnerabilities][vulnerabilities-shield]](#)
[![Maintainability][maintainability-shield]][code-climate]

PowerLint is a validation/linting tool for [Power BI][powerbi] reports. It
inspects `.pbix` files to guarantee that they adhere to a
[set of standardrules][rules]. Integrating with a Continuous Integration (CI)
solution allows you to ensure that destructive modifications are not
unintentionally introduced to your Power BI reports.

> *PowerLint is not endorsed by nor affiliated with Microsoft or Power BI in any
shape or form. PowerLint is a community project to provide better tooling around
Power BI!*

## Example linter output

> The screenshot below demonstrates how report-wide errors & warnings appear
first and then page-specific errors are grouped by page name and displayed last.

![PowerLint CLI screenshot][screenshot]

## How it works

1. The `@powerlint/pbix` NPM package extracts report metadata and structure from a Power BI
report file. *This package is also published as a standalone API that you can use
to parse report files in your projects!*
1. The `powerlint` CLI compares the parsed report details (from the previous step)
against a set of standard rules that define conventional Power BI report behavior.
1. The comparison results are formatted and rendered in a way that makes
identifying and debugging linter errors easy!

## Monorepo contents

This monorepo is a [turborepo][turborepo] using [pnpm][pnpm] as a package manager,
comprised of the following packages:

### `powerlint`

The [`powerlint` package][powerlint] is a CLI for linting and validating Power BI
reports against a set of rules. Internally, this CLI uses the
[`@powerlint/pbix`](#powerlintpbix) library to parse Power BI report files.

### `@powerlint/pbix`

The [`@powerlint/pbix` package][pbix] is an API library for parsing and
extracting metadata from Power BI report files (with a `.pbix` file extension).

### `@powerlint/types`

The [`@powerlint/types` package][types] contains TypeScript definitions shared
across all packages in this monorepo.

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

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Versioning

PowerLint uses [Semantic Versioning 2.0.0][semver].

All you really need to know is that the major component of the version (`x` in
`x.y.z`) is only incremented when breaking changes are introduced that create an
incompatibility with prior versions.

<!-- Link references -->

[license]: LICENSE
[discussion]: https://github.com/powerlint/powerlint/discussions
[rules]: RULES.md
[tests]: https://github.com/powerlint/powerlint/actions/workflows/test.yml
[code-climate]: https://codeclimate.com/github/powerlint/powerlint
[powerbi]: https://powerbi.microsoft.com
[turborepo]: https://turbo.build/repo
[pnpm]: https://pnpm.io
[pbix]: packages/pbix
[powerlint]: packages/powerlint
[types]: packages/types
[semver]: https://semver.org/spec/v2.0.0.html

<!-- Image references -->

[license-shield]: https://img.shields.io/github/license/powerlint/powerlint?style=for-the-badge&labelColor=eef1ef&color=6369d1&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuNC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIzIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBkPSJNMTI4IDY0YzAtMzUuMyAyOC43LTY0IDY0LTY0SDM1MlYxMjhjMCAxNy43IDE0LjMgMzIgMzIgMzJINTEyVjQ0OGMwIDM1LjMtMjguNyA2NC02NCA2NEgyMjEuM2MxLjgtNS4xIDIuNy0xMC41IDIuNy0xNlY0MTZjMS4zLS41IDIuNS0xIDMuOC0xLjVjNi44LTMgMTQuMy03LjggMjAuNi0xNS41YzYuNC03LjkgMTAuMS0xNy4yIDExLjQtMjcuMWMuNS0zLjYgLjgtNS43IDEuMS03LjFjMS4xLS45IDIuOC0yLjMgNS42LTQuNWMxOS45LTE1LjQgMjcuMS00Mi4yIDE3LjUtNjUuNWMtMS40LTMuMy0yLjEtNS40LTIuNi02LjdjLjUtMS40IDEuMi0zLjQgMi42LTYuN2M5LjUtMjMuMyAyLjQtNTAuMS0xNy41LTY1LjVjLTIuOC0yLjItNC41LTMuNi01LjYtNC41Yy0uMy0xLjQtLjYtMy42LTEuMS03LjFjLTMuNC0yNC45LTIzLTQ0LjYtNDcuOS00Ny45Yy0zLjYtLjUtNS43LS44LTcuMS0xLjFjLS45LTEuMS0yLjMtMi44LTQuNS01LjZjLTE1LjQtMTkuOS00Mi4yLTI3LjEtNjUuNS0xNy41Yy0yLjYgMS4xLTUuMSAyLjMtNi42IDNsLS4xIC4xVjY0em0zODQgNjRIMzg0VjBMNTEyIDEyOHpNMTA5LjIgMTYxLjZMMTI1IDE2OGMxLjkgLjggNC4xIC44IDYuMSAwbDE1LjgtNi41YzEwLTQuMSAyMS41LTEgMjguMSA3LjVsMTAuNSAxMy41YzEuMyAxLjcgMy4yIDIuNyA1LjIgM2wxNi45IDIuM2MxMC43IDEuNSAxOS4xIDkuOSAyMC41IDIwLjVsMi4zIDE2LjljLjMgMi4xIDEuNCA0IDMgNS4ybDEzLjUgMTAuNWM4LjUgNi42IDExLjYgMTguMSA3LjUgMjguMUwyNDggMjg1Yy0uOCAxLjktLjggNC4xIDAgNi4xbDYuNSAxNS44YzQuMSAxMCAxIDIxLjUtNy41IDI4LjFsLTEzLjUgMTAuNWMtMS43IDEuMy0yLjcgMy4yLTMgNS4ybC0yLjMgMTYuOWMtMS41IDEwLjctOS45IDE5LjEtMjAuNSAyMC42TDE5MiAzOTAuMlY0OTZjMCA1LjktMy4yIDExLjMtOC41IDE0LjFzLTExLjUgMi41LTE2LjQtLjhMMTI4IDQ4My4yIDg4LjkgNTA5LjNjLTQuOSAzLjMtMTEuMiAzLjYtMTYuNCAuOHMtOC41LTguMi04LjUtMTQuMVYzOTAuMmwtMTUuNS0yLjFjLTEwLjctMS41LTE5LjEtOS45LTIwLjUtMjAuNmwtMi4zLTE2LjljLS4zLTIuMS0xLjQtNC0zLTUuMkw5LjEgMzM0LjljLTguNS02LjYtMTEuNi0xOC4xLTcuNS0yOC4xTDggMjkxYy44LTEuOSAuOC00LjEgMC02LjFMMS42IDI2OS4yYy00LjEtMTAtMS0yMS41IDcuNS0yOC4xbDEzLjUtMTAuNWMxLjctMS4zIDIuNy0zLjIgMy01LjJsMi4zLTE2LjljMS41LTEwLjcgOS45LTE5LjEgMjAuNS0yMC41bDE2LjktMi4zYzIuMS0uMyA0LTEuNCA1LjItM2wxMC41LTEzLjVjNi42LTguNSAxOC4xLTExLjYgMjguMS03LjV6TTE5MiAyODhBNjQgNjQgMCAxIDAgNjQgMjg4YTY0IDY0IDAgMSAwIDEyOCAweiIgZmlsbD0iIzFjMjMyMSIvPjwvc3ZnPg==
[contributors-shield]: https://img.shields.io/github/all-contributors/powerlint/powerlint?style=for-the-badge&labelColor=eef1ef&color=6369d1&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNTEyIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuNC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIzIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBkPSJNMTQ0IDE2MEE4MCA4MCAwIDEgMCAxNDQgMGE4MCA4MCAwIDEgMCAwIDE2MHptMzY4IDBBODAgODAgMCAxIDAgNTEyIDBhODAgODAgMCAxIDAgMCAxNjB6TTAgMjk4LjdDMCAzMTAuNCA5LjYgMzIwIDIxLjMgMzIwSDIzNC43Yy4yIDAgLjQgMCAuNyAwYy0yNi42LTIzLjUtNDMuMy01Ny44LTQzLjMtOTZjMC03LjYgLjctMTUgMS45LTIyLjNjLTEzLjYtNi4zLTI4LjctOS43LTQ0LjYtOS43SDEwNi43QzQ3LjggMTkyIDAgMjM5LjggMCAyOTguN3pNNDA1LjMgMzIwSDYxOC43YzExLjggMCAyMS4zLTkuNiAyMS4zLTIxLjNDNjQwIDIzOS44IDU5Mi4yIDE5MiA1MzMuMyAxOTJINDkwLjdjLTE1LjkgMC0zMSAzLjUtNDQuNiA5LjdjMS4zIDcuMiAxLjkgMTQuNyAxLjkgMjIuM2MwIDM4LjItMTYuOCA3Mi41LTQzLjMgOTZjLjIgMCAuNCAwIC43IDB6TTMyMCAxNzZhNDggNDggMCAxIDEgMCA5NiA0OCA0OCAwIDEgMSAwLTk2em0wIDE0NGE5NiA5NiAwIDEgMCAwLTE5MiA5NiA5NiAwIDEgMCAwIDE5MnptLTU4LjcgODBIMzc4LjdjMzkuOCAwIDczLjIgMjcuMiA4Mi42IDY0SDE3OC43YzkuNS0zNi44IDQyLjktNjQgODIuNi02NHptMC00OEMxODcuNyAzNTIgMTI4IDQxMS43IDEyOCA0ODUuM2MwIDE0LjcgMTEuOSAyNi43IDI2LjcgMjYuN0g0ODUuM2MxNC43IDAgMjYuNy0xMS45IDI2LjctMjYuN0M1MTIgNDExLjcgNDUyLjMgMzUyIDM3OC43IDM1MkgyNjEuM3oiIGZpbGw9IiMxYzIzMjEiLz48L3N2Zz4=
[discussion-shield]: https://img.shields.io/badge/GitHub-Discussion-black?style=for-the-badge&labelColor=eef1ef&color=6369d1&logo=github&logoColor=1c2321
[rules-shield]: https://img.shields.io/badge/Linting%20Rules-4-black?style=for-the-badge&labelColor=eef1ef&color=6369d1&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuNC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIzIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBkPSJNNjQgMEMyOC43IDAgMCAyOC43IDAgNjRWNDQ4YzAgMzUuMyAyOC43IDY0IDY0IDY0SDM4NGMzNS4zIDAgNjQtMjguNyA2NC02NFY2NGMwLTM1LjMtMjguNy02NC02NC02NEg2NHptMCAxMTJjMC04LjggNy4yLTE2IDE2LTE2aDMyYzguOCAwIDE2IDcuMiAxNiAxNnYzMmMwIDguOC03LjIgMTYtMTYgMTZIODBjLTguOCAwLTE2LTcuMi0xNi0xNlYxMTJ6bTAgMjU2YzAtOC44IDcuMi0xNiAxNi0xNmgzMmM4LjggMCAxNiA3LjIgMTYgMTZ2MzJjMCA4LjgtNy4yIDE2LTE2IDE2SDgwYy04LjggMC0xNi03LjItMTYtMTZWMzY4em0xNDQgMEgzNjhjOC44IDAgMTYgNy4yIDE2IDE2cy03LjIgMTYtMTYgMTZIMjA4Yy04LjggMC0xNi03LjItMTYtMTZzNy4yLTE2IDE2LTE2ek0xOTIgMTI4YzAtOC44IDcuMi0xNiAxNi0xNkgzNjhjOC44IDAgMTYgNy4yIDE2IDE2cy03LjIgMTYtMTYgMTZIMjA4Yy04LjggMC0xNi03LjItMTYtMTZ6bTE2IDExMkgzNjhjOC44IDAgMTYgNy4yIDE2IDE2cy03LjIgMTYtMTYgMTZIMjA4Yy04LjggMC0xNi03LjItMTYtMTZzNy4yLTE2IDE2LTE2em0tNTIuNy0yNy4zYzYuMiA2LjIgNi4yIDE2LjQgMCAyMi42bC00OCA0OGMtNi4yIDYuMi0xNi40IDYuMi0yMi42IDBsLTI0LTI0Yy02LjItNi4yLTYuMi0xNi40IDAtMjIuNnMxNi40LTYuMiAyMi42IDBMOTYgMjQ5LjRsMzYuNy0zNi43YzYuMi02LjIgMTYuNC02LjIgMjIuNiAweiIgZmlsbD0iIzFjMjMyMSIvPjwvc3ZnPg==
[testing-shield]: https://img.shields.io/github/actions/workflow/status/powerlint/powerlint/test.yml?label=tests&style=for-the-badge&labelColor=eef1ef&logo=vitest&logoColor=1c2321
[vulnerabilities-shield]: https://img.shields.io/snyk/vulnerabilities/github/powerlint/powerlint?style=for-the-badge&labelColor=eef1ef&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuNC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIzIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBkPSJNMjY5LjQgMi45QzI2NS4yIDEgMjYwLjcgMCAyNTYgMHMtOS4yIDEtMTMuNCAyLjlMNTQuMyA4Mi44Yy0yMiA5LjMtMzguNCAzMS0zOC4zIDU3LjJjLjUgOTkuMiA0MS4zIDI4MC43IDIxMy42IDM2My4yYzE2LjcgOCAzNi4xIDggNTIuOCAwQzQ1NC43IDQyMC43IDQ5NS41IDIzOS4yIDQ5NiAxNDBjLjEtMjYuMi0xNi4zLTQ3LjktMzguMy01Ny4yTDI2OS40IDIuOXpNMzEyIDIwOGMwIDIyLjMtMTMuMSA0MS42LTMyIDUwLjZWMzI4YzAgMTMuMy0xMC43IDI0LTI0IDI0cy0yNC0xMC43LTI0LTI0VjI1OC42Yy0xOC45LTktMzItMjguMy0zMi01MC42YzAtMzAuOSAyNS4xLTU2IDU2LTU2czU2IDI1LjEgNTYgNTZ6IiBmaWxsPSIjMWMyMzIxIi8+PC9zdmc+
[maintainability-shield]: https://img.shields.io/codeclimate/maintainability/powerlint/powerlint?style=for-the-badge&labelColor=eef1ef&logo=code-climate&logoColor=1c2321
[screenshot]: https://user-images.githubusercontent.com/24438483/229364092-1908dc34-a1c8-4907-a2ae-2719f5534288.png
