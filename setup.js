const fs = require('fs');
const path = require('path');

const out = path.join(__dirname, 'vendor');
const fontsOut = path.join(out, 'fonts');
fs.mkdirSync(fontsOut, { recursive: true });

// Lucide
fs.copyFileSync(
  require.resolve('lucide/dist/umd/lucide.min.js'),
  path.join(out, 'lucide.min.js')
);

// Fonts
const ranges = {
  latin: 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
  'latin-ext': 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF'
};

const fonts = [
  { pkg: 'plus-jakarta-sans', family: 'Plus Jakarta Sans', weights: [400, 500, 600, 700, 800] },
  { pkg: 'jetbrains-mono',    family: 'JetBrains Mono',    weights: [600, 700, 800] }
];

let css = '';
for (const f of fonts) {
  const dir = path.dirname(require.resolve(`@fontsource/${f.pkg}/package.json`));
  for (const w of f.weights) {
    for (const [subset, range] of Object.entries(ranges)) {
      const name = `${f.pkg}-${subset}-${w}-normal.woff2`;
      fs.copyFileSync(path.join(dir, 'files', name), path.join(fontsOut, name));
      css += `@font-face{font-family:'${f.family}';font-style:normal;font-display:swap;font-weight:${w};src:url('./fonts/${name}') format('woff2');unicode-range:${range};}\n`;
    }
  }
}
fs.writeFileSync(path.join(out, 'fonts.css'), css);
console.log('Vendor files ready.');