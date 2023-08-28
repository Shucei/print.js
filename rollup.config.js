import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
export default {
  input: 'lib/index.js', 
  output: {
    file: 'dist/print.js', 
    format: 'umd', 
    name: 'print.js'
  },
  plugins: [
    resolve(), 
    commonjs(),
    babel({
      exclude: 'node_modules/**', 
      include: 'lib/**' 
    }),
    terser(),
    postcss(),
    livereload(),
    serve({
      open: true,
      contentBase: 'dist'
    })
  ],
   external: ['lib']
};