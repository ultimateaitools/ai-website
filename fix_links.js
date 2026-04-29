const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Fix regular string hrefs: href="/about" -> href="/about/"
            // Match href="/...", ignore if it ends with / or has an extension like .jpg or is just /
            content = content.replace(/href="(\/[^"]+)"/g, (match, p1) => {
                if (p1.endsWith('/') || /\.[a-z0-9]+$/i.test(p1)) {
                    return match;
                }
                return `href="${p1}/"`;
            });

            // Fix template literal hrefs: href={`/tools/${tool.slug}`} -> href={`/tools/${tool.slug}/`}
            content = content.replace(/href=\{`(\/[^`]+)`\}/g, (match, p1) => {
                if (p1.endsWith('/') || /\.[a-z0-9]+$/i.test(p1) || p1.includes('?')) {
                    return match;
                }
                return `href={\`${p1}/\`}`;
            });

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated links in ${fullPath}`);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
