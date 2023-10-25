import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';

const API_KEY = 'W85BN2NQ3OB6S23G';

const StockApp = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const symbols = ['AAPL', 'GOOGL', 'TSLA', 'MSFT','AMZN'];
    //,'IBM','TSCO.LON','AMZN','FB','NFLX','NVDA','JPM','JNJ','PG','DIS','INTC','KO'

    const fetchData = async () => {
      const promises = symbols.map(async (symbol) => {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`
        );
        return { symbol, data: response.data };
      });

      const results = await Promise.all(promises);
      setStockData(results);
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    const { symbol, data } = item;
    const latestData = data['Time Series (5min)'];

    if (!latestData) {
      // Handle the case where latestData is undefined or empty
      return (
        <View style={styles.item}>
          <Text>{symbol}</Text>
          <Text>Data not available</Text>
        </View>
      );
    }

    // const latestDataKeys = Object.keys(latestData);
    // const latestDataPoint = latestData[latestDataKeys[0]];
  
    return (
      // <View style={styles.item}>
      //   <Text style={styles.symbol}>{symbol}</Text>
      //   <Text>Open: {latestDataPoint['1. open']}</Text>
      //   <Text>High: {latestDataPoint['2. high']}</Text>
      //   <Text>Low: {latestDataPoint['3. low']}</Text>
      //   <Text>Close: {latestDataPoint['4. close']}</Text>
      // </View>
      <View style={styles.item}>
  <Text>{symbol}</Text>
  {Object.keys(latestData).length > 0 && (
    <>
      <Text>Open: {latestData[Object.keys(latestData)[0]]['1. open']}</Text>
      <Text>High: {latestData[Object.keys(latestData)[0]]['2. high']}</Text>
      <Text>Low: {latestData[Object.keys(latestData)[0]]['3. low']}</Text>
      <Text>Close: {latestData[Object.keys(latestData)[0]]['4. close']}</Text>
    </>
  )}
</View>
      
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stockData}
        renderItem={renderItem}
        keyExtractor={(item) => item.symbol}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  
  item: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  // symbol: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // },
});


export default StockApp;


