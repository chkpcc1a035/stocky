//src/extensions.ts
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // // Use the console to output diagnostic information (console.log) and errors (console.error)
  // // This line of code will only be executed once when your extension is activated
  // console.log('Congratulations, your extension "stocky" is now active!');

  // // The command has been defined in the package.json file
  // // Now provide the implementation of the command with registerCommand
  // // The commandId parameter must match the command field in package.json
  // let disposable = vscode.commands.registerCommand('stocky.helloWorld', () => {
  // 	// The code you place here will be executed every time your command is executed
  // 	// Display a message box to the user
  // 	vscode.window.showInformationMessage('Hello World from stocky!');
  // });

  // context.subscriptions.push(disposable);

  // Initialize the TreeView with the ID used in `package.json`
  const sampleTreeView = vscode.window.createTreeView("stockyView", {
    treeDataProvider: new SampleDataProvider(),
  });
  context.subscriptions.push(sampleTreeView);

  context.subscriptions.push(
    vscode.commands.registerCommand("stocky.showIntroduction", () => {
      const panel = vscode.window.createWebviewPanel(
        "showIntroduction",
        "Introduction",
        vscode.ViewColumn.One,
        {}
      );
      panel.webview.html = getIntroductionHtml();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("stocky.showItemTwo", () => {
      vscode.window.showInformationMessage("Item Two");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("stocky.showItemThree", () => {
      vscode.window.showInformationMessage("Item Three");
    })
  );
}

class SampleDataProvider implements vscode.TreeDataProvider<string> {
  getTreeItem(element: string): vscode.TreeItem {
    const treeItem = new vscode.TreeItem(element);
    switch (element) {
      case "Introduction to the Extension":
        treeItem.command = {
          command: "stocky.showIntroduction",
          title: "Show Introduction",
          arguments: [element],
        };
        break;
      case "Two":
        treeItem.command = {
          command: "stocky.showItemTwo",
          title: "Show Item Two",
          arguments: [element],
        };
        break;
      case "Three":
        treeItem.command = {
          command: "stocky.showItemThree",
          title: "Show Item Three",
          arguments: [element],
        };
        break;
    }
    return treeItem;
  }

  getChildren(element?: string | undefined): vscode.ProviderResult<string[]> {
    return Promise.resolve(["Introduction to the Extension", "Two", "Three"]);
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}

function getIntroductionHtml() {
  return `<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Introduction</title>
	</head>
	<body>
	  <h1>Welcome to the Stocky Extension</h1>
	  <p>This is an introduction to how you can monitor your favorite stocks using our extension.</p>
	</body>
	</html>`;
}
