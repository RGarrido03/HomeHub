import { ConfigContext, ExpoConfig } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: IS_DEV ? "HomeHub (Dev)" : "HomeHub",
  slug: "homehub",
  version: "1.0.0",
  orientation: "default",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  scheme: "your-app-scheme",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  runtimeVersion: "1.0.0",
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV
      ? "com.rgarrido03.homehub.dev"
      : "com.rgarrido03.homehub",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: IS_DEV ? "com.rgarrido03.homehub.dev" : "com.rgarrido03.homehub",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    [
      "expo-build-properties",
      {
        ios: {
          newArchEnabled: true,
        },
        android: {
          newArchEnabled: true,
        },
      },
    ],
    "expo-router",
    [
      "expo-screen-orientation",
      {
        initialOrientation: "DEFAULT",
      },
    ],
    "@config-plugins/react-native-webrtc",
    [
      "react-native-vlc-media-player",
      {
        ios: {
          includeVLCKit: false,
        },
        android: {
          legacyJetifier: false,
        },
      },
    ],
  ],
  updates: {
    url: "https://u.expo.dev/0f620d89-d47d-4a51-9b75-ccf12da4abf3",
  },
  extra: {
    eas: {
      projectId: "0f620d89-d47d-4a51-9b75-ccf12da4abf3",
    },
  },
  owner: "rgarrido03",
});
