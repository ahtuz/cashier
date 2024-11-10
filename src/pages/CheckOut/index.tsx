import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const CheckOut = ({ route }) => {
  const [totalPayment, setTotalPayment] = useState("");
  const [totalChange, setTotalChange] = useState(0);
  const [payment, setPayment] = useState(false);
  const [canPay, setCanPay] = useState(false);
  const { totalOrder } = route.params;

  const calculatorOnPress = (input) => {
    if (input == "Del" && totalPayment != "") {
      setTotalPayment(totalPayment.slice(0, -1))
    } else if (input != "Del") {
      setTotalPayment(totalPayment + input);
    }
  }

  const paymentOnPress = () =>{
    setPayment(true);
  }

  useEffect(() => {
    setCanPay(false);
    console.log("total payment: " + totalPayment)
    console.log("total order: " + totalOrder)
    if (parseInt(totalPayment) >= totalOrder) {
      setCanPay(true);
    }

    if (payment === true) {
      setTotalChange(parseInt(totalPayment) - totalOrder);
      setPayment(false);
    }
  }, [payment, totalPayment])

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 2}}>
        <View style={{flex: 1, padding: '2%'}}>
          <Text style={{textAlign: 'center', paddingBottom: '3%'}}>Total Pesanan</Text>
          <Text>{totalOrder}</Text>
        </View>
        <View style={{flex: 1, padding: '2%'}}>
          <Text  style={{textAlign: 'center', paddingBottom: '3%'}}>Total Pembayaran</Text>
          <Text>{totalPayment}</Text>
        </View>
        <View style={{flex: 1, padding: '2%'}}>
          <Text  style={{textAlign: 'center', paddingBottom: '3%'}}>Pengembalian</Text>
          <Text>{totalChange}</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity style={styles.calculatorButton} onPress={() => calculatorOnPress(1)}>
            <Text style={styles.calculatorText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calculatorButton} onPress={() => calculatorOnPress(2)}>
            <Text style={styles.calculatorText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calculatorButton} onPress={() => calculatorOnPress(3)}>
            <Text style={styles.calculatorText}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity style={styles.calculatorButton} onPress={() => calculatorOnPress(4)}>
            <Text style={styles.calculatorText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calculatorButton} onPress={() => calculatorOnPress(5)}>
            <Text style={styles.calculatorText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calculatorButton} onPress={() => calculatorOnPress(6)}>
            <Text style={styles.calculatorText}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity style={styles.calculatorButton} onPress={() => calculatorOnPress(7)}>
            <Text style={styles.calculatorText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calculatorButton} onPress={() => calculatorOnPress(8)}>
            <Text style={styles.calculatorText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calculatorButton} onPress={() => calculatorOnPress(9)}>
            <Text style={styles.calculatorText}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity style={styles.calculatorButton} onPress={() => calculatorOnPress(0)}>
            <Text style={styles.calculatorText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calculatorButton} onPress={() => calculatorOnPress(".")}>
            <Text style={styles.calculatorText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calculatorButton} onPress={() => calculatorOnPress("Del")}>
            <Text style={styles.calculatorText}>Del</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity disabled = { !canPay } style={canPay ? styles.payButton: styles.disabledPayButton} onPress={() => paymentOnPress()}>
          <Text style={{flex: 1, textAlign: 'center', textAlignVertical: 'center'}}>Bayar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CheckOut

const styles = StyleSheet.create({
  calculatorButton: {
    backgroundColor: '#C7C7C7',
    width: '20%',
    borderRadius: 20,
    padding: '3%',
    marginVertical: '2%'
  },
  calculatorText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  payButton: {
    flex: 2, 
    borderRadius: 50, 
    width: '50%', 
    backgroundColor: '#ADE9A8', 
    marginVertical: '2%', 
    alignSelf: 'center'
  },
  disabledPayButton: {
    flex: 2, 
    borderRadius: 50, 
    width: '50%', 
    backgroundColor: '#DFDFDF', 
    marginVertical: '2%', 
    alignSelf: 'center'
  }
})