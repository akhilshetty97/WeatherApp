import React from "react";
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Cities = ({navigation,currentWeather}) => {
    const formatTime = () => {
        let localTime = currentWeather?.location?.localtime;
        // Create a new Date object using the localtime string
        const dateObject = new Date(localTime);

        // Get hours and minutes from the Date object
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();

        // Determine whether it's AM or PM
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        const formattedHours = hours % 12 || 12;

        // Construct the time string in AM/PM format
        const timeString = formattedHours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
        return timeString;
    }
    
    
    return (
        <TouchableOpacity style={styles.cityWrapper} onPress={()=>{
            navigation.navigate('DetailedReport', { currentWeather: currentWeather });
        }}>
            <View style={styles.firstRow}>
                <View>
                    <Text style={styles.cityName}>{currentWeather?.location?.name}</Text> 
                    <Text style={styles.time}>{formatTime()}</Text> 
                </View>
                <View style={styles.tempWrapper}>
                    <View style={styles.fWrapper}>
                        <Text style={styles.tempF}>{currentWeather?.current?.temp_f}</Text>
                        <MaterialCommunityIcons style={styles.iconF} name="temperature-fahrenheit" size={24} color="white" /> 
                    </View>
                    <View style={styles.cWrapper}>
                        <Text style={styles.tempC}>{currentWeather?.current?.temp_c}</Text>
                        <MaterialCommunityIcons style={styles.iconC} name="temperature-celsius" size={24} color="white" />
                    </View>        
                </View> 
            </View>
            <View style={styles.weatherMinMaxWrapper}>
                <Text style={styles.weather}>{currentWeather?.current?.condition?.text}</Text>
                <View style={styles.maxMinWrapper}>
                    <Text style={styles.maxTemp}>H:{currentWeather?.forecast?.forecastday[0]?.day?.maxtemp_f}</Text>
                    <Text style={styles.minTemp}>L:{currentWeather?.forecast?.forecastday[0]?.day?.mintemp_f}</Text>
                </View>
            </View>      
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    cityWrapper:{
        backgroundColor:'#1F1D47',
        borderRadius:10,
        width:'100%',
        padding:20,
        marginBottom:20,
    },
    firstRow:{
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between'
    },
    cityName:{
        color:'#EBEBF5',
        fontSize:20,
        fontWeight:'bold'
    },
    time:{
        color:'#EBEBF5',
        fontSize:13,
    },


    tempWrapper:{
        flexDirection:'row',
        color:'#EBEBF5',
        fontSize:17,
    },
    fWrapper:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:10
    },
    cWrapper:{
        flexDirection:'row',
        alignItems:'center'
    },
    tempF:{
        color:'#EBEBF5',
        fontSize:30,
    },
    iconF:{
        color:'#EBEBF5',
        fontSize:33,
    },
    iconC:{
        color:'#EBEBF5',
        fontSize:33,
    },
    tempC:{
        color:'#EBEBF5',
        fontSize:30,
    },

    weatherMinMaxWrapper:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop:20
    },
    weather:{
        color:'#EBEBF5',
        fontSize:15,
    },
    maxMinWrapper:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:5,
    },
    maxTemp:{
        color:'#EBEBF5',
        marginHorizontal:15
    },
    minTemp:{
        color:'#EBEBF5',
    }
})


export default Cities;