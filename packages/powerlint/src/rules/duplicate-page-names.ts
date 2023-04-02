import type { Report } from '@powerlint/types'
import { PageError, Rule, RuleMetadata } from '../rule'

@RuleMetadata({ name: 'duplicate-of-page-names', description: 'Disallow report pages with names that start with "Duplicate of"' })
export class DuplicateOfPageNamesRule implements Rule {
    apply(report: Report) {
        return report.pages
            .filter(({ name }) => name.startsWith('Duplicate of'))
            .map(({ name }) => new PageError('Page name must not start with "Duplicate of"', name))
    }
}
