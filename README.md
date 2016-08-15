Ionic App Base
=====================

# Instruction to Run

For starting Browser View
```bash
$ ionic serve
```

For starting Browser View with iOS and Android
```bash
$ ionic serve --lab
```

For starting iOS View
```bash
$ ionic emulate ios
```

For starting Android View
```bash
$ ionic emulate android
```


A starting project for Ionic that optionally supports using custom SCSS.

## Using this project

We recommend using the [Ionic CLI](https://github.com/driftyco/ionic-cli) to create new Ionic projects that are based on this project but use a ready-made starter template.

For example, to start a new Ionic project with the default tabs interface, make sure the `ionic` utility is installed:

```bash
$ npm install -g ionic
```

Then run: 

```bash
$ ionic start myProject tabs
```

Deployment on iPhone:

```bash
$ ionic build ios
$ cordova prepare
```

Login / Sign Up with Apple Developer and link xcode with developer profile.
Navigate to folder platforms/ios.
Open xcode file in xcode.
Connect your device.
Click on Cordova Project and rename bundle Identifier (for testing)

For debugging:

Run iOS Emulator (must be connected).
Open Safari Preferences / Check box (Show Developer Menu).
Open Developer at top.


