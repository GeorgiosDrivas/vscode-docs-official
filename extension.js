const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */

const lngs = {
    "javascript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    "python": "https://docs.python.org/3/",
    "html": "https://developer.mozilla.org/en-US/docs/Web/HTML"
};

function activate(context) {
    console.log('Documentator is now active');

    const disposable = vscode.commands.registerCommand('docsOfficial.activate', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No active editor found');
            return;
        }

        const languageId = editor.document.languageId;
        console.log(languageId);

        const docUrl = lngs[languageId];
        console.log(docUrl);

        if (docUrl && docUrl !== "txt") {
            vscode.window.showInformationMessage(`Documentation for ${languageId}`, "Open Documentation")
            .then(response => {
                if(response === "Open Documentation"){
                    vscode.env.openExternal(vscode.Uri.parse(docUrl));
                }
            });
        } else {
            vscode.window.showInformationMessage(`No documentation URL found for ${languageId}`);
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
