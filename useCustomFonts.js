import { useFonts } from 'expo-font';


export default function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    'Sarpanch-Medium': require('./assets/fonts/Sarpanch-Medium.ttf'),
  });

  return fontsLoaded;
}
