import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Share, SafeAreaView } from 'react-native'
import React from 'react'
import Constants from "expo-constants";
import QRCode from "react-native-qrcode-svg"
export default function RifaSuccess({navigation, route}) {
    const URL_IMG_QR = route?.params?.image_qr;
    const URL_FORM = route?.params?.url_form

    const handleClickReturnHome=()=>{
        navigation.navigate("Home");
    }
    const handleClickShareButton=async()=>{
      try {
        const result = await Share.share({
          message : `Gracias por tu apoyo. Por favor completa este formulario para continuar con la compra 😃. \n ${URL_FORM}`,
          title:"Que de codigo formulario",
          
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
        
      } catch (err) {
        console.log('Error', err);
        
      }
    }
    return (
    <SafeAreaView style={styles.container}>
      <Text style={{...styles.style_title, marginTop:20}}>Rifas Vendidas</Text>
      <View style={{display:'flex', flexDirection:'row', alignItems :'center', height:60}}>
        <ScrollView
          horizontal
        >
          {
              route?.params?.listTickets?.map((item, key)=><View key={key} style={{padding:10, borderRadius : 10, backgroundColor : "#095097", marginRight : 5}}><Text style={{color : "#FFF", fontWeight : 'bold'}} >Nro {item.number_ticket}</Text></View>)
          }
        </ScrollView>
      </View>
      <Text style={styles.style_title}>
        Formulario de Registro
      </Text>
      <View style={styles.container_box}>
        <QRCode
          value={URL_FORM}
          size={300}
        />
      </View>
      <TouchableOpacity style={styles.style_button} onPress={handleClickShareButton}>
        <Text style={{color : "#FFFF", textAlign : 'center', fontWeight : 'bold'}}>Enviar a Whatsapp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{width:"100%", paddingVertical : 10}} onPress={handleClickReturnHome}>
        <Text style={{textAlign : 'center', color : "#095097", fontWeight : 'bold', fontSize : 15, textDecorationLine : 'underline'}}>Regresar al Inicio</Text>
      </TouchableOpacity>
      <View style={styles.style_footer}>
        <Text style={{textAlign : 'center'}}>@2024 COSAI Brand. Todos los derechos reservados.</Text>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    container:{
        flex : 1,
        marginTop : Constants.statusBarHeight,
        backgroundColor : "#FFFF",
        padding : 10
    },
    style_title :{
        fontWeight : 'bold',
        fontSize : 20,
        marginVertical : 5
    },
    container_box : {
        width : "100%",
        height : "50%", 
        borderWidth : 1,
        borderColor : "#6D6D6D",
        borderRadius : 10,
        justifyContent :'center',
        alignItems :'center',
        marginTop : 10
    },
    style_button : {
        borderRadius : 10,
        width:"100%",
        backgroundColor :"#095097",
        display : 'flex',
        justifyContent : 'center',
        paddingHorizontal : 10,
        paddingVertical : 15,
        marginTop : 15
    },
    style_footer : {   
        position : 'absolute',
        width:Dimensions.get('window').width,
        bottom : 0,
        borderTopWidth : 1,
        borderColor : "#E6E6E6",
        paddingVertical : 10
    },
})