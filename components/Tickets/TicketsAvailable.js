import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAvailablesTicketsHome, getRemainTicketsHome } from '../../conexion/apiConexion';
import { stylesTickets } from '../../styles/tickets';

export default function TicketsAvailable({navigation, route}) {
    const IMAGE_NO_DATA = "https://res.cloudinary.com/dabyqnijl/image/upload/v1730237537/v06gkhymacdv8sepzeqr.png"
    const [remainTickets, setRemainTickets] = useState([]);
    const [numTicketsAvailable, setNumTicketsAvailable] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        async function getDataAvailableTickets() {
            setLoading(true)
           const idUser = route?.params?.id_user;
           const response = await getAvailablesTicketsHome(idUser);
           const responseJSON = await response.json();

           setRemainTickets(responseJSON?.tickets_data?.tickets); 
           setNumTicketsAvailable(responseJSON?.tickets_data?.amount) 
            setLoading(false);
        }
        getDataAvailableTickets();
    },[]);
  return (
    <View style={stylesTickets.container}>
        <View style={stylesTickets.box_styles}>
            <Text style={stylesTickets.title_style}>{numTicketsAvailable}</Text>
            <Text >Tickets Disponibles</Text>
        </View>
        <View style={{flex : 1, marginTop :10}}>
            <Text style={stylesTickets.style_subtitle}>Lista de Tickets Disponibles</Text>
            {
                !loading ? 
                (numTicketsAvailable>0?
                    <ScrollView
                        style={{flex : 1, paddingVertical : 10}}
                        >
                        {
                            remainTickets.map((item, key)=>{
                                return(
                                    <View key={key}>
                                        <View  style={stylesTickets.container_ticket}>
                                            <Text style={{...stylesTickets.style_subtitle, color :"#084F96"}}>Ticket de Venta</Text>
                                            <Text style={{fontSize:17, fontWeight:'bold'}}>Nro {item?.number_ticket}</Text>
                                            <Text>Cliente : ----</Text>
                                        </View>
                                    <View  style={{height:20}}></View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>:
                    <View style={{flex :1,  alignItems :'center', paddingVertical : 40}}>
                        <Image
                            source={{
                                uri : IMAGE_NO_DATA
                            }}
                            height={250}
                            width={250}
                        />
                        <Text>No hay tickets por visualizar</Text>
                    </View>
                ) :
            <ActivityIndicator>

            </ActivityIndicator>
            }
        </View>
    </View>
  )
};

