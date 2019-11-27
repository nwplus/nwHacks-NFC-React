# Getting Started

`npm install`

If developing for Android, install Android Studio [https://developer.android.com/studio](https://developer.android.com/studio)
Either set up an emulated device or plug in your phone and enable USB Debugging
`adb devices` should show your phone is connected and ready to go

`npm run android` || `npm run ios`

## Logging
`react-native log-android || log-ios` 

## Fast Reload

To enable fast reloading on Android (app reloads when you save code changes)
- Click on emulator and press CTRL + M (CMD + M on MacOS) or shake the Android device which has the running app
- Select the Enable Fast Reload option from the popup
- If that doesn't work run `adb shell input keyevent 82` to open the popup