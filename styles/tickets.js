import { StyleSheet } from "react-native";

export const stylesTickets = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor :"#FFFF",
        padding : 10
    },
    box_styles : {
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
    title_style :{
        fontSize : 24,
        fontWeight : 'bold'
    },
    style_subtitle :{
        fontWeight :'bold',
        fontSize : 18
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