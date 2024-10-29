import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function CardCollapsable({
    number_ticket, 
    }) {
    
  return (
    <View>
        <TouchableOpacity style={{height :  60, borderBottomWidth : 1, borderColor :"#6D6D6D", display : 'flex', flexDirection : 'row', alignItems : 'center'}} >
            <View>
                <Text style={{ fontSize : 15}}>Ticket Pendiente</Text>
                <Text style={{fontWeight : 'bold', fontSize : 20}}>Nro {number_ticket}</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Text>Check</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    </View>
  )
}