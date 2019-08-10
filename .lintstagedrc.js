module.exports = {
  $schema: 'http://json.schemastore.org/lintstagedrc.schema',
  '**/*.{js, ts}': ['prettier --write', 'eslint --fix', 'git add']
};
