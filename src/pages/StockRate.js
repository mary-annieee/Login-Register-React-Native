import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const API_KEY = 'W85BN2NQ3OB6S23G';

const StockApp = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=${API_KEY}`
        );
        const data = response.data;
        const symbols = Object.keys(data['Time Series (5min)']);
        const stockDetails = symbols.map((symbol) => ({
          symbol,
          data,
        }));
        setStockData(stockDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    const { symbol, data } = item;
    const latestData = data['Time Series (5min)'];

    return (
      <View style={styles.item}>
        <Text>MSFT</Text>
        {Object.keys(latestData).map((timestamp) => (
          <View key={timestamp}>
            <Text>Timestamp: {timestamp}</Text>
            <Text>Open: {latestData[timestamp]['1. open']}</Text>
            <Text>High: {latestData[timestamp]['2. high']}</Text>
            <Text>Low: {latestData[timestamp]['3. low']}</Text>
            <Text>Close: {latestData[timestamp]['4. close']}</Text>
            <Text>--------------------------</Text>
          </View>
        ))}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default StockApp;