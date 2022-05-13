import React, {useState,useEffect }   from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from "axios";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';;

import CurrentWeather from "./components/currentWeather"
import Forecast from "./components/forecast"

import { stylesApp } from "./components/styles/StylesApp";


const API_URL = (lat,lon) =>  "https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c728df12326ce2d393585d06d1f41d26"


export default function App() {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)


  // 1. get user data
  useEffect(() => {
    const getCoordinates = async () => {
      const {status} = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted"){
        return
      }

      const userLocation = await Location.getCurrentPositionAsync()
      console.log(userLocation)
      getWeather(userLocation);

    }
  

    getCoordinates()
  },[]);



const getWeather = async (location) => {
  
  try{
    console.log(location.coords.latitude);
    //const response  = await axios.get(API_URL(location.coords.latitude,location.coords.longitude))
    const response  = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=c728df12326ce2d393585d06d1f41d26`);
    setData(response.data);
    setLoading(false);
    //console.log(response.data.list)


  } catch(e) {
    console.log("erreur getWethear")
  }

  
}
  

  // 2 serveur request


  // -> city 
  // > meteo now
  // --> meteo next
if (loading){
  return <View style={stylesApp.container}>
    <ActivityIndicator/>
  </View>
}


  return (
    <NavigationContainer>
    <View style={stylesApp.container}>
      <CurrentWeather data={data} />
      <Forecast data={data} />
      <StatusBar style="auto" />
    </View>
    </NavigationContainer>
  );
}



