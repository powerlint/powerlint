import type { Visual, VisualContainer } from '@powerlint/types'

/**
 * Parses a raw {@link VisualContainer} object (extracted from a .pbix file) into a more
 * developer-friendly type ({@link Visual}).
 * 
 * @param container The visual container to parse.
 * @returns The parsed visual object.
 */
export function parseVisualContainer(container: VisualContainer): Visual {
    const { config: rawConfig, query: rawQuery, filters: rawFilters, dataTransforms: rawDataTransforms, z: layer, ...visual } = container

    const config = JSON.parse(rawConfig as string)
    const query = typeof rawQuery === 'undefined' ? undefined : JSON.parse(rawQuery as string)
    const filters = JSON.parse(rawFilters as string)
    const dataTransforms = typeof rawDataTransforms === 'undefined' ? undefined : JSON.parse(rawDataTransforms as string)

    return {
        config,
        ...(query && { query }),
        filters,
        ...(dataTransforms && { dataTransforms }),
        layer,
        ...visual,
    }
}

