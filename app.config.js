import "dotenv/config";

export default () => ({
  expo: {
    name: "AI_Travel_Planner_app",
    slug: "AI_Travel_Planner_app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.anonymous.AI_Travel_Planner_app",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      googleMapKey: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
      router: {
        origin: false,
      },
      eas: {
        projectId: "e8cb7fbb-51c9-4918-8b34-7d7b7816e7d1",
      },
    },
  },
});
