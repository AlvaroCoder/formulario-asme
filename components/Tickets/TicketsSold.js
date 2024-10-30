import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getSoldOutTicketsHome } from '../../conexion/apiConexion';
import { stylesTickets } from '../../styles/tickets';

export default function TicketsSold({navigation, route}) {
    const IMAGE_NO_DATA = "https://res.cloudinary.com/dabyqnijl/image/upload/v1730237537/v06gkhymacdv8sepzeqr.png"

    const [soldOutTickets, setSoldOutTickets] = useState([]);
    const [numSoldOutTickets, setNumSoldOutTickets] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        async function getDataSoldTickets() {
            setLoading(true);
            const idUser = route?.params?.id_user;
            const response = await getSoldOutTicketsHome(idUser);
            const responseJSON=await response.json();

            setSoldOutTickets(responseJSON?.amount?.tickets);
            setNumSoldOutTickets(responseJSON?.amount?.amount);
            setLoading(false);
        }
        getDataSoldTickets();
    },[]);
  return (
    <View style={stylesTickets.container}>
        <View style={stylesTickets.box_styles}>
            <Text style={stylesTickets.title_style}>{numSoldOutTickets}</Text>
            <Text>Tickets Vendidos</Text>
        </View>
        <View style={{flex : 1, marginTop : 10, paddingTop : 10}}>
            <Text style={stylesTickets.style_subtitle}>Lista de Tickets Vendidos</Text>
            {
                !loading ?
                (numSoldOutTickets > 0 ?
                <ScrollView
                    style={{flex : 1, paddingVertical : 10}}
                >   
                    {
                        soldOutTickets.map((item, key)=>{
                            return(
                                <TouchableOpacity 
                                key={key} 
                                style={{paddingLeft : 10, marginBottom : 10,height :  110, borderBottomWidth : 1, borderColor :"#6D6D6D", display : 'flex', flexDirection : 'column'}}
                                onPress={()=>navigation.navigate("TicketDetailSold",{...item})}>
                                    <View>
                                        <Text style={{fontWeight :"bold", fontSize : 20}}>Nro {item?.number_ticket}</Text>
                                    </View>
                                    <View style={{marginTop:10}}>
                                        <Text>Comprador : <Text style={{fontWeight :'bold'}}>{item?.first_name} {item?.last_name}</Text></Text>
                                        <Text>Email : <Text style={{fontWeight :'bold'}}>{item?.email} </Text></Text>
                                        <Text>Telefono : <Text style={{fontWeight :'bold'}}>{item?.cell_phone} </Text></Text>

                                    </View>
                               </TouchableOpacity>
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
                </View>)
                :
                <ActivityIndicator></ActivityIndicator>
            }
        </View>
    </View>
  )
};
