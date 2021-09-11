var path = require('path');

module.exports = {
	// "extends": ["airbnb"],
	extends: ['airbnb', 'plugin:jest/recommended', 'plugin:prettier/recommended'],
	settings: {
		'import/resolver': {
			node: {
				paths: [path.resolve(__dirname, './src')],
				// extensions: ['.js', '.jsx', '.vue', ".ts", ".tsx"]
			},
		},
		react: {
			version: 'detect',
		},
		jest: {
			version: 26,
		},
	},
	rules: {
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.js', '.jsx'],
			},
		],
		'react/prop-types': 0,
		'no-underscore-dangle': 0,
		'import/imports-first': [1, 'absolute-first'],
		'import/newline-after-import': 1,
		'no-tabs': 0,
		'no-mixed-spaces-and-tabs': 1,
		'react/jsx-closing-tag-location': 1,
		// 'indent': [1, 'tab', { 'SwitchCase': 1 }],
		'react/jsx-indent': [1, 'tab'],
		'react/jsx-indent-props': [1, 'tab'],
		'object-curly-spacing': 1,
		'comma-dangle': [1, 'always-multiline'],
		'arrow-parens': [1, 'as-needed'],
		'operator-linebreak': [1, 'after', { overrides: { '?': 'before', ':': 'before' } }],
		'jsx-quotes': ['error', 'prefer-double'],
		'react/no-array-index-key': [0],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'import/prefer-default-export': [0],
		'no-shadow': [0],
		'no-unused-vars': [1],
		'no-params-reassign': [0],
		'no-debugger': [1],
		'prefer-destructuring': [0],
		'react/jsx-one-expression-per-line': 0, // [1, { 'allow': 'literal' }],
		'object-curly-newline': [0],
		'react/jsx-curly-newline': 0,
		'spaced-comment': 0,
		'default-case': [0],
		'jsx-a11y/label-has-associated-control': 0,
		'react/jsx-props-no-spreading': 1,
		'import/no-cycle': [0],
		'no-extra-boolean-cast': 0,
		'import/no-extraneous-dependencies': [0],
		'template-curly-spacing': [0],
		indent: 'off',
		'jsx-a11y/anchor-is-valid': [0],
		'import/no-unresolved': [2, { ignore: ['test-utils$'] }],
	},
	plugins: ['react', 'react-hooks'],
	globals: {
		window: true,
		document: true,
		localStorage: true,
		FormData: true,
		FileReader: true,
		Blob: true,
		navigator: true,
	},
	parser: 'babel-eslint',
	env: {
		'jest/globals': true,
		browser: true,
		node: true,
	},
	parserOptions: {
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true,
		},
	},
};
