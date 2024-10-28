import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import Constants from "expo-constants";
export default function RifaSuccess({navigation, route}) {
    const URL_IMG_QR = "https://res.cloudinary.com/dabyqnijl/image/upload/v1729954834/yriza59n7fu2qtocynbh.png";
    const handleClickReturnHome=()=>{
        navigation.navigate("Home");
    }
    const handleClickShareButton=async()=>{
      try {
        
        
      } catch (err) {
        console.log('Error', err);
        
      }
    }
    return (
    <View style={styles.container}>
      <Text style={styles.style_title}>Rifas Vendidas</Text>
      <View style={{display:'flex', flexDirection:'row', alignItems :'center', height:60}}>
        <ScrollView
          horizontal
        >
          {
              route?.params?.listTickets?.map((item, key)=><View key={key} style={{padding:10, borderRadius : 10, backgroundColor : "#095097", marginRight : 5}}><Text style={{color : "#FFF", fontWeight : 'bold'}} >Nro {item.number}</Text></View>)
          }
        </ScrollView>
      </View>
      <Text style={styles.style_title}>
        Formulario de Registro
      </Text>
      <View style={styles.container_box}>
        <Image
            source={{
                uri : URL_IMG_QR,
                height : 350,
                width :350
            }}
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
    </View>
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
        height : "60%", 
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