import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/useAuthentication';
import { getBookedTicketsHome, getRemainTicketsHome } from '../conexion/apiConexion';

export default function Home({navigation}) {
    const {userToken} = useContext(AuthContext);        
    
    const user=userToken && JSON.parse(userToken) ;
    const [numBookedTickets, setNumBookedTickets] = useState(0);
    const [numRemainTickets, setNumRemainTickets] = useState(0);

    useEffect(()=>{
        async function getDataHome() {
            const responseBookedTickets = await getBookedTicketsHome(user?.id_user);
            const responseBookedJSON = await responseBookedTickets.json();
            setNumBookedTickets(responseBookedJSON?.tickets_data?.amount);
            
            const responseRemainTickets = await getRemainTicketsHome(user?.id_user);
            const responseRemainJSON = await responseRemainTickets.json();
            setNumRemainTickets(responseRemainJSON?.amount?.amount);
            
        }
        getDataHome();
    },[userToken])

    const tickets_pending=[];

    const handleClick =()=>{
        navigation.navigate("SelectedRifa", {name : "Alvaro"});

    }
    return (
        <View style={styles.container} >
            <View style={{display:'flex', flexDirection : 'column', marginTop : 15}} >
                <Text style={{...styles.style_title, }}>Bienvenido {user?.first_name}</Text>
                <Text style={{ fontWeight : 'bold', color : "#FFFF", backgroundColor : "#084F96", borderRadius : 12, padding:2, width:90, textAlign:'center'}}>{user?.area_name}</Text>
            </View>
            <View>
                <Text style={{fontWeight : 'bold', fontSize : 17, marginTop : 15}}>Información de Rifas</Text>
            </View>
            <View style={{...styles.style_container_box}} >
                <View style={styles.style_box}>  
                    <Text style={styles.style_title}>{numBookedTickets}</Text>
                    <Text>Rifas Vendidas</Text>
                </View>
                <View style={styles.style_box}>
                    <Text style={styles.style_title}>{numRemainTickets}</Text>
                    <Text>
                        Rifas Pendientes
                    </Text>
                </View>
            </View>
            <View style={styles.style_container_box}>
                <View style={styles.style_box}>
                    <Text style={styles.style_title}>3730</Text>
                    <Text>
                        Último Nro Vendido
                    </Text>
                </View>
            </View>
            <View style={{marginTop : 15}}>
                <Text style={{fontWeight : 'bold', fontSize : 17}}>Rifas Pendientes (0) </Text>
                <View>
                    {
                        tickets_pending.length > 0 ?
                        <View>
                            <Text>Si hay data</Text>
                        </View> : 
                        <View style={{width : "100%", borderRadius : 10, height : 100, borderWidth : 1, borderStyle :'dashed', borderColor : "#6D6D6D", display : 'flex', justifyContent :'center', alignItems : 'center', marginTop : 10}}>
                            <Text style={{textAlign : 'center', fontWeight : 'bold'}}>No hay rifas Pendientes</Text>
                        </View>
                    }
                </View>
            </View>
            <TouchableOpacity style={styles.style_button} onPress={handleClick}>
                <Text style={{textAlign : 'center', fontWeight : 'bold', color :"#FFFF"}}>Vender Nueva Rifa</Text>
            </TouchableOpacity>
            <View style={styles.style_footer}>
                <Text style={{textAlign : 'center'}}>@2024 COSAI Brand. Todos los derechos reservados.</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor : "#FFFFFF",
        display : 'flex',
        flexDirection : 'column',
        paddingHorizontal : 15
    },
    style_title : {
        fontWeight : 'bold',
        fontSize : 25,
    },
    style_container_box:{
        display : 'flex',
        flexDirection : 'row',
        marginVertical : 10,
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    style_box : {
        padding : 10,
        borderRadius : 10,
        backgroundColor :"#F3F3F3",
        borderColor  :"#DADADA",
        borderWidth : 2,
        height : 100,
        width : 170,
        display:'flex',
        justifyContent : 'center',
        alignItems : 'center',
    },
    style_button : {
        position : 'absolute',
        bottom : 0,
        borderRadius : 10,
        width : "100%",
        marginLeft : 15,
        backgroundColor :"#095097",
        display : 'flex',
        justifyContent : 'center',
        paddingHorizontal : 10,
        paddingVertical : 15,

        textAlign : 'center',
        marginBottom : 60
    },
    style_footer : {   
        position : 'absolute',
        width:Dimensions.get('window').width,
        bottom : 0,
        borderTopWidth : 1,
        borderColor : "#E6E6E6",
        paddingVertical : 10
    }
})