import { StyleSheet, Text, View } from 'react-native';
import { useRef, useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import styles from './styles';

import orders from '../../../assets/data/orders.json';

const order = orders[0];

const OrdersDelivery = () => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['12%', '95%'], []);
  return (
    <View style={{ backgroundColor: 'lightblue', flex: 1 }}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <View style={styles.header}>
          <Text style={styles.textHeader}>14 min</Text>
          <FontAwesome5
            style={styles.icon}
            name="shopping-bag"
            size={30}
            color="#3fc060"
          />
          <Text style={styles.textHeader}>5 km</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.restaurantName}>{order.Restaurant.name}</Text>
          <View style={styles.addressContainer}>
            <Fontisto name="shopping-store" size={20} color="grey" />
            <Text style={styles.addressText}>{order.Restaurant.address}</Text>
          </View>
          <View style={styles.addressContainer}>
            <Ionicons name="location-sharp" size={20} color="grey" />
            <Text style={styles.addressText}>{order.User.address}</Text>
          </View>
          <View style={styles.dishesContainer}>
            <Text style={styles.dish}>Anéis de Cebola x1</Text>
            <Text style={styles.dish}>Big Mac x3</Text>
            <Text style={styles.dish}>Big Tasty x2</Text>
            <Text style={styles.dish}>Coca-Cola x1</Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default OrdersDelivery;
