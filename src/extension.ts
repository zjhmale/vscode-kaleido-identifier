'use strict';

import * as vscode from 'vscode';
import * as encode from './encode';
import * as color from './color';

export function activate(context: vscode.ExtensionContext) {
    console.log("color => " + JSON.stringify(color.getAttributesColor(encode.rainbowIdentifierHash("cleantha"))));
}

export function deactivate() {
}