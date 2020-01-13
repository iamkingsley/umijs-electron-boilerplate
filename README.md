# umijs-electron-boilerplate

A simple boilerplate for starting umijs in electron.

Project is in two parts, found in the source folder. Each builds into the app folder's dist.
The ./app then acts as a single electron app.


In src, the ./src/main creates electron app and its windows. All electron stuff should be done here. It is run with roadhog


The ./src/renderer is the umijs app. The main content of your project is here. You can initialize your own umi app with create-umi and replace the contents of renderer with your app.

The default umi app has typescript support, and dva but not antd.

Take not of the publicPath in .umirc.js.


# Installation dependency
$ npm i

# Install app directory dependencies (note that you don't use cnpm or tnpm, you will lose node_modules when you pack)
$ cd app
$ npm i
$ cd ../

# rebuild Production Dependency
$ npm run rebuild
Start local debugging.

$ npm run dev
You can also run npm run dev:renderer and npm run dev:main separately.

Bale.

$ npm run pack

# Do not play dmg, exe package, used for local verification
$ npm run pack:dir

#Do not repeat the build and rebuild of the webpack layer, the local verification package process
$ npm run pack:dirOnly

With Two package.json Structure, you may be able to cut to Single package.json Structure.

+ app
  + dist // The src directory is packaged here, divided into main and renderer
  - package.json // production dependencies, save dependencies
+ build // background.png, icon.icns, icon.ico
+ dist // output after pack, .dmg, .exe, .zip, .app, etc.
+ src
  + main // main
  + renderer // renderer
- package.json // Develop dependencies, save devDependencies
- webpack.config.js // webpack configuration for main
A few notes:

/src/main -> /app/dist/main, is based on roadhog packaging
/src/renderer -> /app/dist/renderer, which is based on umi
/webpack.config.js and other roadhog will be moved to /src/main after supporting the APP_ROOT environment variable.