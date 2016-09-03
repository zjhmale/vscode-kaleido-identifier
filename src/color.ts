import * as vscode from 'vscode';

let DARK_COMMON_COLORS = [
    "#72D572",
    "#C5E1A5",
    "#E6EE9C",
    "#FFF59D",
    "#FFE082",
    "#FFCC80",
    "#FFAB91",
    "#BCAAA4",
    "#B0BEC5",
    "#FFA726",
    "#FF8A65",
    "#F9BDBB",
    "#F8BBD0",
    "#E1BEE7",
    "#D1C4E9",
    "#FFE0B2",
    "#C5CAE9",
    "#D0D9FF",
    "#B3E5FC",
    "#B2EBF2",
    "#B2DFDB",
    "#A3E9A4",
    "#DCEDC8",
    "#F0F4C3",
    "#FFB74D"
]

export function getAttributesColor(selector: number): vscode.TextEditorDecorationType {
    return vscode.window.createTextEditorDecorationType({
        color: DARK_COMMON_COLORS[selector % DARK_COMMON_COLORS.length]
    });
}