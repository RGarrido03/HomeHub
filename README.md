# <img src="/assets/icon.png" alt="Logo" width="24" style="border-radius: 4px" /> HomeHub
Use your old tablet as a home hub, with Home Assistant integration.

## Features
- Photos slider (like a slideshow) with pictures from the device
- Clock in the left bottom of the screen
- Devices dashboard, with entities from Home Assistant
- Glassmorphism design

## Architecture
This project uses [Expo](https://docs.expo.dev) 50 (React Native 0.73), with [Bun](https://bun.sh) as the package manager.

## How to build
This app needs a development build because of extra WebRTC modules.

One can get one by running `bunx expo:android` or `bunx expo:ios` with the `APP_VARIANT` environment variable set to `development`. Or create a new project in the [Expo website](https://expo.dev) and build it in EAS.

### Environment variables
A `.env` file needs to be created before the build, with the following properties:
- `ACCESS_TOKEN`: Home Assistant access token
- `HOST`: Home Assistant URL
- `STREAM`: For future use; choose a random string

### Home Assistant entities
By default, this code includes entities from my Home Assistant instance. One should change them to their own, by following the properties defined in the `types/devices.ts` file.

## How to run
Run `bun start` in the terminal (alias for `bunx expo start --dev-client`).
