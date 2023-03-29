import AdmZip from 'adm-zip'
import { parseSection, Section } from './parsers/section'

export async function parseReport(pathOrBuffer: string | Buffer) {
    const archive = new AdmZip(pathOrBuffer)
    const entries = archive.getEntries()

    const layoutEntry = entries.find(({ entryName }) => entryName === 'Report/Layout')
    if (typeof layoutEntry === 'undefined') throw new Error('Provided .pbix file does not contain a report layout file!')

    const rawLayout = await new Promise<Buffer>((resolve, reject) => layoutEntry.getDataAsync((data, err) => {
        if (err) return reject(err)
        resolve(data)
    }))

    const layout: ReportLayout = JSON.parse(rawLayout.toString('utf-8').replace(/[\u0000-\u0019]+/g, ''))
    
    return {
        pages: layout.sections.map(parseSection),
    }
}

type ReportLayout = {
    id: number
    theme: string
    sections: Section[]
}
