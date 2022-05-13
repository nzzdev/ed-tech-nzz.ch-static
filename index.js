const fs = require('fs');
const path = require('path');

let html = '';

/**
 *
 * @param {{
 *   layout: "regular" | "longform-standard" | "longform-visual",
 *   author: string,
 *   title: string,
 *   lead: string,
 *   content: string
 * }} options
 * @returns
 */
function getHtml(options = {}) {
    const {
        layout,
        author,
        title,
        lead,
        content,
        builtCssFilename,
        builtJsFilename,
        customJsLinks,
    } = options;

    // Load the layout base.
    html = fs.readFileSync(path.resolve(__dirname, `src/${layout}/index.html`), 'utf8');

    setCss(options);

    html = html.replaceAll('${AUTHOR}', author || 'Author');
    html = html.replace('${LEAD}', lead || 'Lead');
    html = html.replace('${CONTENT}', content || '');
    html = html.replaceAll('${TITLE}', title || 'Title');

    html = html.replace('${BUILT_CSS_FILE}', builtCssFilename);
    html = html.replace('${BUILT_JS_FILE}', builtJsFilename);

    replaceExternalCustomJsLinks(customJsLinks);


    return html;
}

function setCss(options) {
    const layout = options.layout;

    // Set the fonts.
    const nzzFonts = fs.readFileSync(path.resolve(__dirname, 'src/nzz.ch-fonts.css'), 'utf8');
    html = html.replace('${NZZ_FONTS}', nzzFonts);

    // Set the css in the HTML.
    let nzzCSS = fs.readFileSync(path.resolve(__dirname, `src/${layout}/style.css`), 'utf8');
    html = html.replace('${NZZ_CSS}', nzzCSS);

    // Set custom css we defined in this library to override some styles.
    const customCSS = fs.readFileSync(path.resolve(__dirname, 'src/nzz.ch-custom.css'), 'utf8');
    html = html.replace('${CUSTOM_CSS}', customCSS);

    replaceExternalCustomCssLinks(options.customCssLinks);

    html = html.replace('${EXTERNAL_CUSTOM_RAW_CSS}', options.customCssRaw || '');
}

function replaceExternalCustomCssLinks(links = []) {
    let str = '';

    for (let i = 0; i < links.length; i++) {
        const link = links[i];

        str += `<link rel="stylesheet" type="text/css" href="${link}">`;
    }

    html = html.replace('${EXTERNAL_CUSTOM_CSS_LINKS}', str);
}

function replaceExternalCustomJsLinks(links = []) {
    let str = '';

    for (let i = 0; i < links.length; i++) {
        const link = links[i];

        str += `<script src="${link}"></script>`;
    }

    html = html.replace('${CUSTOM_JS_LINKS}', str);
}

function createQElement(id, fullWidth = false) {
    let fwClass = 'widget--fullwidth';
    if (fullWidth === false) fwClass = '';

    return `
        <div id="${id}" class="articlecomponent q-embed widget--qembed ${fwClass}"></div>
    `;
}

function createFullwidthQElement(id) {
    return createQElement(id, true);
}

function createContentWidthQElement(id) {
    return createQElement(id, false);
}

function createSubtitle(content = '') {
    return `
        <h2 class="subtitle articlecomponent">
            <span>${content}</span>
        </h2>
    `;
}

function createParagraph(content = '') {
    return `
        <p class="articlecomponent text">${content}</p>
    `;
}

module.exports = {
    getHtml,
    createFullwidthQElement,
    createContentWidthQElement,
    createSubtitle,
    createParagraph,
}
