## Prerequisite
# Contributing


## Table of Contents
1. [Stack](#stack)
2. [Requirements](#requirements)
3. [Getting Started](#getting-started)
4. [Application Structure](#application-structure)
5. [How to contribute](#how-to-contribute)
6. [Changelog](#Changelog)


## Stack
* [NodeJS](https://nodejs.org/en/l)                                       # Javascript Server Side Runtime 
* [Bull](https://github.com/OptimalBits/bull)                                       # Message Broker 
* [typescript](https://www.typescriptlang.org/)                               # Typed superset of javascript

* [jest](https://facebook.github.io/jest/)                              # Test framework
* [eslint](http://eslint.org)                                           # JavaScript guidelines checker
* [prettier](https://github.com/prettier/prettier)                        # JavaScript code styling and consistency
* [bunyan](https://github.com/trentm/node-bunyan) # Logs and monitoring 
(In staging and production, logs are sent to ELK with [Fluentd](https://www.fluentd.org/))

## Requirements
* node `^9.5.0`
* npm `^5.6.0`
* git-bash

## Getting Started

After confirming that your development environment meets the specified [requirements](#requirements), you can clone the project from Git 

First(In a bash or any linux like shell like `git-bash`), clone the project:

```bash
$ git clone git@my-repo/my-project.git
$ cd my-project # Enter the repository
```

Create an `.env` file in your root folder and fill it with `docker-compose-ci.yml` environment variables.


Then run these commands (in git-bash):
```bash
$ npm install               # Install project dependencies
$ npm run dev               # Run the application, you can also use `npm start`
```


While developing, you will probably rely mostly on `npm run dev`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`|
|`dev`|Same as `npm start`, but enables live reloading with nodemon and verbose logs with bunyan.|
|`test`|Runs all unit tests with Jest.|
|`lint`|Lint all `.ts` files.|
|`format`|Format all `.ts` files with prettier.|
|`precommit`|Before the commit Lint all `.js` files.|
|`ts-check`|Checks type errors with typescript.|
|`release`|Runs standard-version (only CI should run that).|
|`sonar-jest`|Runs Jest with Sonar report (only CI should run that).|

#### Redis

To run it locally : `redis-server`

More infos are available here : https://redis.io/topics/quickstart

## Application Structure


```
.
├── src                          # Application source code
│   ├── jobs                     # Steps containing Business logic of the worker
│   ├── helpers                  # Helpers of the application
│   ├── services                 # Services used to handle IO (HTTP calls, Database access etc...)
|   index.ts                     # Contains logic that initializes and starts the application
|   app.ts                       # The part that orchestrates the jobs to be done by the worker
index.ts                         # Main entry of the app

```


## How to contribute

1. Update your repo on master `git pull`
2. Create your feature branch: `git checkout -b my-new-feature`
3. Code....
4. Commit your changes:

  - if you don't have new file : `git commit -am 'feat: Add some feature'`
  - if yes `git add -A`then  `git commit -m 'feat: Add some feature'`

  **Note**:  To ensure the update the changelog add a valid prefix to your commit. [Look at the changelog section](#Changelog)

We recommend the usage of the [commitizen cli](https://github.com/commitizen/cz-cli) for neat and clean commit message.

5. Before pushing your code, go back to master and check if a team mate have add some code to master:

  ```bash
   git checkout master
   git pull
   git checkout my-new-feature
   git rebase master
  ```
6. Submit a pull request :D


## Changelog

### changelog valid prefix
  - patch: Bug fixes
  - minor: Backward-compatible updates
  - major: Introducing breaking changes
  - ignore: Do not include this commit in changelog

Besides choosing `ignore` in prompts to exclude commits from changelog, the commit message that starts with `ignore: ` will also be excluded.

You can also use format like `type: message` to pre-define commit type, they will be converted to the commit type we use:

|semantic type|description|commit type|0.y.z|
|---|---|---|---|
|chore|changes to build process|ignore||
|docs|documentation only changes|ignore||
|feat|a new feature|minor|patch|
|fix|bug fix|patch||
|refactor|code refactor|patch||
|style|code style changes|ignore||
|test|add missing tests|ignore||
|breaking|introduce breaking changes|major|minor|
|perf|performance improvements|patch||
|tweaks|don't know how to describe|patch||

**Note**: in 0.y.z versions, major changes will affect `y`, other changes and patches will affect `z`. So in such situation you can never reach `1.0.0` do you? Then just explicitly specific the version for your next release, like: `changelog 1.0.0`

For `tweaks: subject`, a message with only `tweaks` or `tweak` will also be a patch.



