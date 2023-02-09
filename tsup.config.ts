import type { Options } from 'tsup'

const config: Options = {
  target: 'es2017',
  entry: ['src/index.ts'],
  dts: true,
  sourcemap: true,
  format: ['iife', 'cjs', 'esm']
}

export default config
