const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2] || 'gsc-pages.csv';

function parseCsvLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

function normalizeHeader(header) {
  return header.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function toNumber(value) {
  if (!value) return 0;
  return Number(String(value).replace('%', '').replace(/,/g, '').trim()) || 0;
}

function loadRows(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Missing ${filePath}. Export Pages data from Google Search Console as CSV and rerun: node gsc_prioritize.js ${filePath}`);
    process.exit(1);
  }

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/).filter(Boolean);
  const headers = parseCsvLine(lines[0]).map(normalizeHeader);

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    return {
      page: row.page || row.pages || row.url || row.landingpage || '',
      clicks: toNumber(row.clicks),
      impressions: toNumber(row.impressions),
      ctr: toNumber(row.ctr),
      position: toNumber(row.position || row.avgposition || row.averageposition),
    };
  }).filter((row) => row.page);
}

const rows = loadRows(path.join(process.cwd(), inputFile));

const lowCtr = rows
  .filter((row) => row.impressions >= 100 && row.ctr < 2)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 30);

const strikingDistance = rows
  .filter((row) => row.position >= 8 && row.position <= 20)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 30);

const zeroClick = rows
  .filter((row) => row.impressions >= 50 && row.clicks === 0)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 30);

function printSection(title, items) {
  console.log(`\n## ${title}`);
  if (!items.length) {
    console.log('No matching pages found.');
    return;
  }
  items.forEach((row, index) => {
    console.log(`${index + 1}. ${row.page} | clicks=${row.clicks} impressions=${row.impressions} ctr=${row.ctr}% position=${row.position}`);
  });
}

printSection('High Impressions, Low CTR - rewrite title/meta first', lowCtr);
printSection('Average Position 8-20 - add content depth/internal links', strikingDistance);
printSection('Zero Click Pages - check intent, title, indexability', zeroClick);
