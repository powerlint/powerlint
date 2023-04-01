import { AutoRecoveryDisabledRule } from './auto-recovery-disabled'
import { DefaultPageNamesRule } from './default-page-names'
import { DuplicateOfPageNamesRule } from './duplicate-page-names'
import { EmptyPagesRule } from './empty-pages'

export default [
    new AutoRecoveryDisabledRule(),
    new DefaultPageNamesRule(),
    new DuplicateOfPageNamesRule(),
    new EmptyPagesRule(),
]
