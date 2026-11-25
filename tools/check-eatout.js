#!/usr/bin/env node
/* Checks eatout.json before it is published. Exits 1 and lists every problem if any check fails.
   Usage: node tools/check-eatout.js [eatout.json]
   Plain Node, no dependencies. */
'use strict';
const fs = require('fs');
const file = process.argv[2] || 'eatout.json';
const raw = fs.readFileSync(file, 'utf8');
const d = JSON.parse(raw);
const TYPES = ['Breakfast', 'Mexican', 'Bowls', 'Chicken', 'Burgers & sandwiches', 'Salads', 'Asian', 'Grill plates', 'Sides, add-ons & drinks'];
const LABELS = ['Official', 'Third-party', 'Estimate', 'Mixed'];
const SAUCE = ['Yes', 'No', 'None', 'Not stated'];
const bad = [];
const isNum = v => typeof v === 'number' && isFinite(v) && v >= 0;

if (d.schema !== 1) bad.push('schema must be 1');
if (!/^\d{4}-\d{2}-\d{2}$/.test(d.updated || '')) bad.push('updated must be YYYY-MM-DD');
if (!d.targets || !isNum(d.targets.protein) || !isNum(d.targets.fat)) bad.push('targets.protein and targets.fat must be numbers');
for (const k of ['restaurants', 'items', 'meals']) if (!Array.isArray(d[k]) || !d[k].length) bad.push(k + ' must be a non-empty list');
if (/[\u2013\u2014]/.test(raw)) bad.push('contains an en or em dash');

const names = new Set((d.restaurants || []).map(r => r.name));
(d.restaurants || []).forEach((r, i) => {
  if (!r.name) bad.push(`restaurant ${i + 1}: no name`);
  if (!['Usual', 'Fast food'].includes(r.type)) bad.push(`${r.name}: type "${r.type}"`);
  if (!/^https:\/\//.test(r.source || '')) bad.push(`${r.name}: source must be an https link`);
});
const macros = (x, where) => {
  for (const k of ['kcal', 'p', 'f', 'c']) if (!isNum(x[k])) bad.push(`${where}: ${k} is not a number`);
  if (isNum(x.kcal) && isNum(x.p) && isNum(x.f) && isNum(x.c) && x.kcal > 0) {
    const calc = 4 * x.p + 4 * x.c + 9 * x.f, off = Math.abs(calc - x.kcal);
    if (off > 40 && off > 0.12 * x.kcal && !/4P\+4C\+9F/.test(x.notes || '')) bad.push(`${where}: ${x.kcal} kcal but macros give ${Math.round(calc)}`);
  }
};
(d.items || []).forEach((x, i) => {
  const w = `item ${i + 2} (${x.restaurant} | ${x.item})`;
  if (!x.item) bad.push(`${w}: no name`);
  if (!names.has(x.restaurant)) bad.push(`${w}: restaurant not in restaurants`);
  if (!TYPES.includes(x.type)) bad.push(`${w}: meal type "${x.type}"`);
  if (!LABELS.includes(x.data)) bad.push(`${w}: data label "${x.data}"`);
  if (!SAUCE.includes(x.sauce)) bad.push(`${w}: sauce "${x.sauce}"`);
  if (!['Yes', 'No'].includes(x.verified)) bad.push(`${w}: verified "${x.verified}"`);
  if (x.checked != null && !/^\d{4}-\d{2}-\d{2}$/.test(x.checked)) bad.push(`${w}: checked "${x.checked}"`);
  if (!/^https:\/\//.test(x.source || '')) bad.push(`${w}: source must be an https link`);
  macros(x, w);
});
(d.meals || []).forEach((x, i) => {
  const w = `meal ${i + 2} (${x.restaurant})`;
  if (!names.has(x.restaurant)) bad.push(`${w}: restaurant not in restaurants`);
  if (!x.order) bad.push(`${w}: no order text`);
  macros(x, w);
});

if (bad.length) { console.error(bad.length + ' problem(s) in ' + file + ':\n- ' + bad.join('\n- ')); process.exit(1); }
console.log(`OK: ${d.items.length} items, ${d.meals.length} meals, ${d.restaurants.length} restaurants, updated ${d.updated}, sheet revision ${d.sheetRevision}`);
