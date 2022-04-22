import { useMemo, useRef } from 'react';
import { Text, View, FlatList } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import OrderItem from '../../components/OrderItem';
import orders from '../../../assets/data/orders.json';

const OrdersScreen = () => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['12%', '95%'], []);

  return (
    <View style={{ backgroundColor: 'lightblue', flex: 1 }}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: 'grey', width: 50 }}
      >
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: '700', paddingBottom: 5 }}>
            You're Online
          </Text>
          <Text style={{ letterSpacing: 0.5, color: 'grey' }}>
            Avaliable Orders: {orders.length}
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
