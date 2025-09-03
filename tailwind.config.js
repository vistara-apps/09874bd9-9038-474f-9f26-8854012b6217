/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(210, 30%, 95%)',
        text: 'hsl(220, 20%, 15%)',
        accent: 'hsl(40, 90%, 55%)',
        primary: 'hsl(230, 75%, 50%)',
        surface: 'hsl(0, 0%, 100%)',
        purple: {
          400: 'hsl(270, 75%, 70%)',
          500: 'hsl(270, 75%, 60%)',
          600: 'hsl(270, 75%, 50%)',
          900: 'hsl(270, 50%, 20%)',
        },
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(0, 0%, 0%, 0.08)',
      },
      spacing: {
        lg: '16px',
        md: '8px',
        sm: '4px',
      },
      fontSize: {
        body: ['14px', { lineHeight: '16px' }],
        display: ['20px', { fontWeight: '600' }],
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, hsl(270, 75%, 70%) 0%, hsl(280, 60%, 50%) 100%)',
      },
    },
  },
  plugins: [],
};
