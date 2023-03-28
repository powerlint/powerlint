import { assert, expect, test, it } from 'vitest'
import { resolve } from 'path'
import { parseReport } from '../src'

test('parseReport(path)', async () => {
    const path = resolve(__dirname, 'Example.pbix')
    const report = await parseReport(path)
    
    it('parses all report pages', () => {
        const { pages } = report

        expect(pages).toHaveLength(8)
        
        assert.deepEqual(
            pages.map(({ name }) => name),
            ['Life Expectancy', 'Child Mortality', 'Key Drivers', 'Root Causes', 'GDP Analysis', 'Dashboard', 'Tooltip', 'Resources'],
        )
    })
})
