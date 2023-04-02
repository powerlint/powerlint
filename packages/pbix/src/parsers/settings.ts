import type { RawSettings, Settings } from '@powerlint/types'

export function parseSettings({ ReportSettings, QueriesSettings }: RawSettings): Settings {
    const {
        ShowHiddenFields: showHiddenFields,
        IsAutoRecoveryEnabledForThisFile: autoRecovery,
    } = ReportSettings

    const {
        TypeDetectionEnabled: typeDetection,
        RelationshipImportEnabled: relationshipImport,
    } = QueriesSettings

    return {
        report: {
            showHiddenFields,
            autoRecovery,
        },
        queries: {
            typeDetection,
            relationshipImport,
        },
    }
}

