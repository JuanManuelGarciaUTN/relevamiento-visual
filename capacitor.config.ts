import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.relevamiento.jmg',
  appName: 'relevamiento-visual',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins:{
    SplashScreen: {
      launchAutoHide: false,
    }
  }
};

export default config;
