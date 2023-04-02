import type { Report } from '@powerlint/types'
import { PageError, Rule, RuleMetadata } from '../rule'

@RuleMetadata({ name: 'empty-pages', description: 'Report pages must have at least one visual' })
export class EmptyPagesRule implements Rule {
    apply(report: Report) {
        return report.pages
            .filter(({ visuals }) => visuals.length === 0)
            .map(({ name }) => new PageError('Page must have at least one visual', name))
    }
}
