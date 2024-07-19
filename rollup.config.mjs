import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import copy from 'rollup-plugin-copy'
import postcss from 'rollup-plugin-postcss'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import { profiles } from './rollup/index.mjs'
import { envs } from './rollup/process.mjs'
import packageJson from './package.json' assert { type: 'json' }

const { PROFILE } =  process.env
const _ENV = profiles[PROFILE]()

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: 'inline',
    },
		{
			file: packageJson.main.replace('.js', '.min.js'),
			format: 'iife',
			name: 'version',
			plugins: [terser()],
		},
  ],
  plugins: [
    copy({
      targets: [
        { src: 'src/public/**', dest: 'dist' },
      ]
    }),
    nodeResolve({
      browser: true,
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'],
      extensions: ['.ts', '.tsx']
    }),
    commonjs(),
    injectProcessEnv(envs, {
      exclude: '**/*.css',
      verbose: false,
    }),
    typescript({ tsconfig: './tsconfig.json' }),
    postcss({
      inject: true,
      minimize: true,
      plugins: [],
    }),
    ...((_ENV || {}).plugins || []),
  ]
}