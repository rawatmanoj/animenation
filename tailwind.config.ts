import type { Config } from 'tailwindcss'
import colors  from 'tailwindcss/colors'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxHeight: {
        '45': '45rem',
        '25':'24rem',
        '15':'15rem',
        '20':'20rem'
      },
      height:{
        '45': '45%',
        '25':'24%',
        '15':'15%',
        '20':'20%',
        '50':'50rem',
        '264':'264px'
      },
      width:{
        '185':'185px',
      },
      zIndex: {
        '100': '100',
      },
    },
    colors:{
      'base-color':'rgb(15 23 42)',
      ...colors
    }
  },
  plugins: [],
}
export default config
