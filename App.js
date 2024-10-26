import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, RifaSuccess, SelectedRifa } from './components';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function Page() {
  const [isSigned, setIsSigned] = useState(false);
  return (
    <NavigationContainer>
        <Stack.Navigator>

            {
              isSigned ?
              <>
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{headerShown:false}}
                />
    
                <Stack.Screen
                    name='SelectedRifa'
                    component={SelectedRifa}
                    options={{title : "Rifa Seleccionada"}}
                />
                <Stack.Screen
                    name='RifaSuccess'
                    component={RifaSuccess}
                    options={{headerShown : false}}
                />
              </> : 
              <>
                <Stack.Screen
                  name='Login'
                  component={Login}
                  options={{headerShown : false}}
                />  
              </>
            }

        </Stack.Navigator>
    </NavigationContainer>
  );
}
