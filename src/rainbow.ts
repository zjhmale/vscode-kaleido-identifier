import * as vscode from 'vscode';
import * as encode from './encode';
import * as color from './color';

let regex = /[a-zA-Z0-9_][a-zA-Z0-9_-]*/g;
var match;

export function rainbow(editor: vscode.TextEditor) {
    if (!editor) {
        return;
    }
    var decorationCache = {};

    for (var c in color.kaleidoDecoTypes) {
        decorationCache[c] = [];
    }

    let text = editor.document.getText();
    while (match = regex.exec(text)) {
        let value = match[0];
        let startPos = editor.document.positionAt(match.index);
        let endPos = editor.document.positionAt(match.index + value.length);
        let decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: null };
        let idx = encode.rainbowIdentifierHash(value) % color.kaleidoDecoTypes.length
        decorationCache[idx].push(decoration);
    }

    for (var index in color.kaleidoDecoTypes) {
        editor.setDecorations(color.kaleidoDecoTypes[index], decorationCache[index]);
    }
}