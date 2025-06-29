module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      spacing: {
        '11': '2.75rem',
        '13': '3.25rem',
      },
      width: {
        '11': '2.75rem',
        '13': '3.25rem',
      },
      height: {
        '11': '2.75rem',
        '13': '3.25rem',
      },
      colors: {
        border: 'hsl(214, 32%, 91%)',
        input: 'hsl(214, 32%, 91%)',
        ring: 'hsl(215, 20%, 65%)',
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(222, 47%, 11%)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
  plugins: [],
};
