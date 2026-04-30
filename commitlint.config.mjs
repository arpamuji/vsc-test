export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'init',
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'scope-empty': [2, 'never'],
    'scope-enum': [
      2,
      'always',
      ['frontend', 'backend', 'shared', 'deps', 'config', 'project', 'docs'],
    ],
  },
};
