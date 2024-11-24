const fs = require('fs');
const path = require('path');

// Function to recursively read all files in a directory
const getAllFiles = (dir, files = []) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  });
  return files;
};

// Function to search for "react-refresh" in files
const searchForReactRefresh = (dir) => {
  const allFiles = getAllFiles(dir);
  const targetString = 'react-refresh';
  const results = [];

  allFiles.forEach(file => {
    const fileContent = fs.readFileSync(file, 'utf-8');
    const lines = fileContent.split('\n');

    lines.forEach((line, index) => {
      if (line.includes(targetString)) {
        results.push({
          file,
          lineNumber: index + 1,
          content: line.trim(),
        });
      }
    });
  });

  return results;
};

// Main execution
const projectRoot = path.resolve(__dirname, './src');
console.log(`🔍 Searching for "react-refresh" in project: ${projectRoot}`);

const results = searchForReactRefresh(projectRoot);

if (results.length > 0) {
  console.log('🚨 Found "react-refresh" references:');
  results.forEach(result => {
    console.log(`- File: ${result.file}`);
    console.log(`  Line ${result.lineNumber}: ${result.content}`);
  });
} else {
  console.log('✅ No references to "react-refresh" found.');
}
