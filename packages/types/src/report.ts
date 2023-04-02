import type { Page } from './page'
import type { Settings } from './settings'

/**
 * Represents a Power BI report.
 * 
 * This type is the parsed type returned by this library. For the raw type within a .pbix file,
 * see {@link ReportLayout} and {@link RawSettings}.
 */
export type Report = {
    /**
     * The report's configured theme/appearance.
     */
    theme: string
    /**
     * The pages within the report.
     */
    pages: Page[]
    /**
     * The report's configuration settings.
     */
    settings: Settings
}

