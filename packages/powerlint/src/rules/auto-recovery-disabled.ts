import { Report } from 'pbix'
import { LintingError, Rule, RuleMetadata } from '../rule'

@RuleMetadata({ name: 'auto-recovery-disabled', description: 'Ensure that report auto recovery is enabled' })
export class AutoRecoveryDisabledRule implements Rule {
    apply(report: Report) {
        return report.settings.report?.autoRecovery === false ? [new LintingError('Reports must have auto recovery enabled')] : []
    }
}
