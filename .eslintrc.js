module.exports = {
    extends: 'eslint:recommended',

    env: {
        es6: true,
        node: true,
        jest: true,
    },

    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },

    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
    },
}
