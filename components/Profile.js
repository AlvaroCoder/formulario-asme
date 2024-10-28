import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/useAuthentication';

export default function Profile() {
    const {userToken, signOut} = useContext(AuthContext);
    const user = userToken && JSON.parse(userToken)

    const handlePress=async()=>{
        await signOut()
    }
  return (
    <View style={{padding : 10, flex : 1, }}>
      <View>
        <Text style={styles.title_style}>Nombre</Text>
        <TextInput
            style={styles.input}
            value={user?.first_name}
        />
      </View>
      <View>
        <Text style={styles.title_style}>Apellido</Text>
        <TextInput
            style={styles.input}
            value={user?.last_name}
        />
      </View>
      <View>
        <Text style={styles.title_style}>Equipo</Text>
        <TextInput
            style={styles.input}
            value={user?.team_name}
        />
      </View>
      <View>
        <Text style={styles.title_style}>Area</Text>
        <TextInput
            style={styles.input}
            value={user?.area_name}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={{color : "#FFFF", fontWeight : 'bold'}}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    title_style : {
        fontWeight : 'bold',
        fontSize : 17,
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 20,
        color : 'black',
        backgroundColor: '#f9f9f9',
      },
    button : {
        width : '100%',
        backgroundColor : '#1a73e8',
        padding: 15,
        borderRadius : 10,
        alignItems:'center'
    }
})