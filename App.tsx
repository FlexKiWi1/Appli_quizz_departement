import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabLayout from './screens/Tabs/layout';
import { AppTheme, COLORS } from './constants/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import QuizStackLayout from './screens/QuizStack/layout';

const queryCLient = new QueryClient();
const MainStack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryCLient}>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        <NavigationContainer theme={AppTheme}>
          <MainStack.Navigator screenOptions={{
            headerShown: false
          }}>
            <MainStack.Screen name='tabs' component={TabLayout} />
            <MainStack.Screen name='quiz' component={QuizStackLayout} />
          </MainStack.Navigator>
        </NavigationContainer>
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
