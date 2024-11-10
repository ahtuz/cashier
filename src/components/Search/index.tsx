import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Search = ({name, price, stock, onPressSearchItem}) => {
  return (
    <TouchableOpacity onPress={onPressSearchItem} style={styles.searchItemContainer}>
      <View>
        <Text>{name}</Text>
        <Text style={{fontWeight: 'bold', textAlign: 'right'}}>{price}</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: '3%'}}>
        <Text>Stok: </Text>
        <Text>{stock}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Search

const styles = StyleSheet.create({
    searchItemContainer: {
        backgroundColor: '#C7C7C7',
        borderRadius: 18,
        padding: '2%',
        margin: '1%',
        width: '23%'
      },
})