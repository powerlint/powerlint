import chalk from 'chalk'
import type { Report } from 'pbix'

export abstract class Rule {
    name?: string
    description?: string
    
    abstract apply(report: Report): LintingError[]
}

export type RuleMetadataOptions = {
    name: string
    description: string
}

export function RuleMetadata({ name, description }: RuleMetadataOptions) {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            name = name
            description = description
        }
    }
}

export enum LintingErrorLevel {
    ERROR = 'ERROR',
    WARN = 'WARN',
}

export const LintingErrorLevelChalk: {
    [k in keyof typeof LintingErrorLevel]: string
} = {
    ERROR: chalk.bold.bgRed(' ERROR '),
    WARN: chalk.bold.bgYellow(' WARN '),
}

export type LintingErrorInstance = {
    page?: string
    level: LintingErrorLevel
    message: string
    rule: string
}

export class LintingError {
    readonly message: string

    constructor(message: string) {
        this.message = message
    }

    output(rule: Rule, level: LintingErrorLevel): LintingErrorInstance {
        return {
            level,
            message: this.message,
            rule: rule.name ?? '',
        }
    }
}

export class PageError extends LintingError {
    readonly page: string

    constructor(message: string, page: string) {
        super(message)
        this.page = page
    }

    output(rule: Rule, level: LintingErrorLevel): LintingErrorInstance {
        return {
            page: this.page,
            level,
            message: this.message,
            rule: rule.name ?? '',
        }
    }
}

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