import babel from 'rollup-plugin-babel'
import builtins from 'builtin-modules'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

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
    terser(),
  ],
}
