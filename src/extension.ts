'use strict';

import * as vscode from 'vscode';
import * as rainbow from './rainbow';

export function activate(context: vscode.ExtensionContext) {
    let runRainbow = (editor) => {
        if (editor) rainbow.rainbow(editor);
    };
    
    var _editor = vscode.window.activeTextEditor;
    runRainbow(_editor);

    vscode.window.onDidChangeActiveTextEditor((editor) => {
        _editor = editor
        runRainbow(_editor);
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument((event) => {
        if (_editor && event.document === _editor.document) rainbow.rainbow(_editor);
    }, null, context.subscriptions);
}

export function deactivate() {
}