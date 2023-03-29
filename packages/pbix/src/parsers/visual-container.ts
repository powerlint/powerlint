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

export type Visual = {
    x: number
    y: number
    width: number
    height: number
    layer: number
    tabOrder?: number
}

export type VisualContainer = {
    x: number
    y: number
    z: number
    width: number
    height: number
    config: unknown
    filters: unknown
    query: unknown
    dataTransforms?: unknown 
    tabOrder?: number
}