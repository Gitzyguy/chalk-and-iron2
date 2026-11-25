#!/usr/bin/env node
/* Builds eatout.json (the app's Eating out guide) from the Eat Out Macro Guide Sheet.
   Inputs are readCells results from the Claude Docs connector, saved as JSON files:
     Items A1:Q<last>, Meals A1:M<last>, Restaurants A1:F<last>, and optionally How it works A11:E13.
   Usage: node tools/build-eatout.js items.json meals.json restaurants.json [howitworks.json] > eatout.json
   Plain Node, no dependencies. */
'use strict';
const fs = require('fs');

function rowsOf(file) {
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  const v = j.value || j;                       // a whole tool result, or just its value
  if (!v.rows) throw new Error(file + ': no rows (expected a readCells result)');
  return {rev: v.revision, rows: Object.keys(v.rows).map(Number).sort((a, b) => a - b).map(k => v.rows[k])};
}
const val = c => (c && typeof c === 'object' && 'value' in c) ? c.value : c;          // formula cells
const str = c => { const v = val(c); return v == null ? '' : typeof v === 'object' ? (v.date || v.dateTime || v.markdown || '') : String(v).trim(); };
const num = c => { const v = val(c); const n = typeof v === 'object' && v ? v.number : v; return n === '' || n == null ? null : Number(n); };

const [itemsF, mealsF, restF, howF] = process.argv.slice(2);
if (!restF) { console.error('Usage: node tools/build-eatout.js items.json meals.json restaurants.json [howitworks.json]'); process.exit(2); }
const I = rowsOf(itemsF), M = rowsOf(mealsF), R = rowsOf(restF);

let targets = {protein: 200, fat: 65};
if (howF) {
  for (const r of rowsOf(howF).rows) if (str(r[0]) === 'Training day') targets = {protein: num(r[2]), fat: num(r[4])};
}

const out = {
  schema: 1,
  updated: new Date().toISOString().slice(0, 10),
  sheetRevision: Math.max(I.rev || 0, M.rev || 0, R.rev || 0),
  targets,
  restaurants: R.rows.slice(1).filter(r => str(r[0])).map(r => ({
    name: str(r[0]), type: str(r[1]), data: str(r[2]), avoid: str(r[3]), tip: str(r[4]), source: str(r[5])})),
  items: I.rows.slice(1).filter(r => str(r[0])).map(r => ({
    type: str(r[0]), restaurant: str(r[1]), item: str(r[2]), order: str(r[3]),
    kcal: num(r[4]), p: num(r[5]), f: num(r[6]), c: num(r[7]),
    data: str(r[10]), source: str(r[11]), notes: str(r[12]),
    checked: str(r[13]) || null, verified: str(r[14]) || 'No', sauce: str(r[15]) || 'Not stated'})),
  meals: M.rows.slice(1).filter(r => str(r[0])).map(r => ({
    restaurant: str(r[0]), rank: str(r[1]), order: str(r[3]),
    kcal: num(r[4]), p: num(r[5]), f: num(r[6]), c: num(r[7]),
    data: str(r[10]), notes: str(r[11])}))
};
process.stdout.write(JSON.stringify(out, null, 1) + '\n');
