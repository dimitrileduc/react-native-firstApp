import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, ScrollView,Image } from "react-native"
import { stylesWeather } from "./styles/StylesWeather";

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`

export default function Weather  ({ forecast })  {
  return(
    <View style={stylesWeather.container}>
       
        <Text>{forecast.hour}h</Text>
        <Image 
        source={{ uri: getIcon(forecast?.icon)}}
        style={stylesWeather.image}
      />
        <Text style={stylesWeather.temp} >{forecast.temp}°</Text>
    </View>
  )

}

