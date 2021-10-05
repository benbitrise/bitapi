const workflowClient = require('./workflows');
const ymlClient = require('./bitrise-yml');

jest.mock('./bitrise-yml');

test('yml is parsed to return workflow names', () => {
  const theYml = `
workflows:
  wf1:
  wf2:
  wf3:
`;

  ymlClient.getYml.mockImplementation(() => Promise.resolve(theYml));
  workflowClient.list('token', 'appSlug', 'buildSlug').then((workflows) => {
    expect(workflows).toStrictEqual(['wf1', 'wf2', 'wf3']);
  });
});
