import { AutoRecoveryDisabledRule } from './auto-recovery-disabled'
import { DuplicateOfPageNamesRule } from './duplicate-page-names'
import { EmptyPagesRule } from './empty-pages'

export default [
    new AutoRecoveryDisabledRule(),
    new DuplicateOfPageNamesRule(),
    new EmptyPagesRule(),
]
