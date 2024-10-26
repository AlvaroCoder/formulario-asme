import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, SelectedRifa } from './components';

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
          <Stack.Screen
              name='SelectedRifa'
              component={SelectedRifa}
              options={{title : "Rifa Seleccionada"}}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
