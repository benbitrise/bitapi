const api = require('./client')

const listItems = async (path, urlParams, token) => {
    const items = []
    const resp = await api.get(path, urlParams, token)

    const body = resp.data
    body.data.forEach(item => {
        items.push(item)
    })

    const next = body.paging['next']
    if (next) {
        const nextParams = new URLSearchParams(urlParams.toString())
        nextParams.set('next', next)
        const nextItems = await listItems(path, nextParams, token)
        return items.concat(nextItems)
    } else {
        return items
    }
}

    module.exports = {
        listItems: (path, urlParams, token) => {
            return listItems(path, urlParams, token)
        }
    }