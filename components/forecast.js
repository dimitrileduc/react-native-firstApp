import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, ScrollView } from "react-native"
import { format } from "date-fns";
import {fr} from "date-fns/locale"
import Weather from "./weather"
import { stylesForecast } from "./styles/StylesForecast";

export default function Forecast  ({ data})  {
  const [forecasts, setForecasts] = useState([])
  useEffect(() => {
    const forecastsData = data.list.map(f => {
      const dt = new Date (f.dt*1000)
      return ({
        date: dt,
        hour: dt.getHours(),
        temp: Math.round(f.main.temp),
        icon: f.weather[0].icon,
        name: format(dt,"EEEE", {locale:fr})
      })
    })

    let newForecastsData = forecastsData.map(forecast =>{
      return forecast.name
    }).filter((day, index, self) => {
      return self.indexOf(day) === index
      }).map((day)=> {
        return {
          day,
          data: forecastsData.filter((forecast)=> forecast.name ===day)
        }
      })
      console.log(newForecastsData)

    setForecasts(newForecastsData)
  }, [data])

  
  return(
    <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={stylesForecast.scroll}
    
    >
      {forecasts.map(f => (
        <View>
          <Text style={stylesForecast.day}>{f.day.toUpperCase()} </Text>
          <View style={stylesForecast.container}>
            {f.data.map(w => <Weather forecast={w} />)}
          
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

