import { useMemo, useRef } from 'react';
import { Text, View, FlatList, useWindowDimensions } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import OrderItem from '../../components/OrderItem';
import orders from '../../../assets/data/orders.json';
import MapView, { Marker } from 'react-native-maps';
import { Entypo } from '@expo/vector-icons';

const OrdersScreen = () => {
  const bottomSheetRef = useRef(null);
  const { width, height } = useWindowDimensions();

  const snapPoints = useMemo(() => ['12%', '95%'], []);

  // AIzaSyCtnIrQHEFOYPWc3JYjNptJdj0kk2U0os0

  return (
    <View style={{ backgroundColor: 'lightblue', flex: 1 }}>
      <MapView
        style={{ width, height }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {orders.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.Restaurant.lat,
              longitude: marker.Restaurant.lng,
            }}
            title={marker.Restaurant.name}
            description={marker.Restaurant.address}
          >
            <View
              style={{ backgroundColor: '#fff', padding: 3, borderRadius: 20 }}
            >
              <Entypo name="shop" size={24} color="green" />
            </View>
          </Marker>
        ))}
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: 'grey', width: 50 }}
      >
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: '700', paddingBottom: 5 }}>
            Você Está On Line
          </Text>
          <Text style={{ letterSpacing: 0.5, color: 'grey' }}>
            Pedidos Disponíveis: {orders.length}
          </Text>
        </View>
        <FlatList
          data={orders}
          renderItem={({ item }) => <OrderItem order={item} />}
        />
      </BottomSheet>
    </View>
  );
};

export default OrdersScreen;
