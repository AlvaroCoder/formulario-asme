import { View, Text, ScrollView, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { stylesTickets } from '../../styles/tickets'
import { getBookedTicketsHome } from '../../conexion/apiConexion';

export default function TicketsBooked({navigation, route}) {
    const IMAGE_NO_DATA = "https://res.cloudinary.com/dabyqnijl/image/upload/v1730237537/v06gkhymacdv8sepzeqr.png"
    const [bookedTickets, setBookedTickets] = useState([]);
    const [numBookedTickets, setNumBookedTickets] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        async function getDataBookedTickets() {
            setLoading(true);
            const idUser = route?.params?.id_user;
            const response = await getBookedTicketsHome(idUser);
            const responseJSON = await response.json();
            setBookedTickets(responseJSON?.tickets_data?.tickets);
            setNumBookedTickets(responseJSON?.tickets_data?.amount);
            setLoading(false);
        }
        getDataBookedTickets();
    },[]);
  return (
    <View style={stylesTickets.container}>
        <View style={stylesTickets.box_styles}>
            <Text style={stylesTickets.title_style}>{numBookedTickets}</Text>
            <Text>Tickets Reservados</Text>
        </View>
        <View style={{flex : 1, marginTop : 10}}>
            <Text style={stylesTickets.style_subtitle}>Lista de Tickets Reservados</Text>
            {
                !loading?
                (numBookedTickets>0?
                    <ScrollView
                    style={{flex : 1, paddingVertical : 10}}
                    
                >
                    {
                        bookedTickets?.map((item,key)=>{
                            return(
                                <View key={key}>
                                    <View style={stylesTickets.container_ticket}>
                                        <Text style={stylesTickets.style_subtitle}>Tickets Reservados</Text>
                                        <Text>Nro {item?.number_ticket}</Text>
                                    </View>
                                    <View style={{height:20}}></View>
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
                ):
                <ActivityIndicator>

                </ActivityIndicator>
            }
        </View>
    </View>
  )
}