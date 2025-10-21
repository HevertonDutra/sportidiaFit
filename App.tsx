/**
 * vocêMAISfit - Aplicativo de Academia
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar translucent backgroundColor="transparent" />
          <AppNavigator />
        </SafeAreaView>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
