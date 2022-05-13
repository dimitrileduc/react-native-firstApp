import React, {useState,useEffect }   from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView } from 'react-native';
import { isSameDay } from 'date-fns';

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`

export default  function CurrentWeather({ data }){
  const [currentWeather, setCurrentWeather] = useState(null)
  
    useEffect(() => {
      const currentW = data.list.filter(forecast => {
      const today = new Date().getTime() + Math.abs(data.city.timezone *1000)
      const forecastDate = new Date(forecast.dt*1000)
      return isSameDay(today, forecastDate)
    
    })
    setCurrentWeather(currentW[0])
  }, [data])

  
  


  useEffect(() => {
    const currentW = data.list.filter(forecast => {
    const today = new Date().getTime() + Math.abs(data.city.timezone *1000)
    const forecastDate = new Date(forecast.dt*1000)
    return isSameDay(today, forecastDate)
  
  })
  setCurrentWeather(currentW[0])
}, [data])
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.city} >{data?.city?.name}</Text>
      <Text style={styles.today}>Today</Text>
      <Image 
        source={{ uri: getIcon(currentWeather?.weather[0].icon)}}
        style={styles.image}
      />

      <Text style={styles.temp}>{currentWeather?.main.temp}°</Text>
      <Text style={styles.description}>{currentWeather?.weather[0].description}</Text>
    </View>
  )

}
const COLOR = "#54565B"
const styles = StyleSheet.create({
  container: {
    marginTop:60,
    alignItems:"center",
    height: "65%"
  },
  city: {
    fontSize : 36,
    fontWeight: "500",
    
    color: COLOR
  },
  today: {
    fontSize : 24,
    fontWeight: "300",
    color: COLOR
  },
  image: {width:150, height:150, marginVertical: 20},
  temp: {
    fontSize : 80,
    fontWeight: "bold",
    color: COLOR
  },
  description: {
    fontSize : 24,
    fontWeight: "bold",
    color: COLOR
  }
})