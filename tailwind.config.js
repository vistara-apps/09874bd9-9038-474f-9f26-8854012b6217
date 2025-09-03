/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210, 30%, 95%)',
        text: 'hsl(220, 20%, 15%)',
        accent: 'hsl(40, 90%, 55%)',
        primary: 'hsl(230, 75%, 50%)',
        surface: 'hsl(0, 0%, 100%)',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(0, 0%, 0%, 0.08)',
      },
      spacing: {
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
      typography: {
        body: 'text-sm leading-4',
        display: 'text-xl font-semibold',
      },
    },
  },
  plugins: [],
};

