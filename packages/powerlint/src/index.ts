#! /usr/bin/env node

import { Command } from '@commander-js/extra-typings'
import { globby } from 'globby'
import chalk from 'chalk'
import { EOL } from 'os'

import { createDefaultLinter, lintFile } from './lint'

const program = new Command('powerlint')
    .description('Linter for Power BI reports (.pbix files)')
    .argument('[pattern]', 'Glob pattern to match .pbix files that are linted. Defaults to "**.pbix".', '**.pbix')
    .option('--fix', 'Instructs PowerLint to fix as many issues as possible. The fixes are applied to the .pbix file directly; the remaining unfixable issues are logged.')
    .option('--suppress-no-match-error', 'Prevents an error from occurring when no Power BI reports are found that match the provided glob pattern.')
    .option('-d, --dir <dir>', 'The directory to search for files in (the glob pattern argument is still respected).', process.cwd())
    .action(async (pattern, { dir: cwd, suppressNoMatchError }) => {
        console.time('Completed in')

        const files = await globby(pattern, {
            cwd,
            gitignore: true,
            ignoreFiles: ['.powerlintignore'],
        })

        if (files.length === 0 && !suppressNoMatchError) {
            console.log(`${chalk.bold.bgRed(' ERROR ')} ${chalk.red(`No files were found matching the glob pattern: ${pattern}`)}${EOL}`)
            process.exit(1)
        }

        const linter = createDefaultLinter()

        const fileOutputs = await Promise.all(files.map((file) => lintFile(linter, file)))

        if (fileOutputs.filter(Boolean).length === 0) {
            console.log(`${chalk.bold.green(`No errors found in matching files!`)} ${EOL}`)
        } else {
            let total = 0
            
            for (const fileOutput of fileOutputs) {
                if (typeof fileOutput === 'undefined') continue

                const [file, reportErrors, pageErrors] = fileOutput

                if (reportErrors.length > 0) {
                    console.log(`${chalk.underline(file)}${EOL}${EOL}${reportErrors.toString()}${EOL}`)
                }

                for (const [page, errors] of Object.entries(pageErrors)) {
                    console.log(`${chalk.underline.gray(page)}${EOL}${EOL}${errors.toString()}${EOL}`)
                }
                
                total += reportErrors.length + Object.values(pageErrors).flat().length
            }

            console.log(`${chalk.bold.red(`${total} error${total === 1 ? '' : 's'} found in matching files!`)}${EOL}`)
        }

        console.timeEnd('Completed in')
    })

program.parse()
