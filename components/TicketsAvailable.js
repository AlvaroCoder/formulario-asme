import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getRemainTicketsHome } from '../conexion/apiConexion';

export default function TicketsAvailable({navigation, route}) {
    const [remainTickets, setRemainTickets] = useState([]);
    const [numTicketsAvailable, setNumTicketsAvailable] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        async function getDataAvailableTickets() {
            setLoading(true)
           const idUser = route?.params?.id_user;
           const response = await getRemainTicketsHome(idUser);
           const responseJSON = await response.json();

           setRemainTickets(responseJSON?.amount?.tickets); 
           setNumTicketsAvailable(responseJSON?.amount?.amount) 
            setLoading(false);
        }
        getDataAvailableTickets();
    },[]);
  return (
    <View style={styles.container}>
        <View style={styles.box_style}>
            <Text style={styles.title_style}>{numTicketsAvailable}</Text>
            <Text >Tickets Disponibles</Text>
        </View>
        <View style={{flex : 1, marginTop :10}}>
            <Text style={styles.style_subtitle}>Lista de Tickets</Text>
            {
                !loading ? 
                <ScrollView
                    style={{flex : 1, paddingVertical : 10}}
                    
                >
                {
                    remainTickets.map((item, key)=>{
                        return(
                            <View key={key}>
                                <View  style={styles.container_ticket}>
                                <Text style={{...styles.style_subtitle, color :"#084F96"}}>Ticket de Venta</Text>
                                <Text style={{fontSize:17, fontWeight:'bold'}}>Nro {item?.number_ticket}</Text>
                                <Text>Cliente : ----</Text>
                            </View>
                            <View  style={{height:20}}></View>
                            </View>
                        )
                    })
                }
            </ScrollView> :
            <ActivityIndicator>

            </ActivityIndicator>
            }
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#FFFF",
        padding : 10
    },
    title_style : {
        fontWeight : 'bold',
        fontSize : 24,

    },
    style_subtitle :{
        fontWeight : 'bold',
        fontSize : 18
    },
    box_style : {
        width:"100%",
        height : 90,
        borderRadius :20,
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems:'center',
        backgroundColor :"#F3F3F3",
        borderColor  :"#DADADA",
    },
    container_ticket : {
        height : 80,
        width: "100%",
        borderRadius :10,
        borderColor :"#6D6D6D",
        borderWidth :1,
        paddingHorizontal :10,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
    }
})