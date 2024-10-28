import { View, Text, Image } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Home, Profile } from './components';
import Constants from "expo-constants"
const Drawer = createDrawerNavigator();



export default function DrawerApp() {
    const URL_IMAGEN_LOGO = "https://res.cloudinary.com/dabyqnijl/image/upload/v1729831966/agpocw2m8hcwpe8xufey.png";

  return (
    <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen
            name='Home'
            component={Home}
        
            options={{
                title : "Inicio",
                headerTitle : ()=>{
                    return(
                        <View style={{flex : 1, alignItems : 'center', justifyContent:'center'}}>
                            <Image
                                height={50}
                                width={250}
                                source={{
                                    uri : URL_IMAGEN_LOGO
                                }}
                            />
                        </View>
                    )
                },
                
            }}
            
        />
        <Drawer.Screen
            name='Profile'
            component={Profile}
            options={{
                title :"Perfil",
                headerTitle : 'Editar Perfil'
            }}
        />
    </Drawer.Navigator>
  )
}