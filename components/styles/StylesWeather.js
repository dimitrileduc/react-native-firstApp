import { StyleSheet } from 'react-native';

const stylesWeather = StyleSheet.create({

  

  container: {
    backgroundColor:"#E7E8E6",
    height:140,
    width:75,
    paddingVertical:6,
    justifyContent:"center",
    alignItems:"center",
    
    marginRight: 10,
    borderRadius:50
  },
  image:{
    width:50,
    height:50
  },
  temp: {
    fontSize: 18,
    fontWeight: "bold"
  }


   
});

export { stylesWeather }