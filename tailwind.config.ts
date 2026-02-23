import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: 'var(--font-serif)',
        body: 'var(--font-body)',
      },
    },
  },
  plugins: [],
}

export default config
