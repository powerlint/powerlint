import { Report, parseReport } from '@powerlint/pbix'
import chalk from 'chalk'
import type Table from 'cli-table'
import { Rule, LintingError, LintingErrorInstance, LintingErrorLevelChalk, LintingErrorLevel } from './rule'
import { newTable } from './utils'
import rules from './rules'

export class Linter {
    private readonly rules: Set<Rule>

    constructor(...rules: Rule[]) {
        this.rules = new Set(rules)
    }

    addRule(rule: Rule) {
        this.rules.add(rule)
    }

    removeRule(rule: Rule | string) {
        if (typeof rule === 'string') return this.removeRuleByName(rule)

        this.rules.delete(rule)
    }

    private removeRuleByName(name: string) {
        for (const rule of this.rules) {
            if (rule.name !== name) continue

            this.rules.delete(rule)
            break
        }
    }

    lint(report: Report) {
        const errors = new Set<[LintingError, () => LintingErrorInstance]>()

        for (const rule of this.rules) {
            const ruleErrors = rule.apply(report)
            for (const error of ruleErrors) {
                errors.add([error, () => error.output(rule, LintingErrorLevel.ERROR)])
            }
        }

        return errors
    }
}

export function createDefaultLinter() {
    return new Linter(...rules)
}

export async function lintFile(linter: Linter, file: string): Promise<[string, Table, { [page: string]: Table }] | undefined> {
    const report = await parseReport(file)
    const errors = linter.lint(report)

    if (errors.size === 0) return undefined

    const reportErrors = newTable()
    const pageErrors: {
        [page: string]: Table
    } = {}

    for (const [_, output] of errors) {
        const { page, level, message, rule } = output()
        const row = [LintingErrorLevelChalk[level], message, chalk.gray(rule)]

        if (typeof page === 'undefined') {
            reportErrors.push(row)
            continue
        }

        if (!pageErrors[page]) {
            pageErrors[page] = newTable()
        }

        pageErrors[page].push(row)
    }

    return [file, reportErrors, pageErrors]
}
