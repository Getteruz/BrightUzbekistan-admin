export function _convertHtmlToPlainText(clipboardHtml) {
    return '<p>' + clipboardHtml.replace(/<br>/gi, "\n").replace(/<(?:.|\s)*?>/g, '') + '</p>';
}