#! /usr/bin/env node

import { Command } from '@commander-js/extra-typings'
import { globby } from 'globby'
import chalk from 'chalk'
import { EOL } from 'os'

import { createDefaultLinter, lintFile } from './lint'
import { actionRunner } from './utils'

const program = new Command('powerlint')
    .description('Linter for Power BI reports (.pbix files)')
    .argument('[pattern]', 'Glob pattern to match .pbix files that are linted. Defaults to "**.pbix".', '**.pbix')
    .option('--fix', 'Instructs PowerLint to fix as many issues as possible. The fixes are applied to the .pbix file directly; the remaining unfixable issues are logged.')
    .option('--allow-no-files', 'Prevents an error from occurring when no Power BI reports are found that match the provided glob pattern.')
    .option('-d, --dir <dir>', 'The directory to search for files in (the glob pattern argument is still respected).', process.cwd())
    .action(actionRunner(async (pattern, { dir: cwd, allowNoFiles }) => {
        console.time('Completed in')

        const files = await globby(pattern, {
            cwd,
            gitignore: true,
            ignoreFiles: ['.powerlintignore'],
        })

        if (files.length === 0 && !allowNoFiles) {
            console.log(`${chalk.bold.bgRed(' ERROR ')} ${chalk.red(`No files were found matching the glob pattern: ${pattern}`)}${EOL}`)
            process.exit(1)
        } else if (files.length === 0) {
            console.log(chalk.bold.green(`No errors found in matching files!`))
            console.log(`${chalk.gray('No matching files were found but --allow-no-files was passed.')} ${EOL}`)
            return
        }

        const linter = createDefaultLinter()

        const fileOutputs = await Promise.all(files.map((file) => lintFile(linter, file)))

        let errors = 0

        if (fileOutputs.filter(Boolean).length === 0) {
            console.log(`${chalk.bold.green(`No errors found in matching files!`)} ${EOL}`)
        } else {
            for (const fileOutput of fileOutputs) {
                if (typeof fileOutput === 'undefined') continue

                const [file, reportErrors, pageErrors] = fileOutput

                if (reportErrors.length > 0) {
                    console.log(`${chalk.underline(file)}${EOL}${EOL}${reportErrors.toString()}${EOL}`)
                }

                for (const [page, errors] of Object.entries(pageErrors)) {
                    console.log(`${chalk.underline.gray(page)}${EOL}${EOL}${errors.toString()}${EOL}`)
                }

                errors += reportErrors.length + Object.values(pageErrors).reduce((a, { length: b }) => a + b, 0)
            }

            console.log(`${chalk.bold.red(`${errors} error${errors === 1 ? '' : 's'} found in matching files!`)}${EOL}`)

            if (errors > 0) {
                process.exitCode = 1
            }
        }

        console.timeEnd('Completed in')
        console.log()
    }))

program.parse()
