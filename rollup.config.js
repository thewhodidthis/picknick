import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.js',
  plugins: [
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
