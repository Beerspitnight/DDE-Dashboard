const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'src/index.js',
  'src/App.js',
  'src/index.css',
  'public/index.html'
];

console.log('🔍 Checking for required files...\n');
requiredFiles.forEach((file) => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing: ${file}`);
  } else {
    console.log(`✅ Found: ${file}`);
  }
});

console.log('\n✨ Debugging complete.');
