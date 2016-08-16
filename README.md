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

### Errors

** BUILD FAILED **

The following build commands failed:
	CompileC build/HelloCordova.build/Debug-iphonesimulator/HelloCordova.build/Objects-normal/i386/AppDelegate.o HelloCordova/Classes/AppDelegate.m normal i386 objective-c com.apple.compilers.llvm.clang.1_0.compiler
	CompileC build/HelloCordova.build/Debug-iphonesimulator/HelloCordova.build/Objects-normal/i386/MainViewController.o HelloCordova/Classes/MainViewController.m normal i386 objective-c com.apple.compilers.llvm.clang.1_0.compiler
(2 failures)
Error: Error code 65 for command: xcodebuild with args: -xcconfig,/Users/slamfyre175/fs/timeline/platforms/ios/cordova/build-debug.xcconfig,-project,HelloCordova.xcodeproj,-target,HelloCordova,-configuration,Debug,-sdk,iphonesimulator,-destination,platform=iOS Simulator,build,CONFIGURATION_BUILD_DIR=/Users/slamfyre175/fs/timeline/platforms/ios/build/emulator,SHARED_PRECOMPS_DIR=/Users/slamfyre175/fs/timeline/platforms/ios/build/sharedpch

- Delete all directories and files in the ```plugins``` directory. 
- ```sudo chmod 777 /Users/slamfyre175/.config/configstore/insight-cordova.json```
- ```ionic build ios```
