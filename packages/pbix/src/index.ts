import AdmZip from 'adm-zip'
import { parseSection, Page, Section } from './parsers/section'
export type { Page } from './parsers/section'
export type { Visual } from './parsers/visual-container'

/**
 * Parses a Power BI report file (.pbix) and extracts metadata and report structure into
 * developer-friendly (fully typed) objects.
 * 
 * @param pathOrBuffer The file path (or buffer of the file contents if already read from the filesystem).
 * @returns The parsed Power BI report metadata.
 */
export async function parseReport(pathOrBuffer: string | Buffer) {
    // Instantiate zip archive from report file
    const archive = new AdmZip(pathOrBuffer)
    const entries = archive.getEntries()

    // Attempt to fetch report layout file from zip archive
    const layoutEntry = entries.find(({ entryName }) => entryName === 'Report/Layout')
    if (typeof layoutEntry === 'undefined') throw new Error('Provided .pbix file does not contain a report layout file!')

    // Extract raw layout file's data from zip archive
    const rawLayout = await new Promise<Buffer>((resolve, reject) => layoutEntry.getDataAsync((data, err) => {
        if (err) return reject(err)
        resolve(data)
    }))

    // Remove invisible characters from layout file (otherwise JSON parsing fails!)
    const { theme, sections }: ReportLayout = JSON.parse(rawLayout.toString('utf-8').replace(/[\u0000-\u0019]+/g, ''))
    
    // Parse pages from report layout
    const pages = sections.map(parseSection)

    return {
        theme,
        pages,
    }
}

/**
 * Represents a Power BI report.
 * 
 * This type is the parsed type returned by this library. For the raw type within a .pbix file,
 * see {@link ReportLayout}.
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
}

/**
 * Represents a Power BI report.
 * 
 * This type is the raw type stored within a .pbix file. For the parsed type, see {@link Report}.
 */
type ReportLayout = {
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
