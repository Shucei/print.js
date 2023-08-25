import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
export default {
  input: 'lib/index.js', // 入口文件路径
  output: {
    file: 'dist/print.js', // 输出文件路径
    format: 'umd', // 输出格式，可以是 'cjs', 'es', 'iife', 'umd'
    name: 'print.js' // 如果 format 为 'iife' 或 'umd'，则该值为全局变量的名字
  },
  plugins: [
    resolve(), // 解析第三方模块
    commonjs(), // 将 CommonJS 模块转换为 ES6
    babel({
      exclude: 'node_modules/**', // 排除 node_modules 目录下的文件
      include: 'lib/**' // 只编译 src 目录下的文件
    }),
    terser(),
    postcss(),
    livereload(),
    serve({
      open: true,
      contentBase: 'dist'
    })
  ]
};