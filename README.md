# nwHacks NFC app

## Enviromnent setup

Base requirements:
- Node.js
- Watchman

If while reading this setup you get stuck, [check these instructions](https://facebook.github.io/react-native/docs/getting-started.html#android-development-environment) to see if you missed anything. Read until "Creating a new application"

Once your enviromnent is setup, run `npm install` in the project directory.

## Android setup

If developing for Android, install Android Studio [https://developer.android.com/studio](https://developer.android.com/studio)

Make sure to select custom install and select these options:
- Android SDK
- Android SDK Platform
- Performance (Intel ® HAXM) (See here for AMD)
- Android Virtual Device

Make sure to install the Android Pie SDK (Can be done under Appearance & Behavior → System Settings → Android SDK.)

In the SDK manager select SDK Platforms and check these options:
- Android SDK Platform 28
- Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 28.0.3 is selected.

Click apply to download all the required files.

Make sure these env variables are set:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
For fish users:
```bash
set -gx ANDROID_HOME $HOME/Library/Android/sdk
set -gx PATH $ANDROID_HOME/emulator $ANDROID_HOME/tools $ANDROID_HOME/tools/bin $ANDROID_HOME/platform-tools $PATH
```

plug in your phone and enable USB Debugging

`adb devices` should show your phone is connected and ready to go

`npm run android` || `npm run ios`

### Fast Reload

To enable fast reloading on Android (app reloads when you save code changes)
- Click on emulator and press CTRL + M (CMD + M on MacOS) or shake the Android device which has the running app
- Select the Enable Fast Reload option from the popup
- If that doesn't work run `adb shell input keyevent 82` to open the popup


## IOS setup
- Make sure to have xcode installed (Requires xcode 11)
- Make sure to open xcode and install its extra stuffs
- Install [cocoa pods](https://cocoapods.org/)
    - If the pod install fails, try running this: `sudo gem install cocoapods -n /usr/local/bin`
- Run pod install in the `/ios/` directory
**Note, this doesn't work on high seirra. Please upgrade to at least mojave to build for ios.**

## Logging
`react-native log-android || log-ios` 
