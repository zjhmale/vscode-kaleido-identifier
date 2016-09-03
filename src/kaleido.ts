import * as vscode from 'vscode';
import * as encode from './encode';
import * as color from './color';

// http://blog.ostermiller.org/find-comment
export let singleQuote = "'\\w*'";
export let doubleQuote = "\".*\"";

export let hsStyleLineComment = "-[-]+.*";
export let hsStyleMultiComment = "{-(.|[\\r\\n]|)*-}";

export let lispStyleComment = ";[;]+.*";
export let mlStyleComment = "\\(\\*(.|[\\r\\n]|)*\\*\\)";

export let cStyleLineComment = "\\/[-\\/]+.*";
export let cStyleMultiComment = "\\/\\*([^*]|[\\r\\n]|(\\*+([^*/]|[\\r\\n])))*\\*\\/";

let ignoreRegexStr = [
    singleQuote,
    doubleQuote,
    hsStyleLineComment,
    hsStyleMultiComment,
    lispStyleComment,
    mlStyleComment,
    cStyleLineComment,
    cStyleMultiComment
].join("|");

let ignoreRegex = new RegExp(ignoreRegexStr, "g");
var ignoreMatch;

let identRegex = /[a-zA-Z0-9_][a-zA-Z0-9_-]*/g;
var identMatch;

export function kaleido(editor: vscode.TextEditor) {
    if (!editor) {
        return;
    }
    var decorationCache = {};
    var ignoreCache = [];

    for (var c in color.kaleidoDecoTypes) {
        decorationCache[c] = [];
    }

    var text = editor.document.getText();
    while (ignoreMatch = ignoreRegex.exec(text)) {
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
        let s = identMatch.index;
        let e = identMatch.index + ident.length;
                
        let startPos = editor.document.positionAt(s);
        let endPos = editor.document.positionAt(e);
        let decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: null };
        let idx = encode.kaleidoIdentifierHash(ident) % color.kaleidoDecoTypes.length
        decorationCache[idx].push(decoration);
    }

    for (var index in color.kaleidoDecoTypes) {
        editor.setDecorations(color.kaleidoDecoTypes[index], decorationCache[index]);
    }
}