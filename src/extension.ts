'use strict';

import * as vscode from 'vscode';
import * as rainbow from './rainbow';

export function activate(context: vscode.ExtensionContext) {
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        rainbow.rainbow(editor);
    }
    vscode.window.onDidChangeActiveTextEditor(function (editor) {
        if (editor) {
            rainbow.rainbow(editor);
        }
    }, null, context.subscriptions);
    vscode.workspace.onDidChangeTextDocument(function (event) {
        if (editor && event.document === editor.document) {
            rainbow.rainbow(editor);
        }
    }, null, context.subscriptions);
}

export function deactivate() {
}