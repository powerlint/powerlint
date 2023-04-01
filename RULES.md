# PowerLint Rules

This page details every linting rule currently available when using the [PowerLint][PowerLint] CLI.

## `auto-recovery-disabled`

> Introduced in version `0.1.0`.

Power BI provides an auto recovery feature that uses temporary files to retrieve a `.pbix` when the desktop program is closed without saving.

The auto recovery feature can be disabled on an per-report basis. However, disabling the feature is discouraged because it's an important function that can recover lost work in the event of a crash/accidental program closure.

This rule throws an error if the report has auto recovery disabled.

## `default-page-names`

> Introduced in version `0.1.0`.

By default, Power BI uses a naming convention of `"Page n"` for page names (where `n` is an incrementing number, starting at 1).

This rule throws an error if any pages have names that match this format.

## `duplicate-of-page-names`

> Introduced in version `0.1.0`.

When you duplicate a report page in Power BI, the new page name is prefixed with `"Duplicate of "`.

This rule throws an error if any pages have names that start with this duplicate prefix (indicative of a page that the report author has forgotten to rename after duplicating).

## `empty-pages`

> Introduced in version `0.1.0`.

This rule throws an error if any pages are detected in a Power BI report that contain no visuals.

[PowerLint]: https://github.com/powerlint/powerlint
