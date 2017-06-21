import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.es',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
  ],
  targets: [
    {
      format: 'iife',
      moduleName: 'Picknick',
      dest: 'dist/picknick.js'
    },
    {
      format: 'cjs',
      dest: 'index.js'
    }
  ]
};
