import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getQrLinkFormUser } from '../conexion/qrConexion';
import { getAvailablesTicketsHome } from '../conexion/apiConexion';
export default function SelectedRifa({navigation, route}) {
    const number_ticket_database = route?.params?.num_ticket_start;
    const id_user = route?.params?.id_user
    const username = route?.params?.user_name;

    const [availableTickets, setAvailableTickets] = useState([]);

    useEffect(()=>{
        async function getAvailableTicketsForUser() {
            const response = await getAvailablesTicketsHome(id_user);
            const responseJSON = await response.json();
            setAvailableTickets(responseJSON?.tickets_data?.tickets);
        }   
        getAvailableTicketsForUser();
    },[]);

    const [listTickets, setListTickets] = useState([]);
    const handleChangeInputRifas=(text)=>{
        const lista_new = availableTickets.slice(0, parseInt(text));
        
        setListTickets(lista_new);
    }
    const handleClickShowForm=async()=>{
        const newListTickets = listTickets.map((item)=>({id_ticket : item.id_ticket ,number_ticket:String(item?.number_ticket)}))
        const jsonToSend= {
            tickets_data : newListTickets,
            seller : username
        }
        
        const response = await getQrLinkFormUser(jsonToSend);
        const responseJSON = await response.json();     
        
        navigation.navigate("RifaSuccess", { listTickets, url_form : responseJSON?.link, image_qr : responseJSON?.qr })
    }
  return (
    <View style={styles.container}>
        <View>
            <Text style={{fontWeight : 'bold', fontSize : 20, marginVertical : 10}}>
                Cantidad de rifas Seleccionadas
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
                <View style={{display : 'flex', flexDirection : 'row', alignItems :'center', height : 60}}>
                    <ScrollView
                        style={{paddingVertical : 2}}
                        horizontal
                    >
                        {
                            listTickets.map((item, key)=>(<View  key={key} style={{padding : 10, borderRadius : 10, backgroundColor : "#095097", marginRight : 5 }}><Text style={{color : "#FFF"}}>Nro {item.number_ticket}</Text></View>))
                        }
                    </ScrollView>
                </View>:
                <View style={{height:60, display:'flex', justifyContent:'center'}}>
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
        height : "60%", 
        borderWidth : 1,
        borderColor : "#6D6D6D",
        borderRadius : 10,
        justifyContent :'center',
        alignItems :'center',
        marginTop : 10
    }
})