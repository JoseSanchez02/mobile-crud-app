import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import AddRecordScreen from './src/screens/AddRecordScreen';
import EditRecordScreen from './src/screens/EditRecordScreen';
import {theme} from './src/utils/theme';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Records'}}
          />
          <Stack.Screen
            name="AddRecord"
            component={AddRecordScreen}
            options={{title: 'Add Record'}}
          />
          <Stack.Screen
            name="EditRecord"
            component={EditRecordScreen}
            options={{title: 'Edit Record'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
