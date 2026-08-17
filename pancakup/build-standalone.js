/**
 * Génère « pancakup-standalone.html » : le site entier (HTML + CSS + JS)
 * dans un seul fichier, à ouvrir d'un double-clic ou à déposer sur n'importe
 * quel hébergeur.
 *
 * Usage :  node build-standalone.js
 *
 * Les sources restent index.html + assets/ : modifie-les, puis relance cette
 * commande pour régénérer le fichier unique.
 */
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const css  = fs.readFileSync(path.join(dir, 'assets/css/style.css'), 'utf8');
const js   = fs.readFileSync(path.join(dir, 'assets/js/app.js'), 'utf8');

// Les remplacements passent par une fonction : le code contient des « $ »
// ($, $$) que String.replace interpréterait comme des références de capture.
let out = html
  .replace('<link rel="stylesheet" href="assets/css/style.css">',
           () => '<style>\n' + css + '\n</style>')
  .replace('<script src="assets/js/app.js"></script>',
           () => '<script>\n' + js + '\n</script>');

if (out.includes('assets/css/style.css') || out.includes('assets/js/app.js')) {
  console.error('Échec : les balises de style/script n\'ont pas été remplacées.');
  process.exit(1);
}

const target = path.join(dir, 'pancakup-standalone.html');
fs.writeFileSync(target, out);
console.log('Écrit : ' + target + '  (' + Math.round(out.length / 1024) + ' Ko)');
