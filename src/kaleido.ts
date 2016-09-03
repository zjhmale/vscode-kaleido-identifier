import * as vscode from 'vscode';
import * as encode from './encode';
import * as color from './color';

// http://blog.ostermiller.org/find-comment
export let singleQuote = "'.*'";
export let doubleQuote = "\".*\"";

export let hsStyleLineComment = "-[-]+.*";
export let hsStyleMultiComment = "{-(.|[\\r\\n]|)*-}";

export let lispStyleComment = ";[;]+.*";
export let mlStyleComment = "\\(\\*(.|[\\r\\n]|)*\\*\\)";

export let cStyleLineComment = "\\/[-\\/]+.*";
export let cStyleMultiComment = "\\/\\*([^*]|[\\r\\n]|(\\*+([^*/]|[\\r\\n])))*\\*\\/";

let ignoreRegexs = [
    doubleQuote,
    hsStyleLineComment,
    hsStyleMultiComment,
    lispStyleComment,
    mlStyleComment,
    cStyleLineComment,
    cStyleMultiComment
];

let ignoreRegex = new RegExp(ignoreRegexs.join("|"), "g");
let ignoreRegexSQ = new RegExp([singleQuote].concat(ignoreRegexs).join("|"), "g");
var ignoreMatch;

let identRegex = /[a-zA-Z0-9_][a-zA-Z0-9_-]*/g;
var identMatch;

let jsLangs = ["typescript", "json", "javascript", "coffeescript"];

export function kaleido(editor: vscode.TextEditor) {
    if (!editor) {
        return;
    }
    var decorationCache = {};
    var ignoreCache = [];

    for (var c in color.kaleidoDecoTypes) {
        decorationCache[c] = [];
    };

    var text = editor.document.getText();

    let regex = jsLangs.indexOf(editor.document.languageId) > -1 ? ignoreRegexSQ : ignoreRegex;

    while (ignoreMatch = regex.exec(text)) {
        let ignore = ignoreMatch[0];
        let start = ignoreMatch.index;
        let end = start + ignore.length;
        ignoreCache.push({ start, end });
    }

    ignoreCache.forEach(ignore => {
        text = text.slice(0, ignore.start) + " ".repeat(ignore.end - ignore.start) + text.slice(ignore.end, text.length - 1)
    });

    while (identMatch = identRegex.exec(text)) {
        let ident = identMatch[0];
                
        let startPos = editor.document.positionAt(identMatch.index);
        let endPos = editor.document.positionAt(identMatch.index + ident.length);
        let decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: null };
        let idx = encode.kaleidoIdentifierHash(ident) % color.kaleidoDecoTypes.length
        decorationCache[idx].push(decoration);
    }

    for (var index in color.kaleidoDecoTypes) {
        editor.setDecorations(color.kaleidoDecoTypes[index], decorationCache[index]);
    }

    return;
}