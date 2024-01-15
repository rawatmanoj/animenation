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
      zIndex: {
        '100': '100',
      }
    },
    colors:{
      'base-color':'rgb(15 23 42)',
      ...colors
    }
  },
  plugins: [],
}
export default config
