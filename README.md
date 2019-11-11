# Angular Heroku example

Example project that illustrates how to prepare a generated Angular app and deploy it to [Heroku](http://www.heroku.com).
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

The example app is [available on Heroku](https://angular-gitlab-heroku.herokuapp.com/).

## Required

- [Nodejs](https://nodejs.org) installed
- [Angular CLI](https://github.com/angular/angular-cli) installed
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed

# Steps

To prepare your app for Heroku, you need to add some new files and settings, and alter some existing ones. To do so, follow these steps.

## Update package.json

Open [package.json](./package.json) and update the `scripts` section with the following commands:

```
"start": "node src\server.js",
"postinstall": "ng build --prod --aot",
```

Move the following packages from `devDependencies` into `dependencies`.

```
"@angular-devkit/build-angular": "~0.7.0",
"@angular/cli": "~6.1.5",
"@angular/compiler-cli": "^6.1.0",
"typescript": "~2.7.2",
```

> Why? Your app will run in production mode. Only dependencies from the `dependencies` section will be available.

## Install Express, Path and Compression via npm

Your app will use a nodejs server to serve the application files. We first install additional dependencies.

```
npm install express path compression --save
```

## Add the `server.js` file

Copy this [server.js](./src/server.js) file to your project root.
Change the constant `appname` to the name of your app.

> The appname is listed in the `angular.json` file and matches the `.\dist\{appname}` directory that is available after a production build (see next step).

## Verify that your app runs in production mode on localhost

Run a production build to verify your install.

```
ng build --prod --aot
node server.js
```

> The build artifacts will be stored in the `dist/{appname}` directory.
> Verify that this directory exists!

> The `--prod` flag triggers a production build. The `--aot` flag triggers a ahead-of-time compilation build.

## Create a new app on Heroku

- Go to [Heroku](http://www.heroku.com) and create a new app.
- On the Heroku dashboard, go to 'Deploy'.
- Follow the steps under 'Deploy using Heroku Git'.

## Add the `.gitlab-ci.yml` file from this repository

Adding the `.gitlab-ci.yml` file enables automatic testing, code metrics via SonarQube, and deployment to Heroku from your GitLab repo. Make sure you add the correct `HEROKU_API_KEY` and `HEROKU_APP_NAME` variables in the GitLab config settings of your repo. You find the api key on your Heroku profile page. The app name is the name of your app on Heroku.

## Push your project to GitLab

```
git commit -am "Your comment here"
git push origin master
```

If all is well, your app is available on Heroku.

## Troubleshooting

To inspect the logging on Heroku, install the [Heroku Command Line Interface](https://devcenter.heroku.com/articles/heroku-cli), log in, and type

```
heroku logs --tail
```

Type `Ctrl+C` to stop.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
