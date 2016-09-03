'use strict';

import * as vscode from 'vscode';
import * as rainbow from './rainbow';

export function activate(context: vscode.ExtensionContext) {
    let runRainbow = (editor) => {
        rainbow.rainbow(editor);
    };
    
    let editor = vscode.window.activeTextEditor;
    runRainbow(editor);

    vscode.window.onDidChangeActiveTextEditor((editor) => {
        runRainbow(editor);
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument((event) => {
        if (editor && event.document === editor.document) {
            rainbow.rainbow(editor);
        }
    }, null, context.subscriptions);
}

export function deactivate() {
}