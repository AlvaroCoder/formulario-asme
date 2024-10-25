import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login } from './components';

const Stack = createNativeStackNavigator();

export default function Page() {

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                
                name='Home'
                component={Home}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name='Login'
                component={Login}
            />    

        </Stack.Navigator>
    </NavigationContainer>
  );
}
