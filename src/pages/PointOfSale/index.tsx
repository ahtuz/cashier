import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Search from '../../components/Search';
import Order from '../../components/Order';
import PropTypes from 'prop-types';
import Navigation from '../../navigations/navigation';
import { db, getDocs, collection, query, where } from '../../firebase/firebase';
import searchLogo from '../../assets/images/magnifier.png';
import scanBarcodeLogo from '../../assets/images/barcode.png';

type searchItem = {
  id: string,
  name: string,
  price: number,
  stock: number
};

const SearchMain = ({onPressSearchItem}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [noResult, setNoResult] = useState(false);
  const [searchItems, setSearchItem] = useState<searchItem[]>([]);

  const onPressSearchItemQuery = async(searchQuery) => {
    setNoResult(false);
    setSearchItem([]);
    console.log('search: ', searchQuery);
    const q = query(collection(db, 'items'), where('name', '>=', searchQuery), where('name', '<=', searchQuery+ '~'))
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      setNoResult(true);
    }
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      setSearchItem(searchItems => [...searchItems, {
        id: doc.id,
        name: doc.data().name,
        price: doc.data().price,
        stock: doc.data().stock
      }]);
    });
  }

  return (
    <View style={styles.searchMainContainer}>
      <View style={styles.searchBarContainer}>
        <TextInput placeholder='Cari' style={styles.searchInput} onChangeText={newText => setSearchQuery(newText)}></TextInput>
        <TouchableOpacity onPress={() => onPressSearchItemQuery(searchQuery)} style={styles.searchButton}>
          <Image source={searchLogo} style={styles.searchLogo}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.searchResultContainer}>
        <ScrollView>
          <View style={styles.noViewContainer}>
            { noResult ? <Text>Barang tidak ditemukan.</Text> : null }
          </View>
          <View style={styles.searchResultScrollContainer}>
            {
              searchItems.map(searchItem => {
                return (
                  <Search key={searchItem.id} name={searchItem.name} price={searchItem.price} stock={searchItem.stock} onPressSearchItem={() => onPressSearchItem(searchItem)}/>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const OrderMain = ({navigation, orderItems, onPressOrderItem}) => {
  const [totalOrder, setTotalOrder] = useState(0);

  useEffect(() => {
    setTotalOrder(orderItems.reduce((totalOrder, orderItems) => totalOrder + (orderItems.price * orderItems.qty), 0))
  }, [orderItems])

  const onPressConfirmation = (totalOrder) => {
    navigation.navigate('CheckOut', {
      totalOrder: totalOrder
    });
  }

  return (
    <View style={styles.orderMainContainer}>
      <Text style={styles.textOrderDetailTitle}>Detail Pesanan</Text>
      <View style={styles.orderItemListContainer}>
        <ScrollView style={{marginVertical: '1%'}}>
          {
            orderItems.map((orderItem) => {
              return (
                <Order key={orderItem.id} name={orderItem.name} price={orderItem.price} qty={orderItem.qty} onPressOrderItem={() => {onPressOrderItem(orderItem)}}/>
              )
            })
          }
        </ScrollView>
      </View>
      <View style={styles.totalOrderPriceContainer}>
        <Text>Total</Text>
        <Text style={styles.textTotalOrderPrice}>{totalOrder}</Text>
      </View>
      <TouchableOpacity onPress={() => onPressConfirmation(totalOrder)} style={styles.confirmationButton}>
          <Text>Konfirmasi</Text>
      </TouchableOpacity>
    </View>
  )
}

OrderMain.propTypes = {
  orderItems: PropTypes.array
};

type orderItem = {
  id: number,
  name: string,
  price: number,
  qty: number
};

const PointOfSale = ({navigation}) => {
  const [orderItems, setOrderItems] = useState([
    {
      id: "1",
      name: "order name",
      price: 3000,
      qty: 5
    }
  ]);
  
  const addToOrder = (searchItem: searchItem) => {
    const index = orderItems.findIndex((orderItem) => orderItem.id === searchItem.id)
    if (index >= 0) { // Add quantity.
      if (searchItem.stock === orderItems[index].qty) {
        alert("Jumlah maksimal stok barang sudah ditambahkan ke pesanan.");
      } else {
        orderItems[index].qty++;
        setOrderItems([...orderItems]);
      }
    } else { // Add new item.
      setOrderItems([...orderItems, {
        id: searchItem.id,
        name: searchItem.name,
        qty: 1,
        price: searchItem.price
      }]);
    }
  };

  const removeFromOrder = (selectedItem) => {
    const index = orderItems.findIndex((orderItem) => orderItem.id === selectedItem.id)
    if (index >= 0) {
      if (orderItems[index].qty == 1) {
        setOrderItems([
          ...orderItems.slice(0, index),
          ...orderItems.slice(index + 1, orderItems.length)
        ]);
      } else {
        orderItems[index].qty--;
      setOrderItems([...orderItems]);
      }
      
    }
  }

  return (
    <View style={styles.bg}>
      <View style={styles.searchPanelContainer}>
        <View style={styles.headerPanelContainer}>
          <Text style={styles.title}>JJPOS</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CameraPage')} style={styles.scanBarcodeButton}>
            <Image source={scanBarcodeLogo} style={styles.scanBarcodeLogo}></Image>
          </TouchableOpacity>
        </View>
        <SearchMain onPressSearchItem={addToOrder}/>
      </View>
      <OrderMain navigation={navigation} orderItems={orderItems} onPressOrderItem={removeFromOrder}/>
    </View>
  )
}

export default PointOfSale;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#2D2D2D',
    flexDirection: 'row',
  },
  searchPanelContainer: {
    flex: 3,
    padding: '1%',
  },
  headerPanelContainer: {
    flexDirection: 'row',
  },
  orderMainContainer: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    padding: '1%',
  },
  title: {
    flex: 8,
    color: '#DFDFDF',
    fontWeight: 'bold',
    marginVertical: '2%',
    marginLeft: '3%',
  },
  searchMainContainer: {
    flex: 1,
  },
  searchBarContainer: {
    flexDirection: 'row',
  },
  searchInput: {
    flex: 8,
    borderRadius: 18,
    backgroundColor: '#D9D9D9',
    paddingVertical: '1%',
    marginBottom: '1%',
    paddingLeft: '2%',
  },
  searchLogo: {
    flex: 1,
    resizeMode: 'contain',
    width: '40%',
    maxWidth: '100%',
    height: 'auto',
  },
  searchButton: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    borderRadius: 18,
    paddingVertical: '1%',
    paddingHorizontal: '1%',
    marginBottom: '1%',
    marginLeft: '1%',
    alignItems: 'center',
  },
  searchResultContainer: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    borderRadius: 18,
    padding: '1%',
  },
  noViewContainer: {
    flex: 1,
    padding: '1%',
  },
  searchResultScrollContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  scanBarcodeButton: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    borderRadius: 18,
    paddingVertical: '1%',
    paddingHorizontal: '1%',
    marginBottom: '1%',
    marginLeft: '1%',
    alignItems: 'center',
  },
  scanBarcodeLogo: {
    flex: 1,
    resizeMode: 'contain',
    width: '40%',
    maxWidth: '100%',
    height: 'auto',
  },
  confirmationButton: {
    backgroundColor: '#ADE9A8',
    borderRadius: 18,
    alignItems: 'center',
    marginHorizontal: '2%',
  },
  searchItemContainer: {
    backgroundColor: '#C7C7C7',
    borderRadius: 18,
    padding: '2%',
    margin: '1%',
    width: '23%'
  },
  textOrderDetailTitle: {
    paddingVertical: '2%',
    fontWeight: 'bold', 
    textAlign: 'center',
    borderBottomWidth: 1,
  },
  textSearchButtonTitle: {
    paddingVertical: '2%',
    textAlign: 'center',
  },
  textTotalOrderPrice: {
    fontWeight: 'bold'
  },
  totalOrderPriceContainer: {
    borderTopWidth: 1,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '2%',
  },
  orderItemListContainer: {
    flex: 1
  },
})