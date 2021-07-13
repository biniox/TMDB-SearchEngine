import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes.js';
import GlobalProvider from './src/Store/globalStore.js';

const Stack = createStackNavigator();

export default function App() {

  useEffect(() => console.log("start"), []);

  return (
    <View style={styles.container}>
      <GlobalProvider>
        <Header
          centerComponent={{ text: 'Wyszukiwarka TMDB', style: styles.headerTitle }}
          containerStyle={styles.header}
        />

        <NavigationContainer>
          <Stack.Navigator>
            {routes.map((route, i) => <Stack.Screen key={i} {...route} options={{ headerShown: false }}/>)}
          </Stack.Navigator>
        </NavigationContainer>        
      </GlobalProvider>

      
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  
  header: {
    backgroundColor: 'rgb(3, 37, 65)',
    height: 100
  },

  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    bottom: -10
  },
});
