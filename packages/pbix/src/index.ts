import AdmZip from 'adm-zip'
import { parseSection, Page, Section } from './parsers/section'
import { RawSettings, Settings, parseSettings } from './parsers/settings'
export type { Page } from './parsers/section'
export type { Visual } from './parsers/visual-container'
export type { Settings, ReportSettings, QueriesSettings } from './parsers/settings'

async function extractJson<T = any>(entries: AdmZip.IZipEntry[], file: string): Promise<T | undefined> {
    // Attempt to fetch file entry from zip archive
    const entry = entries.find(({ entryName }) => entryName === file)
    if (typeof entry === 'undefined') return undefined

    // Extract raw file data from zip archive
    const raw = await new Promise<Buffer>((resolve, reject) => entry.getDataAsync((data, err) => {
        if (err) return reject(err)
        resolve(data)
    }))

    // Remove invisible characters from file (otherwise JSON parsing fails!)
    return JSON.parse(raw.toString('utf-8').replace(/[\u0000-\u0019]+/g, ''))
}

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
    
    // Extract layout data from report file
    const layout = await extractJson<ReportLayout>(entries, 'Report/Layout')
    if (typeof layout === 'undefined') throw new Error('Provided .pbix file does not contain a report layout file!')
    
    const { theme, sections } = layout
    
    // Parse pages from report layout
    const pages = sections.map(parseSection)

    // Extract settings from report file
    const settings = await extractJson<RawSettings>(entries, 'Settings')
    if (typeof settings === 'undefined') throw new Error('Provided .pbix file does not contain a settings file!')

    return {
        theme,
        pages,
        settings: parseSettings(settings),
    }
}

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
