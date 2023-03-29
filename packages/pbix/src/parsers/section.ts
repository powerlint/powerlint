import { parseVisualContainer, Visual, VisualContainer } from './visual-container'

/**
 * Parses a raw {@link Section} object (extracted from a .pbix file) into a more
 * developer-friendly type ({@link Page}).
 * 
 * @param rawSection The raw page (referred to as a "section" in the .pbix file format) to parse.
 * @returns The parsed report page.
 */
export function parseSection(rawSection: Section): Page {
    const { name: id, displayName: name, config: rawConfig, filters: rawFilters, visualContainers, ...section } = rawSection

    const config = JSON.parse(rawConfig as string)
    const filters = JSON.parse(rawFilters as string)

    return {
        id,
        name,
        config,
        filters,
        visuals: visualContainers.map(parseVisualContainer),
        // Calculate `hidden` property from the `visiblility` property of the page config
        hidden: config['visibility'] === 1,
        ...section,
    }
}

/**
 * Represents a page within a Power BI report.
 * 
 * This type is the parsed type returned by this library. For the raw type within a .pbix file,
 * see {@link Section}.
 */
export type Page = {
    /**
     * The unique identifier for the page.
     */
    id: string
    /**
     * The "display name" of the page, displayed to report consumers.
     */
    name: string
    displayOption: number
    /**
     * Page-specific filters currently applied.
     */
    filters: unknown
    /**
     * The page's configuration data.
     */
    config: unknown
    /**
     * Whether the page is hidden (true) or not (false) from report consumers.
     */
    hidden: boolean
    /**
     * The width of the page (in pixels).
     */
    width: number
    /**
     * The height of the page (in pixels).
     */
    height: number
    /**
     * The index of the page. This determines where the page appears in the Power BI report's
     * page navigation menu. A lower number indicates that the page appears first.
     */
    ordinal: number
    /**
     * The page's visuals.
     */
    visuals: Visual[]
}

/**
 * Represents a page within a Power BI report.
 * 
 * This type is the raw type stored within a .pbix file. For the parsed type, see {@link Page}.
 */
export type Section = {
    /**
     * The unique identifier for the page.
     * 
     * During parsing, this is remapped to the `id` property of the {@link Page} type.
     */
    name: string
    /**
     * The "display name" of the page, displayed to report consumers.
     * 
     * During parsing, this is remapped to the `name` property of the {@link Page} type.
     */
    displayName: string
    displayOption: number
    /**
     * The width of the page (in pixels).
     */
    width: number
    /**
     * The height of the page (in pixels).
     */
    height: number
    /**
     * The page's configuration data.
     */
    config: unknown
    /**
     * Page-specific filters currently applied.
     */
    filters: unknown
    /**
     * The index of the page. This determines where the page appears in the Power BI report's
     * page navigation menu. A lower number indicates that the page appears first.
     */
    ordinal: number
    /**
     * The page's visuals.
     */
    visualContainers: VisualContainer[]
}

