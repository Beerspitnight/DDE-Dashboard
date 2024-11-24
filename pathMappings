const fs = require('fs');
const path = require('path');

// Define old-to-new path mappings
const pathMappings = {
  './FilterBar': './components/dashboard/FilterBar',
  './TimeDistributionChart': './components/dashboard/TimeDistributionChart',
  './dataProcessing': './utils/dataProcessing',
  './filterTypes': './utils/filterTypes',
  './statisticalAnalysis': './utils/statisticalAnalysis',
  './App.css': './App.css',
  './data': './data',
  './main': './main',
};

// Directory to scan
const srcDir = path.join(__dirname, 'src');

// Recursively update imports in .jsx and .js files
const updateImports = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const ext = path.extname(fullPath);

    // If it's a directory, recursively process
    if (fs.statSync(fullPath).isDirectory()) {
      updateImports(fullPath);
    } else if (ext === '.js' || ext === '.jsx') {
      // Process .js or .jsx files
      let content = fs.readFileSync(fullPath, 'utf-8');
      let updated = false;

      // Replace old paths with new paths
      for (const [oldPath, newPath] of Object.entries(pathMappings)) {
        if (content.includes(oldPath)) {
          content = content.replace(new RegExp(oldPath, 'g'), newPath);
          updated = true;
        }
      }

      // Write back only if changes were made
      if (updated) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Updated imports in: ${fullPath}`);
      }
    }
  });
};

// Run the script
updateImports(srcDir);
console.log('All imports updated!');
