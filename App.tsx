import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabLayout from './screens/Tabs/_layout';
import { AppTheme, COLORS } from './constants/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import QuizStackLayout from './screens/QuizStack/_layout';
import { QuizProvider } from './contexts/QuizContext';
import ModuleStackLayout from './screens/ModuleStack/_layout';
import { navigationRef } from './utils/navigation';
import { ModuleProvider } from './contexts/ModuleContext';

const queryCLient = new QueryClient();
const MainStack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryCLient}>
      <ModuleProvider>
        <QuizProvider>
          <View style={styles.container}>
            <NavigationContainer ref={navigationRef} theme={AppTheme}>
              <MainStack.Navigator initialRouteName='module' screenOptions={{
                headerShown: false
              }}>
                <MainStack.Screen name='module' component={ModuleStackLayout} />
                <MainStack.Screen name='tabs' component={TabLayout} />
                <MainStack.Screen name='quiz' component={QuizStackLayout} />
              </MainStack.Navigator>
            </NavigationContainer>
          </View>
        </QuizProvider>
      </ModuleProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});
