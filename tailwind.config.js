module.exports = {
  content: ['./index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        boardBg: '#070b14',
        panelBg: 'rgba(15, 23, 42, 0.72)',
        panelBorder: 'rgba(148, 163, 184, 0.14)',
      }
    }
  }
};