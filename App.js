import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, RifaSuccess, SelectedRifa, TicketsAvailable } from './components';
import { useEffect, useMemo, useReducer, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from './context/useAuthentication';
import { loginPostUser } from './conexion/apiConexion';
import DrawerNavigator from './DrawerApp';

const Stack = createNativeStackNavigator();

export default function Page({ navigation }) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  )
  useEffect(()=>{
    const bootstrapAsync=async ()=>{
      let userToken;
      try {
        let responseSecure = await SecureStore.getItemAsync('userToken');
        
        userToken = responseSecure
        
       
       
      
      } catch (err) {
        
      }

      dispatch({type : 'RESTORE_TOKEN', token : userToken})
    }
    bootstrapAsync()
  }, []);

  const authContext= useMemo(
    ()=>({
      signIn : async (data)=>{
        const response = await loginPostUser(data);
        const responseJSON = await response.json();
        console.log(responseJSON['user_data']);
        
        await SecureStore.setItemAsync('userToken', JSON.stringify(responseJSON['user_data']));
        
        dispatch({type : 'SIGN_IN', token : JSON.stringify(responseJSON['user_data'])});
      },

      signOut : async()=>{
        await SecureStore.deleteItemAsync('userToken')
        dispatch({type : 'SIGN_OUT'})
      },
      signUp :async(data)=>{
        console.log(data);
        
        dispatch({type:'SIGN_IN', token : 'dummy-auth-token'})
      },
      userToken : state.userToken
    }),
    [state.userToken]
  )

  return (
    <AuthContext.Provider value={authContext} >
          <NavigationContainer>
              {
                state.userToken != null ?
                <Stack.Navigator>
                  <Stack.Screen
                    name='Main'
                    component={DrawerNavigator}
                    options={{headerShown : false}}
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
                  <Stack.Screen
                    name='TicketsAvailable'
                    component={TicketsAvailable}
                    options={{title : "Tickets"}}
                  />
                </Stack.Navigator>
                : 
                  <Stack.Navigator>
                  <Stack.Screen
                    name='Login'
                    component={Login}

                    options={{
                      headerShown : false,
                      animationTypeForReplace : state.userToken ? 'push' : 'pop'
                      
                    }}
                  />  
                  </Stack.Navigator>
              }
      </NavigationContainer>
    </AuthContext.Provider >
  );
}
