import React, { useCallback, useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Cities from "./Cities";
import DetailedReport from "./DetailedReport";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { fetchLocations, fetchWeatherForecast } from "../api/weather";


const HomeScreen = ({navigation}) => {

    const [showSearch, toggleSearch] = useState(true);
    const [locations, setLocations] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [currentWeather, setCurrentWeather] = useState({});
    const [loading, setLoading] = useState(true);

    const handleLocation = (loc) => {
      //Remove all locations on pressing any location
      setLocations([]);
      toggleSearch(false);
      fetchWeatherForecast({id:loc.id}).then(data=>{
        setCurrentWeather(data);
      });
    }

    const handleSearch = event => {
      //fetch location api
      //if search has over 3 chars, only then call API
      const value = event.nativeEvent.text;

      // Clear any existing timeout
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      
      // Set a new timeout to make the API call after 1 second
      setSearchTimeout(setTimeout(() => {
        if (value.length > 3) {
          fetchLocations({ city: value }).then(data => {
            setLocations(data);
          });
          toggleSearch(true);
        } else {
          toggleSearch(false);
        }
      }, 1000));
    }

    useEffect(() => {
      fetchWeatherForecast({ id: 2662445 })
        .then(data => {
          setCurrentWeather(data);
          setLoading(false);
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.mainWrapper}>
            <Text style={styles.sectionTitle}>Akhil's Weather App</Text>
            <KeyboardAvoidingView style={styles.writeInputWrapper}>
              <TextInput style={styles.input} onChange={handleSearch} placeholder='Search for a location...' placeholderTextColor="#3C3C43" selectionColor={'#EBEBF5'}/>
              <TouchableOpacity style={styles.locationContainer}>
                <Feather style={styles.feather} name="search" size={24}/>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            {
              loading ? ( // Render activity indicator while loading
              <ActivityIndicator size="large" color="white" />
              ) : (
                locations.length>0 && showSearch ? (
                  <View style={styles.locList}>
                    {
                      locations.map((loc,index) => {
                        let showBorder = index+1 != locations.length;

                        // No border for last element
                        const indLoc = {
                          padding: 8,
                          paddingHorizontal: 4,
                          marginBottom: 1,
                          ...(showBorder && {
                            borderBottomWidth: 1,
                            borderBottomColor: '#E0E0E0'
                          })
                        };

                        return (
                          <TouchableOpacity onPress={()=> handleLocation(loc)} key={index} style={indLoc}>
                            <Text>{loc?.name}, {loc?.country}</Text>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                ):null
              )
            }
          </View> 

          {loading ? (
            <ActivityIndicator size="large" color="white" />  
          ):
          (
            <ScrollView style={styles.scrollStyle}>
                <Cities navigation={navigation} currentWeather={currentWeather} />
            </ScrollView>
          )}   
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#48319D',
    },
    mainWrapper:{
      paddingTop:30,
      paddingHorizontal:20,
    },
    sectionTitle:{
      color:'#FFF',
      fontSize:24,
      fontWeight:'600',
      paddingBottom:15,
      paddingHorizontal: 65,
    },
    writeInputWrapper:{
      flexDirection:'row',
      padding:8,
      width:'100%',
      justifyContent:'space-between',
      alignItems:'center',
      backgroundColor:'#1F1D47',
      borderRadius:10,
    },
    input:{
      paddingLeft:12,
      color:'#EBEBF5'
    },
    feather:{
      color:'#EBEBF5'
    },
    scrollStyle:{
      paddingTop:40,
      paddingHorizontal:20
    },
    newContainer:{
      flex:1,
      backgroundColor:'#1F1D47',
    },
    locList:{
      width:'100%',
      backgroundColor: 'white',
      borderRadius: 10,
    },
  });

  export default HomeScreen;