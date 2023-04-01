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

export type Settings = Partial<{
    report: Partial<ReportSettings>
    queries: Partial<QueriesSettings>
}>

export type ReportSettings = {
    showHiddenFields: boolean
    autoRecovery: boolean
}

export type QueriesSettings = {
    typeDetection: boolean
    relationshipImport: boolean
}

export type RawSettings = {
    Version: number
    ReportSettings: Partial<RawReportSettings>
    QueriesSettings: Partial<RawQueriesSettings>
}

export type RawReportSettings = {
    ShowHiddenFields: boolean
    IsAutoRecoveryEnabledForThisFile: boolean
}

export type RawQueriesSettings = {
    TypeDetectionEnabled: boolean
    RelationshipImportEnabled: boolean
    Version: string
}