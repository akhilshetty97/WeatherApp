import React from "react";
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput, Image,Touchable, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation , useRoute} from '@react-navigation/native';
import { weatherImages } from "../constants";

const DetailedReport = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { currentWeather } = route.params;
    const airQuality= ['Good','Moderate','Slightly Unhealthy','Unhealthy','Very Unhealthy','Hazardous'];
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={()=>{navigation.navigate('HomeScreen');}}>
                <Ionicons
                style={styles.backIcon}
                name="arrow-back-circle"
                />
            </TouchableOpacity>
            <View style={styles.contain}> 
                <View style={styles.mainWrapper}>
                    <Text style={styles.cityText}>{currentWeather?.location?.name}</Text>
                    <View style={styles.tempWrapper}>
                        <View style={styles.fWrapper}>
                            <Text style={styles.tempF}>{currentWeather?.current?.temp_f}</Text>
                            <MaterialCommunityIcons style={styles.iconF} name="temperature-fahrenheit"/> 
                        </View>
                        <View style={styles.cWrapper}>
                            <Text style={styles.tempC}>{currentWeather?.current?.temp_c}</Text>
                            <MaterialCommunityIcons style={styles.iconC} name="temperature-celsius"/>
                        </View>    
                    </View>
                    <Text style={styles.weatherCondition}>{currentWeather?.current?.condition?.text}</Text>
                    <View style={styles.minMaxWrapper}>
                        <Text style={styles.hTemp}>H:{currentWeather?.forecast?.forecastday[0]?.day?.maxtemp_f} </Text>
                        <Text style={styles.lTemp}>L:{currentWeather?.forecast?.forecastday[0]?.day?.mintemp_f} </Text>
                    </View>
                </View>    
                <Image style={styles.icon} source={weatherImages[currentWeather?.current?.condition?.text]} resizeMode="contain"/>
                <View style={styles.feelsLike}>
                    <View style={styles.iconTempWrapper}>
                        <FontAwesome6 style={styles.tempIcon} name="temperature-low"/>
                        <Text style={styles.feelLikeText}>FEELS LIKE</Text>
                    </View>
                    <View style={styles.tempCWrapper}>
                        <Text style={styles.feelLikeTemp}>{currentWeather?.current?.feelslike_f}</Text>
                        <MaterialCommunityIcons style={styles.iconCFeel} name="temperature-celsius" />
                    </View>  
                </View>
                <View style={styles.sunSeaWrapper}>           
                    {
                        (currentWeather?.current?.is_day) ? (
                            <View style={styles.sunWrapper}>
                                <View style={styles.sunTimes}>
                                    <Feather style={styles.sunriseIcon} name="sunset"/>
                                    <Text style={styles.sunText}>SUNSET</Text>
                                </View>
                                <Text style={styles.sunClock}>{currentWeather?.forecast?.forecastday[0]?.astro?.sunset}</Text>
                            </View>
                        ): (
                            <View style={styles.sunWrapper}>
                                <View style={styles.sunTimes}>
                                    <Feather style={styles.sunriseIcon} name="sunrise"/>
                                    <Text style={styles.sunText}>SUNRISE</Text>
                                </View>
                                <Text style={styles.sunClock}>{currentWeather?.forecast?.forecastday[0]?.astro?.sunrise}</Text>
                            </View>
                        )
                    }
                    <View style={styles.seaWrapper}>
                        <View style={styles.seaLevel}>
                            <MaterialIcons style={styles.seaIcon} name="water"/>
                            <Text style={styles.airText}>AIR QUALITY</Text>
                        </View>
                        <Text style={styles.airMeasure}>{airQuality[currentWeather?.current?.air_quality["us-epa-index"]-1]}</Text>
                    </View>
                    
                </View>
                <View style={styles.windBox}>
                    <View style={styles.windHeader}>
                        <Feather style={styles.windIcon} name="wind"/>
                        <Text style={styles.windText}>WIND</Text>
                    </View>
                    <Text style={styles.windSpeed}>{currentWeather?.current?.wind_mph} mph</Text>
                </View>
            </View>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#1F1D47',
    },
    contain:{
        flexDirection:'column',
        alignItems:'center'
    },
    mainWrapper:{
        flexDirection:'column',
        alignItems:'center'
    },
    backIcon:{
        marginLeft:25,
        marginTop:25,
        fontSize:50,
        color:'#EBEBF5',
    },
    tempWrapper:{
        flexDirection:'row',
        marginVertical:10,
    },
    fWrapper:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15
    },
    cWrapper:{
        flexDirection:'row',
        alignItems:'center'
    },
    iconF:{
        color:'#EBEBF5',
        fontSize:70,
        marginRight:18,
        marginLeft:-10
    },
    iconC:{
        color:'#EBEBF5',
        fontSize:70,
        marginLeft:-10
    },
    minMaxWrapper:{
        flexDirection:'row',
    },
    cityText:{
        color:'#EBEBF5',
        fontSize:45,
    },
    tempF:{
        color:'#EBEBF5',
        fontSize:60,
        fontWeight:'500',
    },
    tempC:{
        color:'#EBEBF5',
        fontSize:60,
        fontWeight:'500'
    },
    weatherCondition:{
        color:'#EBEBF5',
        fontSize:20
    },
    hTemp:{
        color:'#EBEBF5',
        fontSize:20,
        fontWeight:'500',
        paddingHorizontal:3
    },
    lTemp:{
        color:'#EBEBF5',
        fontWeight:'500',
        fontSize:20,
        paddingHorizontal:3
    },
    icon:{
        width:200,
        height:150,
        paddingTop:30
    },
    feelsLike:{
        padding:20,
        backgroundColor:'#48319D',
        borderRadius:10,
        marginTop:20,
        width:'80%',
    },
    iconTempWrapper:{
        flexDirection:'row',
        alignItems:'center'
    },
    tempIcon:{
        color:'#EBEBF5',
        fontSize:16,
    },
    tempCWrapper:{
        marginTop:15,
        flexDirection:'row',
        alignItems:'center'
    },
    feelLikeTemp:{
        color:'#EBEBF5',
        fontSize:40,
    },
    iconCFeel:{
        color:'#EBEBF5',
        fontSize:40,
        marginLeft:-2
    },
    sunSeaWrapper:{
        flexDirection:'row',
        marginTop:20,
        width:'80%',
        alignItems:'center',
        justifyContent:'space-between'
    },
    sunWrapper:{
        padding:20,
        backgroundColor:'#48319D',
        borderRadius:10,
        flexDirection:'column',
        alignItems:'center'
    },
    sunTimes:{
        flexDirection:'row',
        alignItems:'center'
    },
    seaLevel:{
        flexDirection:'row',
        alignItems:'center'
    },
    windBox:{
        padding:20,
        backgroundColor:'#48319D',
        borderRadius:10,
        marginTop:20,
        width:'80%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    feelLikeText:{
        color:'#EBEBF5',
        marginHorizontal:5
    },
    sunriseIcon:{
        color:'#EBEBF5',
        marginHorizontal:5,
        fontSize:16 
    },
    sunText:{
        color:'#EBEBF5'
    },
    sunClock:{
        color:'#EBEBF5',
        marginTop:8,
        fontSize:22,
        fontWeight:'bold'
    },
    seaWrapper:{
        padding:20,
        backgroundColor:'#48319D',
        borderRadius:10,
        flexDirection:'column',
        alignItems:'center'
    },
    airMeasure:{
        color:'#EBEBF5',
        marginTop:8,
        fontSize:14,
        fontWeight:'bold'
    },
    seaIcon:{
        color:'#EBEBF5',
        marginHorizontal:5,
        fontSize:16 
    },
    airText:{
        color:'#EBEBF5'
    },
    windHeader:{
        flexDirection:'row'
    },
    windIcon:{
        color:'#EBEBF5',
        marginHorizontal:5,
        fontSize:16 
    },
    windText:{
        color:'#EBEBF5',
        fontSize:16 
    },
    windSpeed:{
        color:'#EBEBF5',
        fontSize:16,
        fontWeight:'bold'
    }
}
)




export default DetailedReport;