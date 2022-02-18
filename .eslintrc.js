// @ts-check
// const { defineConfig } = require('eslint-define-config') // eslint-disable-line
// module.exports = defineConfig({
//   root: true,
//   env: {
//     browser: true,
//     node: true,
//     es6: true,
//   },
//   globals: {
//     HxMap: true,
//   },
//   parser: 'vue-eslint-parser',
//   parserOptions: {
//     parser: '@typescript-eslint/parser',
//     ecmaVersion: 2020,
//     sourceType: 'module',
//     jsxPragma: 'React',
//     ecmaFeatures: {
//       jsx: true,
//     },
//   },
//   extends: [
//     'plugin:vue/vue3-essential',
//     'eslint:recommended',
//     '@vue/typescript/recommended',
//     '@vue/prettier',
//     '@vue/prettier/@typescript-eslint',
//   ],
//   rules: {
//     'no-debugger': process.env.VUE_APP_NODE_ENV === 'uat' || process.env.VUE_APP_NODE_ENV === 'prod' ? 2 : 0, // 打包时禁止debugger
//     'no-console': process.env.VUE_APP_NODE_ENV === 'uat' || process.env.VUE_APP_NODE_ENV === 'prod' ? 2 : 0, // 打包时禁止console
//     'no-alert': process.env.VUE_APP_NODE_ENV === 'uat' || process.env.VUE_APP_NODE_ENV === 'prod' ? 2 : 0, // 打包时禁止console
//     '@typescript-eslint/explicit-module-boundary-types': 'off',
//     '@typescript-eslint/no-explicit-any': ['off'],
//     '@typescript-eslint/no-this-alias': [
//       'error',
//       {
//         allowDestructuring: true, // Disallow `const { props, state } = this`; true by default
//         allowedNames: ['_this', 'me', 'self'], // Allow `const self = this`; `[]` by default
//       },
//     ],
//   },
//   overrides: [
//     {
//       files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
//       env: {
//         mocha: true,
//       },
//     },
//     {
//       files: ['*.ts', '*.tsx'],
//       rules: {
//         '@typescript-eslint/explicit-module-boundary-types': ['warn'],
//       },
//     },
//   ],
// })

module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser', // 解析器
    sourceType: 'module',
    ecmaVersion: 12
  },
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-recommended', // plugin-vue
    'eslint:recommended', // eslint
    'plugin:prettier/recommended' // plugin-prettier
  ],

  rules: {
    'prettier/prettier': 'error'
  },
  overrides: [
    {
      files: ['src/pages/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 0
      }
    }
  ]
}
