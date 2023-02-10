import type { Options } from 'tsup'

const config: Options = {
  target: 'es2017',
  dts: true,
  entry: ['src/index.ts'],
  clean: true,
  sourcemap: true,
  format: ['cjs', 'esm'],
  outDir: 'dist',
}

export default config
