// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require("fs");
const path = require("path");

let doIT;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

			// On Acivate, add 'doIT' status bar button
			doIT = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 2);
			doIT.text = 'doIT';
			doIT.command = `extension.CodeGen`;
			doIT.tooltip = 'doIT on current file';
			doIT.show();

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "CodeGen" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.CodeGen', function () {
		  if (!vscode.workspace) {
			return vscode.window.showErrorMessage(
			  "Please open a project folder first"
			);
		  }

		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('This is a notification from CodeGen!');



  
		const folderPath = vscode.workspace.workspaceFolders[0].uri.toString().split(":")[1];
  
		const htmlContent = `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8" />
	  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
	  <title>Document</title>
	  <link rel="stylesheet" href="app.css" />
  </head>
  <body>
	  <script src="app.js"></script>
  </body>
  </html>
		  `;
  
		fs.writeFile(path.join(folderPath, "index.html"), htmlContent, err => {
		  if (err) {
			return console.log(err);
		  }
		});
	

// vscode.window.showWarningMessage("Created base files!");
	vscode.window.setStatusBarMessage('Completed', 5000);

// end of code for running this function
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
