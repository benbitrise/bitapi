const api = require('./api/client')

const listArtifacts = async (token, appSlug, buildSlug, params = {}) => {
    const artifacts = []
    const urlParams = new URLSearchParams()
    if (params.next) {
        urlParams.append('next', params.next)
        delete params.next
    }

    const path = `apps/${appSlug}/builds/${buildSlug}/artifacts`
    const resp = await api.get(path, urlParams, token)
    const body = resp.data
    body.data.forEach(artifact => {
        artifacts.push(artifact)
    })

    const next = body.paging['next']
    if (next) {
        params['next'] = next
        const nextArtifacts = await listArtifacts(token, appSlug, buildSlug, params)
        return artifacts.concat(nextArtifacts)
    } else {
        return artifacts
    }
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