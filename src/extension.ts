// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
'use strict';

import vscode = require('vscode');

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerTextEditorCommand('robot2pythonkeyword.search', (textEditor) => {
		textEditor.edit(async (editBuilder) => {
			const range = textEditor.selection;
			const keyword = textEditor.document.getText(range);
			var prange = new vscode.Selection(range.start, new vscode.Position(range.end.line, range.end.character + 4));
			const pkeyword = 'def ' + keyword.toLowerCase().replace(/ /g, "_");
			await textEditor.edit(function (editBuilder) {
				editBuilder.replace(range, pkeyword);
			});
			textEditor.selection = prange;
			const curTextEditor = vscode.window.activeTextEditor;
			await vscode.commands.executeCommand("workbench.action.findInFiles");
			if (curTextEditor) {
				await vscode.window.showTextDocument(curTextEditor.document);
				await vscode.commands.executeCommand("undo");
			}
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
//exports.activate = activate;
export function deactivate() {}
