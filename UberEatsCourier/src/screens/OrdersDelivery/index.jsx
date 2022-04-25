import {
  Text,
  View,
  useWindowDimensions,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useRef, useMemo, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Fontisto, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import styles from './styles';
import MapView, { Marker } from 'react-native-maps';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { REACT_APP_GOOGLE_API } from '../../config/config';

import orders from '../../../assets/data/orders.json';

const order = orders[0];

const restaurantLocation = {
  latitude: order.Restaurant.lat,
  longitude: order.Restaurant.lng,
};
const userLocation = {
  latitude: order.User.lat,
  longitude: order.User.lng,
};

const ORDER_STATUSES = {
  READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  ACCEPTED: 'ACCEPTED',
  PICKED_UP: 'PICKED_UP',
};

const OrdersDelivery = () => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalKm, setTotalKm] = useState(0);
  const [deliveryStatus, setDeliveryStatus] = useState(
    ORDER_STATUSES.READY_FOR_PICKUP
  );
  const [isDriverClose, setIsDriverClose] = useState(false);

  const navigation = useNavigation();

  const bottomSheetRef = useRef(null);
  const mapRef = useRef(null);
  const { width, height } = useWindowDimensions();
  const snapPoints = useMemo(() => ['12%', '95%'], []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (!status === 'granted') {
        console.log('Não Permitido');
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setDriverLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
    const foregroundSubscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 500,
      },
      updatedLocation => {
        setDriverLocation({
          latitude: updatedLocation.coords.latitude,
          longitude: updatedLocation.coords.longitude,
        });
      }
    );
    return foregroundSubscription;
  }, []);

  if (!driverLocation || !order) {
    <ActivityIndicator size={'large'} color="grey" />;
  }

  const onButtonPressed = () => {
    if (deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP) {
      bottomSheetRef.current.collapse();
      mapRef.current.animateToRegion({
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setDeliveryStatus(ORDER_STATUSES.ACCEPTED);
    }
    if (deliveryStatus === ORDER_STATUSES.ACCEPTED) {
      bottomSheetRef.current.collapse();
      setDeliveryStatus(ORDER_STATUSES.PICKED_UP);
    }
    if (deliveryStatus === ORDER_STATUSES.PICKED_UP) {
      bottomSheetRef.current.collapse();
      console.warn('Entrega Finalizada');
      navigation.goBack();
    }
  };

  const renderButtonTitle = () => {
    if (deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP) {
      return 'Aceitar Pedido';
    }
    if (deliveryStatus === ORDER_STATUSES.ACCEPTED) {
      return 'Retirar Pedido';
    }
    if (deliveryStatus === ORDER_STATUSES.PICKED_UP) {
      return 'Completar a Entrega';
    }
  };

  const isButtonDisabled = () => {
    if (deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP) {
      return false;
    }
    if (deliveryStatus === ORDER_STATUSES.ACCEPTED && isDriverClose) {
      return false;
    }
    if (deliveryStatus === ORDER_STATUSES.PICKED_UP && isDriverClose) {
      return false;
    }
    return true;
  };

  return (
    <View style={{ backgroundColor: 'lightblue', flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ width, height }}
        showsUserLocation={true}
        followsUserLocation={true}
        initialRegion={{
          latitude: driverLocation?.latitude,
          longitude: driverLocation?.longitude,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}
      >
        <MapViewDirections
          origin={driverLocation}
          destination={
            deliveryStatus === ORDER_STATUSES.ACCEPTED
              ? restaurantLocation
              : userLocation
          }
          waypoints={
            deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP
              ? [restaurantLocation]
              : []
          }
          strokeWidth={10}
          strokeColor="#3fc060"
          apikey={REACT_APP_GOOGLE_API}
          onReady={result => {
            setIsDriverClose(result.distance <= 0.1);
            setTotalMinutes(result.duration);
            setTotalKm(result.distance);
          }}
        />
        <Marker
          coordinate={restaurantLocation}
          title={order.Restaurant.name}
          description={order.Restaurant.address}
        >
          <View
            style={{ backgroundColor: 'green', padding: 3, borderRadius: 20 }}
          >
            <Entypo name="shop" size={24} color="white" />
          </View>
        </Marker>
        <Marker
          coordinate={userLocation}
          title={order.User.name}
          description={order.User.address}
        >
          <View
            style={{ backgroundColor: 'green', padding: 3, borderRadius: 20 }}
          >
            <MaterialIcons name="restaurant" size={24} color="white" />
          </View>
        </Marker>
      </MapView>
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="black"
        style={{ position: 'absolute', top: 45, left: 35 }}
      />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <View style={styles.header}>
          <Text style={styles.textHeader}>{totalMinutes.toFixed(0)} min</Text>
          <FontAwesome5
            style={styles.icon}
            name="shopping-bag"
            size={30}
            color="#3fc060"
          />
          <Text style={styles.textHeader}>{totalKm.toFixed(1)} km</Text>
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

        <Pressable
          style={{
            ...styles.button,
            backgroundColor: isButtonDisabled() ? 'grey' : '#3fc060',
          }}
          onPress={onButtonPressed}
          disabled={isButtonDisabled()}
        >
          <Text style={styles.textButton}>{renderButtonTitle()}</Text>
        </Pressable>
      </BottomSheet>
    </View>
  );
};

export default OrdersDelivery;
