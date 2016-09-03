import * as vscode from 'vscode';
import * as encode from './encode';
import * as color from './color';

export function rainbow(editor: vscode.TextEditor) {
    if (!editor) {
        return;
    }
    let text = editor.document.getText();
    let regex = /[a-zA-Z_][a-zA-Z0-9_-]*/g;
    var match;
    while (match = regex.exec(text)) {
        let value = match[0];
        let startPos = editor.document.positionAt(match.index);
        let endPos = editor.document.positionAt(match.index + value.length);
        let decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: null };
        let c = color.getAttributesColor(encode.rainbowIdentifierHash(value));
        editor.setDecorations(c, [decoration]);
    }
}