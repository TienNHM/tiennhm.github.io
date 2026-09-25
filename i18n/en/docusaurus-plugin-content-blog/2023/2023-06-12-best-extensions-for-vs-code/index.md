---
slug: best-extensions-for-vs-code
title: The Best Extensions for Visual Studio Code
authors: [tiennhm]
tags: [tools]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
image: https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fvscode/showcase/
---

import { SummaryBox } from '@site/src/components/SEO';

<p align="right">
    <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fbest-extensions-for-vs-code&label=⚪View&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper" loading='lazy' decoding='async'/>
</p>

<SummaryBox>
This post introduces the 16 Visual Studio Code extensions I use every day, including GitLens (Git management), Git Graph (visualising Git history), Prettier (code formatter), ESLint (code linter), Live Server (local development server) and a number of other useful ones. Each extension is described in detail along with what it does and how to use it, helping developers become more productive and get more out of VS Code.
</SummaryBox>

Visual Studio Code is a lightweight but powerful source code editor supporting a wide range of operating systems: Windows, macOS and Linux. It has built-in support for `JavaScript`, `TypeScript` and `Node.js`, plus a rich ecosystem of extensions for other languages (such as `C++`, `C#`, `Java`, `Python`, `PHP`, `Go`) and runtimes (such as `.NET` and Unity).

In this post I will list some of the best VS Code extensions that I use every day. I hope you find them useful.

<!--truncate-->

![Visual Studio Code](https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fvscode/showcase/)


## 1. GitLens

