const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Helper to log and execute commands
const runCommand = (command, successMessage) => {
  console.log(`> Running: ${command}`);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return;
    }
    console.log(stdout || successMessage);
    if (stderr) console.error(`⚠️ Warnings: ${stderr}`);
  });
};

// 1. Update package.json
const updatePackageJSON = () => {
  const packageJSONPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJSONPath)) {
    console.error('❌ package.json not found in the current directory.');
    return;
  }

  console.log('📦 Updating package.json...');
  const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf-8'));

  // Remove vite dependency
  if (packageJSON.devDependencies?.vite || packageJSON.dependencies?.vite) {
    delete packageJSON.devDependencies?.vite;
    delete packageJSON.dependencies?.vite;
    console.log('✅ Removed Vite from dependencies.');
  }

  // Replace vite-specific scripts
  packageJSON.scripts = {
    ...packageJSON.scripts,
    start: 'react-scripts start',
    build: 'react-scripts build',
    test: 'react-scripts test',
    eject: 'react-scripts eject',
  };
  console.log('✅ Updated scripts for React.');

  // Save the updated package.json
  fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));
  console.log('📦 package.json updated successfully.');
};

// 2. Install react-scripts
const installReactScripts = () => {
  console.log('📦 Installing react-scripts...');
  runCommand('npm install react-scripts --save', '✅ react-scripts installed.');
};

// 3. Remove Vite-specific files
const removeViteFiles = () => {
  const viteConfigPath = path.join(process.cwd(), 'vite.config.js');
  if (fs.existsSync(viteConfigPath)) {
    fs.unlinkSync(viteConfigPath);
    console.log('🗑️ Removed vite.config.js.');
  } else {
    console.log('⚠️ vite.config.js not found (already removed).');
  }
};

// 4. Final Automation
const automateMigration = () => {
  console.log('🚀 Starting migration from Vite to React...');
  updatePackageJSON();
  installReactScripts();
  removeViteFiles();
  console.log('🎉 Migration completed! Run `npm start` to start your project.');
};

// Run the automation
automateMigration();
