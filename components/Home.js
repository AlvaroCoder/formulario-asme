import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, SafeAreaView, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/useAuthentication';
import { getAvailablesTicketsHome, getBookedTicketsHome, getLastTicketSoldHome, getPendingTicketsHome, getSoldOutTicketsHome } from '../conexion/apiConexion';


export default function Home({navigation}) {
    const LOGO_COSAI = "https://res.cloudinary.com/dabyqnijl/image/upload/v1730248449/et35vyu58u7ipt0um69z.png"
    const {userToken} = useContext(AuthContext);        
    
    const user=userToken && JSON.parse(userToken) ;
    
    const [availableTickets, setAvailableTickets] = useState([]);
    const [numAvailableTickets, setNumAvailableTickets] = useState(0);

    const [lastNumSoldOut, setLastNumSoldOut] = useState(0);
    const [numReservateTickets, setNumReservateTickets] = useState(0);
    const [numSoldOutTicket, setNumSoldOutTicket] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ticketsPending, setTicketsPending] = useState([])
    useEffect(()=>{
        async function getDataHome() {
            const responseBookedTickets = await getBookedTicketsHome(user?.id_user);
            const responseBookedJSON = await responseBookedTickets.json();
            setNumReservateTickets(responseBookedJSON?.tickets_data?.amount);
            
            const responseAvailableTickets = await getAvailablesTicketsHome(user?.id_user);
            const responseAvailableTicketsJSON = await responseAvailableTickets.json();
            setNumAvailableTickets(responseAvailableTicketsJSON?.tickets_data?.amount);
            setAvailableTickets(responseAvailableTicketsJSON?.tickets_data?.tickets);

            const responseSoldOutTicket = await getSoldOutTicketsHome(user?.id_user);
            const responseSoldOutTicketJSON = await responseSoldOutTicket.json();
            setNumSoldOutTicket(responseSoldOutTicketJSON?.amount?.amount);

            const responseLasNumSoldOutTicket = await getLastTicketSoldHome(user?.id_user);
            const responseLastNumSoldOutTicketJSON = await responseLasNumSoldOutTicket.json();                        
            setLastNumSoldOut(responseLastNumSoldOutTicketJSON?.number ? parseInt(responseLastNumSoldOutTicketJSON?.number) : 0);
            
            const responsePendingTickets = await getPendingTicketsHome(user?.id_user);
            const responsePendingTicketsJSON = await responsePendingTickets.json();
            setTicketsPending(responsePendingTicketsJSON?.tickets_data?.tickets);
        }
        getDataHome();
    },[userToken, refreshing])

    const onRefresh=useCallback(()=>{
        setRefreshing(true);
        setTimeout(()=>{
            setRefreshing(false)
        },2000)
    },[]);

    const handleClick =()=>{
        // Indica el inicio del numero de la rifa en la pagina selected Rifa
        const first_num_ticket = parseInt(availableTickets[0]?.number_ticket);
        const id_ticket = availableTickets[0]?.id_ticket
        
        navigation.navigate("SelectedRifa", {num_ticket_start : first_num_ticket, id_ticket_start :id_ticket , id_user : user?.id_user, user_name : `${user?.first_name} ${user?.last_name}`});

    }
    return (
        <SafeAreaView style={{flex : 1}}>
            <View style={styles.container} >
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                <View style={{display:'flex', flexDirection : 'column', marginTop : 15}} >
                            <Text style={{...styles.style_title,marginBottom : 5 }}>Bienvenido {user?.first_name} {user?.last_name} {user?.id_user == 27 && '(Chino by William)'}</Text>
                            <Text style={{ fontWeight : 'bold', color : "#FFFF", backgroundColor : "#084F96", borderRadius : 12, padding:2, width:90, textAlign:'center'}}>{user?.area_name}</Text>
                        </View>
                        <View>
                            <Text style={{fontWeight : 'bold', fontSize : 17, marginTop : 15}}>Información de Rifas</Text>
                        </View>
                        <View style={{...styles.style_container_box}} >
                            <TouchableOpacity style={styles.style_box} onPress={()=>navigation.navigate('TicketsSoldOut',{id_user : user?.id_user})}>  
                                <Text style={styles.style_title}>{numSoldOutTicket}</Text>
                                <Text>Rifas Vendidas</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>navigation.navigate('TicketsAvailable', {id_user : user?.id_user})} style={styles.style_box}>
                                <Text style={styles.style_title}>{numAvailableTickets}</Text>
                                <Text>
                                    Rifas Disponibles
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.style_container_box}>
                            <TouchableOpacity style={styles.style_box}>
                                <Text style={styles.style_title}>{lastNumSoldOut == 0 ? "--" :lastNumSoldOut}</Text>
                                <Text>
                                    Último Nro Vendido
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.style_box} onPress={()=>navigation.navigate('TicketsBooked', {id_user : user?.id_user})} >
                                <Text style={styles.style_title} >{numReservateTickets}</Text>
                                <Text>
                                    Rifas Reservadas
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop : 15}}>
                            <Text style={{fontWeight : 'bold', fontSize : 17}}>Rifas Pendientes de Revision ({ticketsPending.length}) </Text>
                            <View style={{width:"100%", height:220}}>
                                {
                                    ticketsPending.length > 0 ?
                                    <ScrollView style={{width:"100%", height:"100%", padding:5}}>
                                        {
                                            ticketsPending.map((item, key)=>{
                                                return(
                                                <TouchableOpacity 
                                                    key={key} 
                                                    style={{paddingLeft : 10,height :  80, borderBottomWidth : 1, borderColor :"#6D6D6D", display : 'flex', flexDirection : 'row', alignItems : 'center'}}
                                                    onPress={()=>navigation.navigate("TicketDetail",{...item})}>
                                                        <View>
                                                            <Text style={{fontSize : 15}}>Ticket Pendiente</Text>
                                                            <Text style={{fontWeight :"bold", fontSize : 20}}>Nro {item?.number_ticket}</Text>
                                                        </View>
                                                </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </ScrollView> : 
                                    <View style={{width : "100%", borderRadius : 10, height : 100, borderWidth : 1, borderStyle :'dashed', borderColor : "#6D6D6D", display : 'flex', justifyContent :'center', alignItems : 'center', marginTop : 10}}>
                                        <Text style={{textAlign : 'center', fontWeight : 'bold'}}>No hay rifas Pendientes</Text>
                                    </View>
                                }
                            </View>
                        </View>
                </ScrollView>
                <TouchableOpacity style={styles.style_button} onPress={handleClick}>
                    <Text style={{textAlign : 'center', fontWeight : 'bold', color :"#FFFF"}}>Vender Nueva Rifa</Text>
                </TouchableOpacity>
                <View style={styles.style_footer}>
                    <Text style={{textAlign : 'center'}}>@2024 COSAI Brand. Todos los derechos reservados.</Text>
                </View>
            </View>

        </SafeAreaView>
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