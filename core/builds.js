const apiPaginator = require('./api/paginator')

const listBuilds = async (token, appSlug, params = {}) => {
    const path = `apps/${appSlug}/builds`
    const builds = []
    const urlParams = new URLSearchParams()
    if (params.before) {
        urlParams.append('before', params.before)
    }
    if (params.after) {
        urlParams.append('after', params.after)
    }
    return apiPaginator.listItems(path, urlParams, token)
}

module.exports = {
    list: (token, appSlug, params = {}) => {
        return listBuilds(token, appSlug, params)
    }
}