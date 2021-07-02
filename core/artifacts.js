const apiPaginator = require('./api/paginator')
const api = require('./api/client')

const listArtifacts = async (token, appSlug, buildSlug, params = {}) => {
    const urlParams = new URLSearchParams()
    const path = `apps/${appSlug}/builds/${buildSlug}/artifacts`
    return apiPaginator.listItems(path, urlParams, token)
}

const getArtifactInfo = async (token, appSlug, buildSlug, artifactSlug) => {
    const urlParams = new URLSearchParams()
    const path = `apps/${appSlug}/builds/${buildSlug}/artifacts/${artifactSlug}`
    const resp = await api.get(path, urlParams, token)
    return resp.data.data
}

module.exports = {
    list: (token, appSlug, buildSlug) => {
        return listArtifacts(token, appSlug, buildSlug)
    },
    getInfo: (token, appSlug, buildSlug, artifactSlug) => {
        return getArtifactInfo(token, appSlug, buildSlug, artifactSlug)
    }
}