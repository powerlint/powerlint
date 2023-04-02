import type { Section } from './page'

/**
 * Represents a Power BI report.
 * 
 * This type is the raw type stored within a .pbix file. For the parsed type, see {@link Report}.
 */
export type ReportLayout = {
    id: number
    /**
     * The name of the report's theme.
     */
    theme: string
    /**
     * The pages within the report (referred to in the .pbix file format as "sections").
     */
    sections: Section[]
}
