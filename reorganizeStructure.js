const fs = require("fs");
const path = require("path");

const baseDir = process.cwd();

const targetStructure = {
  public: ["favicon.ico", "index.html", "manifest.json"],
  src: {
    components: {
      dashboard: ["FilterBar.jsx", "TimeDistributionChart.jsx"],
      shared: [], // Placeholder for reusable components
    },
    utils: ["dataProcessing.js", "filterTypes.js", "statisticalAnalysis.js"],
    root: ["App.jsx", "App.css", "index.css", "main.jsx", "data.js"],
  },
};

// Helper to create directories recursively
const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created folder: ${dirPath}`);
  }
};

// Helper to find a file recursively within the project
const findFile = (fileName, dir = baseDir) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      const found = findFile(fileName, filePath);
      if (found) return found;
    } else if (file.name === fileName) {
      return filePath;
    }
  }
  return null;
};

// Helper to move files, searching recursively if needed
const moveFile = (fileName, dest) => {
  const src = findFile(fileName);
  if (src) {
    createDir(path.dirname(dest)); // Ensure destination directory exists
    fs.renameSync(src, dest);
    console.log(`✅ Moved: ${src} → ${dest}`);
  } else {
    console.log(`❌ File not found: ${fileName}`);
  }
};

// Clean up project structure
const organizeProject = () => {
  console.log("📂 Starting project reorganization...");

  // Ensure `public` folder structure
  createDir(path.join(baseDir, "public"));
  targetStructure.public.forEach((file) => {
    moveFile(file, path.join(baseDir, "public", file));
  });

  // Ensure `src` folder structure
  Object.entries(targetStructure.src).forEach(([folder, contents]) => {
    const folderPath = path.join(baseDir, "src", folder);
    createDir(folderPath);

    if (Array.isArray(contents)) {
      // Handle root files (e.g., App.jsx)
      contents.forEach((file) => {
        moveFile(file, path.join(folderPath, file));
      });
    } else if (typeof contents === "object") {
      // Handle nested folders (e.g., components/dashboard)
      Object.entries(contents).forEach(([subFolder, files]) => {
        const subFolderPath = path.join(folderPath, subFolder);
        createDir(subFolderPath);

        files.forEach((file) => {
          moveFile(file, path.join(subFolderPath, file));
        });
      });
    }
  });

  console.log("🎉 Project reorganization complete!");
};

// Run the reorganization
organizeProject();
