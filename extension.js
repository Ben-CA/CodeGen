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
				function DO() {
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
					document.getElementById('Count').innerHTML = "Generated " + arrayLength + " lines of code.";
					}
				</script>
				
				</head>
				<body style="font-family: sans-serif">
					<div style="width: 100%">
						<div style="width: 80%; margin-left: auto; margin-right: auto;">
							<form action="javascript:DO();">
								<h1>CodeGen</h1>
								<div style="padding-top: 5px; padding-bottom: 10px; font-size: 16px; font-weight: bold;">
								Input line of code: <span style="float: right; font-size: 12px; color: #666666;">(put %%% wherever you want the variable entered)</span>
								</div>
								<input type="text" ID="Code" style="width: 100%; padding: 10px; font-size: 14px; border-radius: 3px; border: 1px #000000 solid;" value="This line of 'code' contains %%% and %%% again." placeholder="Use %%%" />
								<div style="padding-top: 30px; padding-bottom: 10px; font-size: 16px; font-weight: bold;">
								Input values, separated by commas: <span style="float: right; font-size: 12px; color: #666666;">(use search & replace to distill data to CSV values)</span>
								</div>
								<textarea ID="Values" rows="8" style="width: 100%; padding: 10px; font-size: 14px; border-radius: 3px; border: 1px #000000 solid;" placeholder="Enter CSV values">valueA,valueB,valueC</textarea>
				
								<div style="text-align: center; padding-top: 15px;">
								<button type="submit" style="width: 300px; padding-top: 10px; padding-bottom: 10px; font-size: 16px; font-weight: bold; border-radius: 8px;">Generate</button></div>
								
								<div ID="Result" style="padding-top: 5px"></div>
								<div ID="Count" style="padding-top: 15px; font-style: italic; font-weight: bold; font-size: 12px;"></div>
							</form>
						</div>
					</div>
				</body>
				</html>`;
			}

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
