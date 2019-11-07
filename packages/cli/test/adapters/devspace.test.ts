import {expect, test} from '@oclif/test'
import * as DevspaceAdapter from '../../src/adapters/devspace'
import { IApplication } from '@formicarium/common'
import * as db from '@formicarium/common/lib/services/db'
describe('DevspaceAdapter', () => {
    it('applicationsToServices', () => {

        const apps: IApplication[] = [
            {
                name: 'mortician',
                service: 'mortician',
                devspace: 'some',
                links: {
                    stinger: 'https://stinger.mortician/',
                },
            },
            {
                name: 'auth',
                service: 'auth',
                devspace: 'some',
                links: {
                    stinger: 'https://stinger.auth/',
                },
            },
        ]
        const expected: db.IService[] = [
            {
                name: 'mortician',
                stingerUrls: [
                    'https://stinger.mortician/',
                ],
            },
            {
                name: 'auth',
                stingerUrls: [
                    'https://stinger.auth/',
                ],
            },
        ]
        const value = DevspaceAdapter.applicationsToServices(apps)

        expect(value).to.be.deep.equals(expected)
    })
})
