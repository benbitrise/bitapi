const artifacts = require('./artifacts')
const apiPaginator = require('./api/paginator')
const api = require('./api/client')

jest.mock('./api/paginator')
jest.mock('./api/client')

beforeEach(() => {
    apiPaginator.listItems.mockReset();
});

test('listArtifacts should return all artifacts', () => {
    const resp = ['a', 'b']
    apiPaginator.listItems.mockImplementation(() => {
        return Promise.resolve(resp)
    })

    artifacts.list("token", "appSlug", "buildSlug").then((artifacts) => {
        expect(artifacts).toEqual(resp)
    })
});

test('getArtifactInfo should return artifact info', () => {
    const resp = { 'data': { 'data': { 'a': 'b' } } }
    api.get.mockImplementation(() => {
        return Promise.resolve(resp)
    })

    artifacts.getInfo("token", "appSlug", "buildSlug").then((artifactInfo) => {
        expect(artifactInfo).toEqual(resp.data.data)
    })
});