import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Constants from "expo-constants"

export default function Home() {
    const URL_IMAGEN_LOGO = "https://res.cloudinary.com/dabyqnijl/image/upload/v1729831966/agpocw2m8hcwpe8xufey.png";
    const username= "Alvaro";
    const categoryUser = "Finanzas";
    const tickets_pending=[];
    return (
        <View style={styles.container} >
            <View>
                <Image
                    source={{
                        uri : URL_IMAGEN_LOGO
                    }}
                    style={{width : 360, height : 80}}
                />
            </View>
            <View style={{display:'flex', flexDirection : 'column', marginVertical : 20}} >
                <Text style={{...styles.style_title, }}>Bienvenido {username}</Text>
                <Text style={{ fontWeight : 'bold', color : "#FFFF", backgroundColor : "#084F96", borderRadius : 15, padding:5, width:100, textAlign:'center'}}>{categoryUser}</Text>
            </View>
            <View style={{...styles.style_container_box, marginTop : 20}} >
                <View style={styles.style_box}>  
                    <Text style={styles.style_title}>5</Text>
                    <Text>Rifas Pendientes</Text>
                </View>
                <View style={styles.style_box}>
                    <Text style={styles.style_title}>25</Text>
                    <Text>
                        Rifas Vendidas
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
                <Text style={{fontWeight : 'bold', fontSize : 22}}>Rifas Pendientes (0) </Text>

            </View>
            <TouchableOpacity style={styles.style_button}>
                <Text style={{textAlign : 'center', fontWeight : 'bold'}}>Vender Nueva Rifa</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor : "#FFFFFF",
        marginTop : Constants.statusBarHeight,
        paddingTop : 10,
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
        borderWidth : 1,
        borderColor : '#000000',
        borderRadius : 10,
        width : "100%",
        marginLeft : 15,
        display : 'flex',
        justifyContent : 'center',
        padding:10,
        textAlign : 'center',
        marginBottom : 25
    }
})