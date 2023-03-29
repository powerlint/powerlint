<img src="https://user-images.githubusercontent.com/24438483/228566525-0553987f-51c1-4297-8687-032944a6e084.png" align="right"
     alt="pbilint logo" height="160" width="160" />

# pbilint

[![MIT license](https://img.shields.io/github/license/pbilint/pbilint?style=for-the-badge&labelColor=eef1ef&color=6369d1)](LICENSE)
[![GitHub discussions](https://img.shields.io/badge/GitHub-Discussion-black?style=for-the-badge&labelColor=eef1ef&color=6369d1&logo=github&logoColor=1c2321)][discussion]
[![Testing status](https://img.shields.io/github/actions/workflow/status/pbilint/pbilint/test.yml?label=tests&style=for-the-badge&labelColor=eef1ef&logo=vitest&logoColor=1c2321)][tests]
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/pbilint/pbilint?style=for-the-badge&labelColor=eef1ef&logo=snyk&logoColor=1c2321)](#)

pbilint is a validation/linting tool for Power BI reports. It inspects `.pbix` files to guarantee that your predefined conditions (e.g. "x" page is hidden, "y" page has "z" visual) are satisfied. Integrating with a Continuous Integration (CI) solution allows you to ensure that destructive modifications are not unintentionally introduced to your Power BI reports.

## How it works

1. The `pbix` NPM package extracts report metadata and structure from a Power BI report file. *This package is also published as a standalone API that you can use to parse report files in your projects!*
1. The `pbilint` CLI compares the parsed report details (from the previous step) against a JSON configuration defining your expected structure.
1. The comparison results are formatted and rendered in a way that makes identifying and debugging linter errors easy!

## Monorepo contents

This monorepo is a [turborepo][turborepo] using [pnpm][pnpm] as a package manager, comprised of the following packages:

### `pbix`

The [`pbix` package](packages/pbix) is an API library for parsing and extracting metadata from Power BI report files (with a `.pbix` file extension).

### `pbilint`

The [`pbilint` package](packages/pbilint) is a CLI for linting and validating Power BI reports against predefined conditions. Internally, this CLI uses the [`pbix`](#pbix) library to parse Power BI report files.

[tests]: https://github.com/pbilint/pbilint/actions/workflows/test.yml
[discussion]: https://github.com/orgs/pbilint/discussions
[turborepo]: https://turbo.build/repo
[pnpm]: https://pnpm.io
