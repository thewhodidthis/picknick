import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';

let pkg = require('./package.json');
let version = pkg.version;

export default {
  entry: 'index.js',
  plugins: [
    eslint({
      exclude: [
        'example/**',
      ]
    }),
    babel(),
  ],
  targets: [
    {
      format: 'iife',
      indent: true,
      sourceMap: true,
      moduleName: 'Picknick',
      dest: 'dist/picknick.js'
    },
    {
      format: 'cjs',
      dest: 'dist/picknick.mjs'
    }
  ]
};
