import type { Page, Section } from '@powerlint/types'
import { parseVisualContainer } from './visual-container'

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

