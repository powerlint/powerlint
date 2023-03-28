import AdmZip from 'adm-zip'

export async function parseReport(path: string) {
    const archive = new AdmZip(path)
    const entries = archive.getEntries()

    const layoutEntry = entries.find(({ entryName }) => entryName === 'Report/Layout')
    if (typeof layoutEntry === 'undefined') throw new Error('Provided .pbix file does not contain a report layout file!')

    const rawLayout = await new Promise<Buffer>((resolve, reject) => layoutEntry.getDataAsync((data, err) => {
        if (err) return reject(err)
        resolve(data)
    }))

    const layout: ReportLayout = JSON.parse(rawLayout.toString('utf-8').replace(/[\u0000-\u0019]+/g, ''))

    const pages: Page[] = layout.sections.map(({ name: id, displayName: name, config: rawConfig, filters: rawFilters, visualContainers, ...section }) => {
        const config = JSON.parse(rawConfig as string)
        const filters = JSON.parse(rawFilters as string)

        return {
            id,
            name,
            config,
            filters,
            visuals: visualContainers.map(({ config: rawConfig, query: rawQuery, filters: rawFilters, dataTransforms: rawDataTransforms, z: layer, ...visual }) => {
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
            }),
            hidden: config['visibility'] === 1,
            ...section,
        }
    })
    
    return { pages }
}

export type Page = {
    id: string
    name: string
    displayOption: number
    config: unknown
    hidden: boolean
    height: number
    width: number
    ordinal: number
    visuals: Visual[]
}

export type Visual = {
    x: number
    y: number
    width: number
    height: number
    layer: number
    tabOrder?: number
}

type ReportLayout = {
    id: number
    theme: string
    sections: Section[]
}

type Section = {
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

type VisualContainer = {
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