![Version](https://img.shields.io/visual-studio-marketplace/v/eamodio.gitlens?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/eamodio.gitlens?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/eamodio.gitlens?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/eamodio.gitlens?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/eamodio.gitlens?style=flat)

GitLens is a Visual Studio Code extension that supercharges the Git capabilities built into VS Code. It helps you understand your code better by showing who changed a line or block of code, when, and why.

<img src="https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Deamodio.gitlens/showcase/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- Features:
  + Shows blame information for the current line or for whole blocks of code via CodeLens.
  + Shows detailed commit and stash information in the Side Bar.
  + Shows the history and evolution of repositories, commits and files.
  + Supports searching, comparing and managing commits, branches, tags, stashes and more.
  + Integrates with Git services such as GitHub, GitLab and Bitbucket.
  + Integrates with Live Share for online collaboration.
  + GitLens helps you understand the source code in Git-based projects better. It is an indispensable extension for anyone using Git and Visual Studio Code.

## 2. Git Graph

![Version](https://img.shields.io/visual-studio-marketplace/v/mhutchie.git-graph?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/mhutchie.git-graph?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/mhutchie.git-graph?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/mhutchie.git-graph?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/mhutchie.git-graph?style=flat)

Git Graph is a Visual Studio Code extension that lets you view a Git graph of your repository and easily run Git commands straight from that graph. It helps you visualise and manage commits, branches, tags, stashes and more.

<img src="https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dmhutchie.git-graph/showcase/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
- Features:
  + Displays a Git graph with commits, branches, tags, stashes, remotes and more.
  + Runs Git commands from a right-click on a commit, branch or tag. Available commands include: Create, Checkout, Delete, Fetch, Merge, Pull, Push, Rebase, Rename and Reset; Add, Delete and Push Tags; Checkout, Cherry Pick, Drop, Merge and Revert commits; Clean, Reset and Stash uncommitted changes; apply, branch, drop and pop stashes; and more.
  + Shows commit details and file changes when you click a commit. In the commit details view you can: see the diff of any changed file by clicking it; open the current version of any file affected by the commit; copy the path of any affected file to the clipboard; and click any HTTP/HTTPS URL in the commit body to open it in your default browser.
  + Compares any two commits by clicking one commit and then CTRL/CMD + clicking another. In the commit comparison view you can: see the diff of any file changed between the two selected commits by clicking it; open the current version of any affected file; and copy the path of any affected file to the clipboard.
  + Filters the branches shown in Git Graph through the `Branches` menu. The filtering options are: show all branches; select one or more branches to view; or select from a custom array of glob patterns (by setting git-graph.customBranchGlobPatterns).
  + And many more features.

This is an excellent extension for developers using Git and Visual Studio Code, because with Git Graph you no longer need a separate application to manage Git. Everything can be done inside VS Code, visually and easily.

## 3. Git History

![Version](https://img.shields.io/visual-studio-marketplace/v/donjayamanne.githistory?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/donjayamanne.githistory?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/donjayamanne.githistory?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/donjayamanne.githistory?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/donjayamanne.githistory?style=flat)

Git History is a Visual Studio Code extension that lets you view and search the Git history of a repository, branch, file or line of code. It helps you explore and analyse commits, branches, tags, stashes and more.

<img src="https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Ddonjayamanne.githistory/showcase/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)
- Features:
  + View and search the git log along with a graph and detailed information.
  + View previous copies of a file.
  + View and search history: the history of one or all branches; the history of a file; the history of a line in a file (Git Blame); the history of an author.
  + Compare branches, commits, and files across commits.
  + Supports GitHub avatars, cherry-picking commits, creating stashes and branches, merge, rebase, reset, revert and more.
  
## 4. Prettier - Code formatter

![Version](https://img.shields.io/visual-studio-marketplace/v/esbenp.prettier-vscode?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/esbenp.prettier-vscode?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/esbenp.prettier-vscode?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/esbenp.prettier-vscode?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/esbenp.prettier-vscode?style=flat)

Prettier is a Visual Studio Code extension that formats your code automatically and consistently. It supports many languages including `JavaScript`, `TypeScript`, `CSS`, `HTML`, `Markdown` and more. Prettier is a great tool for producing code that looks clean and reads easily.

<img src="https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Desbenp.prettier-vscode/showcase/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- Features:
  + Formats code automatically and consistently according to a predefined set of rules.
  + Supports many languages such as JavaScript, TypeScript, CSS, HTML, Markdown and more.
  + Integrates with most editors including VS Code, WebStorm, Atom, Sublime Text and others.
  + Easy to use with only a few settings, and customisable if you want it to be.
  + Makes code easier to read and maintain.

## 5. ESLint

![Version](https://img.shields.io/visual-studio-marketplace/v/dbaeumer.vscode-eslint?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/dbaeumer.vscode-eslint?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/dbaeumer.vscode-eslint?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/dbaeumer.vscode-eslint?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/dbaeumer.vscode-eslint?style=flat)

ESLint is a linter for JavaScript written in Node.js. It is genuinely useful because JavaScript is an interpreted language, so a great many errors can only be found at runtime. ESLint analyses your code, finds small mistakes, flags deviations from your coding style and conventions, and suggests improvements.

<img src="https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Ddbaeumer.vscode-eslint/showcase/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Features:
  + Analyses JavaScript code, finds small mistakes, flags deviations from coding style and conventions, and suggests improvements.
  + Helps you write higher-quality JavaScript that is easier to read and maintain.
  + Supports plugins that extend what ESLint can do: eslint-plugin-react, eslint-plugin-vue, eslint-plugin-angular and others.
  + Supports different parsers for JavaScript syntax: esprima, babel-eslint, @typescript-eslint/parser and others.
  + Supports processors for files containing several languages: markdown, html, vue and others.
  + Supports ready-made configs used by well-known projects, such as eslint:recommended, airbnb, google and standard.

## 6. Auto Rename Tag

![Version](https://img.shields.io/visual-studio-marketplace/v/formulahendry.auto-rename-tag?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/formulahendry.auto-rename-tag?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/formulahendry.auto-rename-tag?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/formulahendry.auto-rename-tag?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/formulahendry.auto-rename-tag?style=flat)

Auto Rename Tag is a very useful extension for web developers using VS Code. As the name suggests, it automatically renames the closing tag when you edit the opening one, and vice versa. You will find it useful not only with HTML but also with React and JSX.

<img src="https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dformulahendry.auto-rename-tag/showcase/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- Features: automatically renames the closing tag when you edit the opening one, and vice versa.

## 7. Live Server

![Version](https://img.shields.io/visual-studio-marketplace/v/ritwickdey.LiveServer?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/ritwickdey.LiveServer?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/ritwickdey.LiveServer?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/ritwickdey.LiveServer?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/ritwickdey.LiveServer?style=flat)

Live Server is a Visual Studio Code plugin that launches a local development server with live browser reload for both static and dynamic pages.

<img src="https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dritwickdey.LiveServer/showcase/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- Features:
  + Launches a local development server with live browser reload for static and dynamic pages.
  + Supports many languages such as HTML, CSS, JavaScript, TypeScript, Markdown and more.
  + Supports many browsers including Chrome, Firefox and Edge.
  + Supports features such as Live Reload, Hot Reload, HTTPS and CORS.

## 8. Path Intellisense

![Version](https://img.shields.io/visual-studio-marketplace/v/christian-kohler.path-intellisense?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/christian-kohler.path-intellisense?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/christian-kohler.path-intellisense?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/christian-kohler.path-intellisense?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/christian-kohler.path-intellisense?style=flat)

Path Intellisense is a Visual Studio Code plugin that autocompletes filenames.

<img src="https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dchristian-kohler.path-intellisense/showcase/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- Features:
  + Autocompletes filenames.
  + Removes the file extension by default when the statement is an import.
  + Supports Node.js modules.
  + Adds a slash automatically when navigating into a folder.
  + Triggers the next suggestion automatically once you pick one.

## 9. Material Icon Theme

![Version](https://img.shields.io/visual-studio-marketplace/v/PKief.material-icon-theme?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/PKief.material-icon-theme?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/PKief.material-icon-theme?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/PKief.material-icon-theme?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/PKief.material-icon-theme?style=flat)

Material Icon Theme is an extension that changes your file and folder icons to the Material Design style. You can customise the colour, shape and opacity of the icons, and add custom icons for specific files or folders.

<img src="https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DPKief.material-icon-theme/showcase/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- Features:
  + Changes file and folder icons to the Material Design style, a simple, modern and friendly design system.
  + Customises icon colour, shape and opacity through the command palette or user settings.
  + Changes the folder icon theme, with options such as classic, specific, blue and none.
  + Adds custom icons for specific files or folders through user settings. You can add your own SVG icons if you want.
  + Changes icon saturation, making them look muted or fully greyscale.

## 10. Live Share

![Version](https://img.shields.io/visual-studio-marketplace/v/MS-vsliveshare.vsliveshare?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/MS-vsliveshare.vsliveshare?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/MS-vsliveshare.vsliveshare?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/MS-vsliveshare.vsliveshare?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/MS-vsliveshare.vsliveshare?style=flat)

Live Share is an extension that lets you collaborate with others on the same project in real time. You can share your session with someone, let them edit the code, and share your servers and debugging sessions too.

<img src="https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DMS-vsliveshare.vsliveshare/showcase/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)
- Features:
  + Edit and debug together, with no need to sync code or set up identical tools, settings or environments.
  + See other people's cursors, positions and actions in the current file.
  + Switch between following someone and exploring ideas or tasks independently.
  + Use VS Code's debugging features such as hovers, locals and watches, the stack trace or the debug console.
  + Share terminals and localhost web apps.
  + Chat with the other participants during the session.

## 11. Settings Sync

![Version](https://img.shields.io/visual-studio-marketplace/v/Shan.code-settings-sync?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/Shan.code-settings-sync?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/Shan.code-settings-sync?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/Shan.code-settings-sync?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/Shan.code-settings-sync?style=flat)

Settings Sync lets you synchronise your configuration — settings, keybindings, extensions, user snippets and UI state — between different machines. You can sign in with a Microsoft or GitHub account and store your configuration in the cloud.

<img src="https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DShan.code-settings-sync/showcase/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
- Features:
  + Synchronises your configuration automatically or manually.
  + Creates and manages multiple configuration profiles.
  + Shows the history and versions of your configuration on GitHub Gist.
  + Lets you edit and customise the sync settings.
  + Syncs settings per platform (Windows, Mac, Linux).

## 12. Quokka.js

![Version](https://img.shields.io/visual-studio-marketplace/v/WallabyJs.quokka-vscode?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/WallabyJs.quokka-vscode?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/WallabyJs.quokka-vscode?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/WallabyJs.quokka-vscode?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/WallabyJs.quokka-vscode?style=flat)

Quokka.js is a Visual Studio Code extension that lets you write and run `JavaScript` / `TypeScript` quickly and easily. The values of variables and expressions are updated and displayed right next to your code as you type.

<img src="https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DWallabyJs.quokka-vscode/showcase/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode)
- Features:
  + Runs code instantly as you type, with no need to save the file or switch to a terminal.
  + Shows error messages, console logs and expression values inline in the code.
  + Shows code coverage, telling you which code ran, which did not, and which ran only partially.
  + Uses the Time Machine to move back and forth across lines of code, inspect variable values, edit code, and step into, over or out of code.
  + Uses Codeclip to share code, results and Time Machine recordings with others.
  + Uses Code Stories to view running code in a continuous view, selecting a variable or expression to see its value.
  + Uses the Value Explorer to inspect and explore non-primitive values in an easily navigable tree.

## 13. Code Spell Checker

![Version](https://img.shields.io/visual-studio-marketplace/v/streetsidesoftware.code-spell-checker?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/streetsidesoftware.code-spell-checker?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/streetsidesoftware.code-spell-checker?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/streetsidesoftware.code-spell-checker?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/streetsidesoftware.code-spell-checker?style=flat)

Code Spell Checker is a Visual Studio Code extension that checks the spelling in your code and documentation. It helps you catch common typos while keeping the number of false positives low.

<img src="https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dstreetsidesoftware.code-spell-checker/showcase/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- Features:
  + Supports many languages, with additional dictionaries available to install.
  + Supports many file types such as JavaScript, TypeScript, HTML, CSS, Markdown, LaTeX and more.
  + Lets you customise the list of ignored words or add words to a dictionary.
  + Lets you check spelling inside comments, strings or the whole file.
  + Lets you fix typos by suggesting the correct word or letting you enter a new one.

## 14. Better Comments

![Version](https://img.shields.io/visual-studio-marketplace/v/aaron-bond.better-comments?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/aaron-bond.better-comments?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/aaron-bond.better-comments?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/aaron-bond.better-comments?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/aaron-bond.better-comments?style=flat)

Better Comments is a Visual Studio Code extension that lets you customise the font and opacity of comments in your code. It also adds four different comment categories, each with its own background colour. You can use these to leave notes, warnings, reminders or TODO lists.

<img src="https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Daaron-bond.better-comments/showcase/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
- Features:
  + Supports many languages such as C#, F#, VB.NET, C/C++, JavaScript, Python, HTML and XAML.
  + Lets you change the font, size, italics and opacity of comments.
  + Lets you use special characters to mark different comment categories, such as `!` for important, `?` for a question, `todo` for work to be done, and `x`, `X` or `//` for struck-through text.
  + Lets you customise the background colour and font for each comment category.
  + Lets you underline or highlight only the todo keyword in a task comment.

## 15. Code Runner

![Version](https://img.shields.io/visual-studio-marketplace/v/formulahendry.code-runner?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/formulahendry.code-runner?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/formulahendry.code-runner?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/formulahendry.code-runner?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/formulahendry.code-runner?style=flat)

Code Runner lets you run code in many different languages quickly and conveniently. It helps you test and experiment with your code without switching to a terminal or another environment.

<img src="https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dformulahendry.code-runner/showcase/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)
- Features:
  + Supports more than 50 languages, including `C`, `C++`, `Java`, `JS`, `PHP`, `Python`, `Perl`, `Ruby`, `Go`, `Lua`, `Groovy`, `PowerShell`, `CMD`, `BASH`, `F#`, `C#`, `VBScript`, `TypeScript`, `CoffeeScript`, `Scala`, `Swift`, `Julia`, `Crystal`, `OCaml`, `R`, `AppleScript`, `Elixir`, `VB.NET`, `Clojure`, `Haxe`, `Obj-C`, `Rust`, `Racket`, `Scheme`, `AutoHotkey`, `AutoIt`, `Kotlin`, `Dart`, `Pascal`, `Haskell` and `Nim`.
  + Runs code from the Run Code button or with the `Ctrl+Alt+N` shortcut.
  + Stops execution from the Stop Code button or with the `Ctrl+Alt+M` shortcut.
  + Runs the current file or only the selected snippet.
  + Lets you customise settings such as the current working directory and the run command for each language or for the whole extension.

## 16. REST Client

![Version](https://img.shields.io/visual-studio-marketplace/v/humao.rest-client?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/humao.rest-client?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/humao.rest-client?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/humao.rest-client?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/humao.rest-client?style=flat)

REST Client is a Visual Studio Code extension that lets you send HTTP requests and view HTTP responses easily and clearly. It helps you test and develop RESTful APIs without reaching for an external tool.

<img src="https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dhumao.rest-client/showcase/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=humao.rest-client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client )
- Features:
  + Sends HTTP requests with any method: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS and more.
  + Sends HTTP requests with any content type: form-data, x-www-form-urlencoded, raw, binary and more.
  + Sends HTTP requests with headers, parameters, variables, authentication and more.
  + Views HTTP responses in various formats: JSON, HTML, XML and more.
  + Shows response details: status code, response time, response size and more.


:::note Disclaimer 🔵
This post was written with some help from [Bing AI](https://bing.com/chat). If there is any copyright concern, please contact me and I will take it down.
:::
