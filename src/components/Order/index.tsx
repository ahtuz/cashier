import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Order = ({name, price, qty, onPressOrderItem}) => {
  return (
    <TouchableOpacity onPress={onPressOrderItem} style={styles.orderItemContainer}>
      <View style={{flex: 3, marginRight: '5%'}}>
        <Text style={{marginBottom: '2%'}}>{name}</Text>
        <Text style={{fontWeight: 'bold', textAlign: 'right'}}>{price}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{fontWeight: 'bold'}}>× {qty}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Order

const styles = StyleSheet.create({
  orderItemContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 18, 
    padding: '3%',
    paddingLeft: '5%',
    backgroundColor: '#C7C7C7', 
    marginTop: '2%',
  },
})