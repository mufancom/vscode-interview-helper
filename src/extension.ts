import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'extension.deployFrontEndTest',
      deployFrontEndTest,
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'extension.deployJavaScriptTest',
      deployJavaScriptTest,
    ),
  );

  let config = vscode.workspace.getConfiguration('interviewHelper');

  if (config.questionCategory === 'fe') {
    vscode.commands.executeCommand('extension.deployFrontEndTest');
  } else if (config.questionCategory === 'js') {
    vscode.commands.executeCommand('extension.deployJavaScriptTest');
  }
}

async function deployFrontEndTest() {
  await startServer();
  await vscode.commands.executeCommand('extension.openBrowser');
  await vscode.window.showInformationMessage(
    '请在弹出的输入框位置输入数)字: 10086, 然后按【回键键】继续，\n在下一个输入框弹出后直接按【回车键】继续!',
    {
      modal: true,
    },
  );
  await vscode.commands.executeCommand('liveshare.shareServer');
}

async function deployJavaScriptTest() {
  await startServer();
}

async function startServer() {
  while (true) {
    let extension = vscode.extensions.getExtension(
      'ms-vsliveshare.vsliveshare',
    );

    if (extension && extension.isActive) {
      break;
    }

    await sleep(1000);
  }

  await sleep(5000);
  await vscode.commands.executeCommand('liveshare.start');
}

function sleep(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration));
}
