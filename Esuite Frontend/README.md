###Frontend for an equipment management system for the bureau of land management
for this project I worked with a team in order to develop a higher tech system of keeping track of radios, laptops, and emergency equipment for emergency response teams working for the Buruea of Land Management.
### Installation
 * Install npm from `https://nodejs.org/en/`
 * If on windows you may want to install git-bash from `https://git-scm.com/downloads` then proceed with the installation using that shell.
 * Install vue in terminal: `npm install -g vue`
 * Install vue-cli in terminal: `npm install -g @vue/cli`
 * Run `npm i`
 * Run `npm run serve`
 * Goto `http://localhost:8080/` on your browser
 * You should see a giant green V
 * You may want to install `prettier` which is a js formatter. To do this type `npm install -g prettier`. If on linux you'll need to add `sudo`.

### Useful git commands
 * `git add -A` stage all unstaged changes including new and deleted files
 * `git commit -m "Commit message"` commit staged changes to history; type in a short message for what you did in the commit where it says "Commit Message"
 * `git commit -am "Commit message"` stage all modified files and commit them to history; does not include new/deleted files
 * `git diff` view the differences between the current changes and the last commit
 * `git log` view commit history
 * `git reset --hard HEAD` ignore all local changes and reset to the last commit. This will not save your changes and you will not be able to get them back. Use carefully.
 * `git checkout COMMIT-HASH` view the repository when the commit with the associated COMMIT-HASH was made.
 * `git checkout -b BRANCH-NAME` create a new branch with the BRANCH-NAME
 * `git checkout BRANCH-NAME` view the repository that is on another branch.

### Useful commands
 * `prettier --write **/*.vue` this will fix all the warnings related to formatting; requires prettier to be installedd globally

### Compiles and hot-reloads for development
`npm run serve`

### Compiles and minifies for production
`npm run build`

### Run your tests
`npm run test`

### Lints and fixes files
`npm run lint`

### Run your end-to-end tests
`npm run test:e2e`

### Lints and fixes files
```
npm run lint
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
