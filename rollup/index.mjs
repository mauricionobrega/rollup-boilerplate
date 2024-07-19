import serve from 'rollup-plugin-serve'

export const profiles = {
  development: () => {
    return {
      plugins: [
        serve({
          contentBase: 'dist',
          host: 'localhost',
          open: false,
          port: 4000,
        }),
      ],
    }
  },
  hml: () => {
    return {}  
  },
  production: () => {
    return {}  
  },
}