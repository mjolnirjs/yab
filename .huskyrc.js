module.exports = {
  $schema: 'http://json.schemastore.org/huskyrc',
  hooks: {
    'pre-commit': 'lint-staged',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
  }
};
