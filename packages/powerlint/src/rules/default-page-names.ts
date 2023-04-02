import type { Report } from '@powerlint/types'
import { PageError, Rule, RuleMetadata } from '../rule'

@RuleMetadata({ name: 'default-page-names', description: 'Disallow report pages with default names (i.e. "Page n")' })
export class DefaultPageNamesRule implements Rule {
    apply(report: Report) {
        return report.pages
            .filter(({ name }) => name.match(/^Page \d+$/))
            .map(({ name }) => new PageError('Page name must be changed from default format', name))
    }
}
