const api = require('./api')


const buildsHandler = (resp) => {
    let body = resp.data
            body.data.forEach(build => {
                buids.push(build)
            })
}

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
        if (params.next) {
            urlParams.append('next', params.next)
            delete params.next
        }
        
        const resp = await api.get(path, urlParams, token)
        
        const body = resp.data
        body.data.forEach(build => {
            builds.push(build)
        })

        const next = body.paging['next']
        if (next) {
            params['next'] = next
            const nextBuilds = await listBuilds(token, appSlug, params)
            return builds.concat(nextBuilds)
        } else {
            return builds
        }
}

module.exports = {
    list: (token, appSlug, params = {}) => {
        return listBuilds(token, appSlug, params)
    }
}