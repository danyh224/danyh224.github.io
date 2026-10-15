const fs = require('fs');
const path = require('path');
const vm = require('vm');
const cheerio = require('cheerio');

// staticify.js
// Reads js/config.js (which defines `const CONFIG = { ... }`), applies values to index.html
// and writes a static HTML file to dist/index.static.html

const repoRoot = process.cwd();
const cfgPath = path.join(repoRoot, 'js', 'config.js');
const srcHtmlPath = path.join(repoRoot, 'index.html');
const outPath = path.join(repoRoot, 'dist', 'index.static.html');

if (!fs.existsSync(cfgPath)) {
  console.error('js/config.js not found — cannot staticify.');
  process.exit(1);
}
if (!fs.existsSync(srcHtmlPath)) {
  console.error('index.html not found in repo root — cannot staticify.');
  process.exit(1);
}

const cfgCode = fs.readFileSync(cfgPath, 'utf8');
const sandbox = {};
vm.createContext(sandbox);
try {
  // Run the config in the sandbox so CONFIG becomes available
  vm.runInContext(cfgCode + '\n;CONFIG', sandbox, { filename: 'js/config.js' });
} catch (err) {
  console.error('Error evaluating js/config.js:', err);
  process.exit(1);
}

const CONFIG = sandbox.CONFIG;
if (!CONFIG) {
  console.error('CONFIG not found after evaluating js/config.js');
  process.exit(1);
}

const htmlSrc = fs.readFileSync(srcHtmlPath, 'utf8');
const $ = cheerio.load(htmlSrc, { decodeEntities: false });

// Helper: set CSS custom properties on <html>
function setCssVars(vars) {
  const html = $('html');
  const existing = html.attr('style') || '';
  const parts = existing ? [existing.replace(/;?\s*$/, '')] : [];
  for (const k in vars) {
    if (vars[k] !== undefined && vars[k] !== null) parts.push(`${k}: ${vars[k]}`);
  }
  html.attr('style', parts.join('; ') + ';');
}

// Apply simple fields
$('#entry-symbol').text(CONFIG.entrySymbol || '');
$('#name-text').text(CONFIG.profileName || '');
$('#name-tooltip').text(CONFIG.nameTooltip || '');
$('#profile-status').text(CONFIG.statusText || '');

// Badges
const badges = CONFIG.badges || [];
const $badges = $('#badges');
$badges.empty();
for (const b of badges) {
  const item = `<div class="badge-item"><span class="badge-tooltip">${(b.label||'')}</span><img src="${(b.icon||'')}" alt="${(b.label||'')}"></div>`;
  $badges.append(item);
}

// Avatar + decoration
if (CONFIG.avatar) $('#avatar').attr('src', CONFIG.avatar);
if (CONFIG.avatarDecoration) {
  $('#avatar-decoration').attr('src', CONFIG.avatarDecoration);
} else {
  $('#avatar-decoration').attr('style', 'display:none');
}

// Background video
if (CONFIG.backgroundVideo) $('#bg-video-source').attr('src', CONFIG.backgroundVideo);

// Social links
const social = CONFIG.socialLinks || [];
const $social = $('#social-links');
$social.empty();
for (const s of social) {
  const a = `<a href="${s.url}" target="_blank" rel="noopener noreferrer" title="${s.name}"><img class="social-icon" src="${s.icon}" alt="${s.name}"></a>`;
  $social.append(a);
}

// Discord presence
$('#discord-username').text(CONFIG.discordUsername || '');
$('#discord-activity').text(CONFIG.discordStatus || '');
if (CONFIG.discordAvatar) $('#discord-avatar').attr('src', CONFIG.discordAvatar);

const statusIconMap = {
  online:  'assets/icons/status/online.png',
  idle:    'assets/icons/status/inactive.png',
  dnd:     'assets/icons/status/busy.png',
  offline: 'assets/icons/status/offline.png',
};
$('#discord-status-icon').attr('src', statusIconMap[CONFIG.discordPresenceStatus] || statusIconMap.offline);

// Set CSS variables (mapped from known CONFIG keys)
const cssVars = {
  '--badge-size': CONFIG.badgeSize,
  '--badge-container-bg': CONFIG.badgeContainerBackground,
  '--badge-container-border': CONFIG.badgeContainerBorder,
  '--avatar-size': CONFIG.avatarSize,
  '--card-max-width': CONFIG.cardMaxWidth,
  '--card-border-radius': CONFIG.cardBorderRadius,
  '--card-background': CONFIG.cardBackground,
  '--card-border': CONFIG.cardBorder,
  '--card-tilt-perspective': CONFIG.cardTiltPerspective,
  '--username-glow': CONFIG.usernameGlow,
  '--discord-box-background': CONFIG.discordBoxBackground,
  '--discord-box-radius': CONFIG.discordBoxRadius,
  '--discord-box-border': CONFIG.discordBoxBorder,
  '--discord-avatar-size': CONFIG.discordAvatarSize,
  '--discord-avatar-border': CONFIG.discordAvatarBorder,
  '--icon-size': CONFIG.iconSize,
  '--icon-border-radius': CONFIG.iconBorderRadius,
  '--icon-glow-color': CONFIG.iconGlowColor
};
setCssVars(cssVars);

// Write output
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, $.html(), 'utf8');
console.log('Wrote static HTML to', outPath);
