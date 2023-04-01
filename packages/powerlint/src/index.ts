#! /usr/bin/env node

import { Command } from '@commander-js/extra-typings'
import { globby } from 'globby'
import { parseReport } from 'pbix'
import chalk from 'chalk'
import { EOL } from 'os'
import Table from 'cli-table'

import { Linter, LintingErrorLevelChalk } from './rule'
import { DuplicateOfPageNamesRule } from './rules/duplicate-page-names'
import { EmptyPagesRule } from './rules/empty-pages'

async function lintFile(linter: Linter, file: string): Promise<[string, Table] | undefined> {
    const report = await parseReport(file)
    const errors = linter.lint(report)

    if (errors.size === 0) return undefined

    const table = new Table({
        chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
                , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
                , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
                , 'right': '' , 'right-mid': '' , 'middle': ' ' },
        style: { 'padding-left': 0, 'padding-right': 1 },
    })

    for (const [_, output] of errors) {
        const { page, level, message, rule } = output()
        table.push([chalk.gray(page ?? ''), LintingErrorLevelChalk[level], message, chalk.gray(rule)])
    }

    return [file, table]
}

const program = new Command('powerlint')
    .description('Linter for Power BI reports (.pbix files)')
    .argument('<pattern>')
    .option('--fix', 'Instructs PowerLint to fix as many issues as possible. The fixes are applied to the .pbix file directly; the remaining unfixable issues are logged.', false)
    .option('-d, --dir <dir>', 'The directory to search for files in (the glob pattern argument is still respected).', process.cwd())
    .action(async (pattern, { dir: cwd }) => {
        console.time('Completed in')

        const files = await globby(pattern, {
            cwd,
            gitignore: true,
            ignoreFiles: ['.powerlintignore'],
        })
        
        const linter = new Linter(new DuplicateOfPageNamesRule(), new EmptyPagesRule())

        let total = 0

        const fileOutputs = await Promise.all(files.map((file) => lintFile(linter, file)))

        if (fileOutputs.filter(Boolean).length === 0) {
            console.log(`${chalk.bold.green(`No errors found in matching files!`)} ${EOL}`)
        } else {
            for (const fileOutput of fileOutputs) {
                if (typeof fileOutput === 'undefined') continue

                const [file, output] = fileOutput

                console.log(`${chalk.underline(file)}${EOL}${EOL}${output.toString()}${EOL}`)
                
                total += output.length
            }

            console.log(`${chalk.bold.red(`${total} error${total === 1 ? '' : 's'} found in matching files!`)}${EOL}`)
        }

        console.timeEnd('Completed in')
    })

program.parse()
