const apiPaginator = require('./paginator');
const api = require('./client');

jest.mock('./client');

beforeEach(() => {
  api.get.mockReset();
});

test('should return all items from single page', () => {
  const resp = {
    data: {
      data: ['a', 'b'],
      paging: {},
    },
  };
  api.get.mockImplementation(() => Promise.resolve(resp));

  apiPaginator.listItems('', {}, '').then((items) => {
    expect(items).toEqual(resp.data.data);
  });
});

test('should return all items on multiple pages', async () => {
  const resp1 = {
    data: {
      data: ['a', 'b'],
      paging: { next: 'c' },
    },
  };
  const resp2 = {
    data: {
      data: ['c', 'd'],
      paging: {},
    },
  };

  api.get.mockImplementation((appSlug, params) => {
    if (params.get('next')) {
      return Promise.resolve(resp2);
    }
    return Promise.resolve(resp1);
  });

  return apiPaginator.listItems('', new URLSearchParams(), '').then((builds) => {
    expect(builds).toEqual(resp1.data.data.concat(resp2.data.data));
  });
});
