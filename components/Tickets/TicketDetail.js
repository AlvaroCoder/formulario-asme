import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { updateStatusTicketSold } from '../../conexion/qrConexion';

export default function TicketDetail({navigation, route}) {
    const {
        id_ticket,
        number_ticket,
        first_name,
        last_name,
        DNI,
        email,
        cell_phone,
        booking_time,
        evidence
    } = route?.params;
    const [loading, setLoading] = useState(false);

    const handleClickConfirmTicket=async()=>{
        const dataToSend={
            id_ticket,
            confirm : true
        }
        
        setLoading(true);
        const response = await updateStatusTicketSold(dataToSend);
        if (!response.ok) {
            Alert.alert("Error", "Algo salio mal")
            return;
        }
        Alert.alert("Exito","Compra confirmada")
        navigation.navigate("Home");
        setLoading(false); 
    }
  return (
    <View>
        <View style={styles.container}>
        <Text style={styles.label}>Nro de Ticket: <Text style={styles.value}>{number_ticket}</Text></Text>
        <Text style={styles.label}>Nombre: <Text style={styles.value}>{first_name} {last_name}</Text></Text>
        <Text style={styles.label}>DNI: <Text style={styles.value}>{DNI}</Text></Text>
        <Text style={styles.label}>Email: <Text style={styles.value}>{email}</Text></Text>
        <Text style={styles.label}>Teléfono: <Text style={styles.value}>{cell_phone}</Text></Text>
        <Text style={styles.label}>Fecha de Reserva: <Text style={styles.value}>{booking_time}</Text></Text>
        <Text style={styles.label}>Voucher:</Text>
        {evidence && (
            <Image source={{ uri: evidence }} style={styles.evidenceImage} />
        )}
        </View>
       <View style={{width : "100%", height:60, paddingHorizontal:10}}>
            {   
            !loading ?
                <>
                    <TouchableOpacity style={{backgroundColor :"#084F96", borderRadius : 10, height :"100%", justifyContent :"center", alignItems:'center'}} onPress={handleClickConfirmTicket}>
                        <Text style={{color : "#FFF", fontWeight:'bold'}}>Confirmar Pago</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop : 10, borderWidth :1, borderColor :"#6D6D6D", borderRadius : 10, height :"100%", justifyContent :"center", alignItems:'center'}}>
                        <Text style={{fontWeight:'bold'}}>Rechazar Pago</Text>
                    </TouchableOpacity>
                </>:
                <ActivityIndicator></ActivityIndicator>
            }
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    margin: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontWeight: 'normal',
    color: '#555',
  },
  evidenceImage: {
    width: '100%',
    height: 200,
    marginTop: 15,
    borderRadius: 8,
  },
});