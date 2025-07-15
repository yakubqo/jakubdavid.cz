export default {
  entryPoints: ['src/main.tsx'],
  bundle: true,
  minify: true,
  outdir: 'dist',
  format: 'esm',
  splitting: true,
  chunkNames: 'chunks/[name]-[hash]',
  loader: {
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.svg': 'file',
    '.gif': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.eot': 'file',
  },
  plugins: [
    {
      name: 'style-plugin',
      setup(build) {
        build.onResolve({ filter: /\.css$/ }, (args) => {
          return { path: args.path, namespace: 'css' }
        })
        build.onLoad({ filter: /.*/, namespace: 'css' }, (args) => {
          return { contents: '', loader: 'css' }
        })
      }
    }
  ]
}
