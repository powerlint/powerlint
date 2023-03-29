import { parseVisualContainer, Visual, VisualContainer } from './visual-container'

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
        hidden: config['visibility'] === 1,
        ...section,
    }
}

export type Page = {
    id: string
    name: string
    displayOption: number
    filters: unknown
    config: unknown
    hidden: boolean
    height: number
    width: number
    ordinal: number
    visuals: Visual[]
}

export type Section = {
    name: string
    displayName: string
    displayOption: number
    height: number
    width: number
    config: unknown
    filters: unknown
    ordinal: number
    visualContainers: VisualContainer[]
}

