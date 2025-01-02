## Development

Run the following command to make sure the current version of the code is good for production.

```
npx expo-doctor
```

Build the app.
```
eas build --platform ios|android
```

Submit to the store.
```
eas submit --platform ios|android
```

### Submitting to the iOS App Store

After the `eas` commands ran successfully, open Transporter app and upload the newly generated `.ipa` file. Follow up on https://appstoreconnect.apple.com for new version creation, submission for approval, etc.

### Submitting to the Google Play Store

Make sure the `.json` file for Google Play Service Account is in the directory. `eas` command should ask for the file name. After the submission is successful, go to Google Play Console and create a new release with the new version.
