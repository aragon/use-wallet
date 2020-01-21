import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import builtins from 'builtin-modules'

export default {
  input: './src/index.js',
  output: {
    dir: './dist',
    format: 'esm',
    sourcemap: true,
  },
  context: 'window',
  external: [...builtins, 'react'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      mainFields: ['module', 'browser', 'jsnext', 'main'],
      preferBuiltins: false,
    }),
    commonjs(),
    json(),
  ],
}
