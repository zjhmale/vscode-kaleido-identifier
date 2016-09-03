'use strict';

import * as vscode from 'vscode';
import * as kaleido from './kaleido';

export function activate(context: vscode.ExtensionContext) {
    let runKaleido = (editor) => {
        if (editor) kaleido.kaleido(editor);
    };
    
    var _editor = vscode.window.activeTextEditor;
    runKaleido(_editor);

    vscode.window.onDidChangeActiveTextEditor((editor) => {
        _editor = editor
        runKaleido(_editor);
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument((event) => {
        if (_editor && event.document === _editor.document) kaleido.kaleido(_editor);
    }, null, context.subscriptions);
}

export function deactivate() {
}