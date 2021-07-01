const builds = require('./builds')
const api = require('./api')

jest.mock('./api')

beforeEach(() => {
    api.get.mockReset();
});

test('should return all builds on single page', () => {
    const resp = {
        data: {
            data: ['a', 'b'],
            paging: {}
        }
    }
    api.get.mockImplementation(() => {
        return Promise.resolve(resp)
    })

    builds.list("a", {}).then((builds) => {
        expect(builds).toEqual(resp.data.data)
    })
});

test('should return all builds on multiple pages', async () => {
    const resp1 = {
        data: {
            data: ['a', 'b'],
            paging: { next: 'c' }
        }
    }
    const resp2 = {
        data: {
            data: ['c', 'd'],
            paging: {}
        }
    }

    api.get.mockImplementation((appSlug, params, token) => {
        if (params.get('next')) {
            return Promise.resolve(resp2)
        }
        return Promise.resolve(resp1)
    })

    return builds.list("a", "b", {}).then((builds) => {
        expect(builds).toEqual(resp1.data.data.concat(resp2.data.data))
    })
});

test('should pass url params to api client', () => {
    const inputParams = { "before": "1", "after": "2", "next": "3" }
    api.get.mockImplementation((appSlug, params, token) => {
        expect(params.get("before")).toBe(inputParams.before)
        expect(params.get("after")).toBe(inputParams.after)
        expect(params.get("next")).toBe(inputParams.next)
        return { data: { data: [], paging: {} } }
    })
    return builds.list("a", "b", { ...inputParams })
})

test('should pass no url params to api client if none provided', () => {
    const inputParams = {}
    api.get.mockImplementation((appSlug, params, token) => {
        expect(params.get("before")).toBeNull()
        expect(params.get("after")).toBeNull()
        expect(params.get("next")).toBeNull()
        return { data: { data: [], paging: {} } }
    })
    return builds.list("a", "b", inputParams)
})