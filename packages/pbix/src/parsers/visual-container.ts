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

/**
 * Represents an individual instance of a visual placed on a Power BI report page.
 * 
 * This type is the parsed type returned by this library. For the raw type within a .pbix file,
 * see {@link VisualContainer}.
 */
export type Visual = {
    /**
     * The x (horizontal) coordinate of the visual.
     */
    x: number
    /**
     * The y (vertical) coordinate of the visual.
     */
    y: number
    /**
     * The width of the visual (in pixels).
     */
    width: number
    /**
     * The height of the visual (in pixels).
     */
    height: number
    /**
     * The layer of the visual. Higher values will make the visual appear on top of
     * other visuals.
     */
    layer: number
    /**
     * The tab order of the visual. When the report consumer presses the "TAB" key,
     * visuals with higher values will be navigated to first.
     */
    tabOrder?: number
}

/**
 * Represents an individual instance of a visual placed on a Power BI report page.
 * 
 * This type is the raw type stored within a .pbix file. For the parsed type, see {@link Visual}.
 */
export type VisualContainer = {
    /**
     * The x (horizontal) cooridnate of the visual.
     */
    x: number
    /**
     * The y (vertical) coordinate of the visual.
     */
    y: number
    /**
     * The z (layer) coordinate of the visual.
     */
    z: number
    /**
     * The width of the visual (in pixels).
     */
    width: number
    /**
     * The height of the visual (in pixels).
     */
    height: number
    /**
     * The visual's configuration data.
     */
    config: unknown
    /**
     * Visual-specific filters currently applied.
     */
    filters: unknown
    query: unknown
    dataTransforms?: unknown
    /**
     * The tab order of the visual. When the report consumer presses the "TAB" key,
     * visuals with higher values will be navigated to first.
     */
    tabOrder?: number
}