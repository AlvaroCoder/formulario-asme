import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
export default function SelectedRifa({navigation, route}) {
    const number_ticket_database = 3072;
    const [listTickets, setListTickets] = useState([
        {number : String(number_ticket_database) }
    ]);
    const handleChangeInputRifas=(text)=>{
        const list_tickets =Array.from({length : text}).map((_, idx)=>({number : number_ticket_database+idx+1}))
        setListTickets(list_tickets);
    }
    const handleClickShowForm=()=>{
        navigation.navigate("RifaSuccess", { listTickets })
    }
  return (
    <View style={styles.container}>
        <View>
            <Text style={{fontWeight : 'bold', fontSize : 20}}>
                Cantidad de rifas Vendidas
            </Text>
            <TextInput
                keyboardType='numeric'
                value={String(listTickets.length)}
                onChangeText={(text)=>handleChangeInputRifas(text)}
                style={styles.style_input}
            />
        </View>
        <View>
            <Text style={{fontWeight : 'bold', fontSize : 20}}>Numero de rifas seleccionadas</Text>
            {
                listTickets.length > 0?
                <View style={{}}>
                    {
                        listTickets.map((item, key)=>(<Text key={key}>Nro {item.number}</Text>))
                    }
                </View>:
                <View style={{}}>
                    <Text>No hay rifas por vender</Text>
                </View>
            }
        </View>
        <View>
            <Text style={{fontWeight : 'bold', fontSize : 20}}>Formulario Registro</Text>
            <View style={styles.container_box}>
                <Text style={{textAlign : 'center'}}>No hay formulario para mostrar</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.style_button} onPress={handleClickShowForm}>
            <Text style={{textAlign : 'center', fontWeight :'bold', color : '#FFFF'}}>Generar Formulario</Text>
        </TouchableOpacity>
        <View style={styles.style_footer}>
            <Text style={{textAlign : 'center'}}>@2024 COSAI Brand. Todos los derechos reservados.</Text>
        </View>
    </View>
  )
};
const styles = StyleSheet.create({
    style_input :{ 
        padding : 15,
        borderWidth : 1,
        borderColor : "#ddd",
        borderRadius : 10,
        backgroundColor : "#f9f9f9",
        marginBottom : 20
     },
    container:{
        flex:1,
        padding : 10,
        backgroundColor : "#ffff"
    },
    style_button : {
        position : 'absolute',
        bottom : 0,
        borderRadius : 10,
        width:"100%",
        backgroundColor :"#095097",
        display : 'flex',
        justifyContent : 'center',
        paddingHorizontal : 10,
        paddingVertical : 15,
        marginLeft : 10,
        marginBottom : 60
    },
    style_footer : {   
        position : 'absolute',
        width:Dimensions.get('window').width,
        bottom : 0,
        borderTopWidth : 1,
        borderColor : "#E6E6E6",
        paddingVertical : 10
    },
    container_box : {
        width : "100%",
        height : "70%", 
        borderWidth : 1,
        borderColor : "#6D6D6D",
        borderRadius : 10,
        justifyContent :'center',
        alignItems :'center',
        marginTop : 10
    }
})