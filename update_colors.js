
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'app');

function updateColorsInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Light to Dark replacements
    let newContent = content
        .replace(/text-gray-900/g, 'text-foreground')
        .replace(/text-gray-800/g, 'text-gray-200')
        .replace(/text-gray-700/g, 'text-gray-300')
        .replace(/text-gray-600/g, 'text-gray-400')
        .replace(/text-gray-500/g, 'text-gray-500')
        .replace(/bg-gray-50/g, 'bg-surface-hover')
        .replace(/bg-gray-100/g, 'bg-surface-border')
        .replace(/bg-gray-200/g, 'bg-surface-border')
        .replace(/border-gray-100/g, 'border-surface-border')
        .replace(/border-gray-200/g, 'border-surface-border')
        .replace(/bg-white/g, 'bg-surface-card');

    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            updateColorsInFile(fullPath);
        }
    }
}

processDirectory(directoryPath);
console.log('Done replacing colors.');
