// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
let iCG;
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

			// On Activation, add status bar button to call function - sets up the Webview Panel
			iCG = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 2);
			iCG.text = '$(rocket) CodeGen';
			iCG.command = `extension.CodeGen`;
			iCG.tooltip = 'Open CodeGen tab';
			iCG.show();

	let disposable = vscode.commands.registerCommand('extension.CodeGen', function () {

		// The code you place here will be executed every time your command is executed


			// Create and show panel
			const panel = vscode.window.createWebviewPanel('default', "Code Generator", vscode.ViewColumn.One, {
				enableScripts: true
			  });
			// And set its HTML content
			panel.webview.html = getWebviewContent();
		
			function getWebviewContent() {
				return `<!DOCTYPE html>
				<html lang="en">
				<head>
				<!-- Copyright 2019 etron.ca. All rights reserved. -->
				<title>CodeGen</title>
				<meta charset="UTF-8">
				<script>
				function DO()
				{
					var Results = document.getElementById('Result');
					Results.innerHTML = ''; // Blank out previous values in Result field
				
					var p = document.createElement('h4');
					p.innerHTML = 'Results:'; // insert results heading
					Results.append(p);
				
					var codeline = document.getElementById('Code').value; // Get line of code
					var valuestouse = document.getElementById('Values').value; // Get values to use
					// Turn values from CSV into array
					var array = valuestouse.split(',');
					// For each item in array
					var arrayLength = array.length;
					for (var i = 0; i < arrayLength; i++) {
					// Make the the replacement
					var newline = codeline.replace(/%%%/g, array[i]);
					// Append the result, and repeat for each line
					var el = document.createElement('code');
					el.innerHTML = '<xmp>' + newline + '</xmp>';
					Results.append(el);
					}
					document.getElementById('Count').innerHTML = "<h5><i>Generated " + arrayLength + " lines of code.</i></h5>";
					}
				
				</script>

				</head>
				<body>
				<br>
				<h1>CodeGen</h1>
				<br>
				Input line of code: <span style="font-size: 75%; color: #666666;">(put %%% wherever you want the variable entered)</span>
				<br><br>
				<input type="text" ID="Code" size="151" value="This line of code contains %%% and %%% again." />
				<br><br>
				Input values, separated by commas: <span style="font-size: 75%; color: #666666;">(use search & replace to distill data to CSV values)</span>
				<br><br>
				<textarea ID="Values" cols="150" rows="10">valueA,valueB,valueC</textarea>
				<br><br>
				<button onclick="DO();">Generate</button>
				<br><br>
				<div ID="Result"></div>
				<br><br>
				<span ID="Count"></span>
				<br><br>
				</body>
				</html>`;
			}




// Display a message box to the user
// vscode.window.showInformationMessage('Done');
// vscode.window.showWarningMessage("Done!");
// vscode.window.setStatusBarMessage('Done', 5000);

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
