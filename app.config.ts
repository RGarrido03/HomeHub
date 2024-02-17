import { ConfigContext, ExpoConfig } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: IS_DEV ? "HomeHub (Dev)" : "HomeHub",
  slug: "homehub",
  version: "1.0.0",
  orientation: "default",
  icon: IS_DEV ? "./assets/icon-dev.png" : "./assets/icon.png",
  userInterfaceStyle: "automatic",
  scheme: "homehub",
  splash: {
    image: IS_DEV ? "./assets/splash-dev.png" : "./assets/splash.png",
    resizeMode: "cover",
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
      foregroundImage: IS_DEV
        ? "./assets/adaptive-icon-dev.png"
        : "./assets/adaptive-icon.png",
      backgroundImage: "./assets/adaptive-icon-bg.png",
    },
    package: IS_DEV ? "com.rgarrido03.homehub.dev" : "com.rgarrido03.homehub",
  },
  plugins: [
    "expo-router",
    [
      "expo-screen-orientation",
      {
        initialOrientation: "DEFAULT",
      },
    ],
    "@config-plugins/react-native-webrtc",
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
