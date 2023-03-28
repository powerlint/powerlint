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

    const pages: Page[] = layout.sections.map(({ name, displayName, displayOption, config: rawConfig }) => {
        const config = JSON.parse(rawConfig as string)

        return {
            id: name,
            name: displayName,
            displayOption,
            config,
            hidden: config['visibility'] === 1,
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