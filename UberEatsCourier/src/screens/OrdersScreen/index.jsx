import { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const OrdersScreen = () => {
  const bottomSheetRef = useRef(null);

  return (
    <View style={{ backgroundColor: 'blue', flex: 1 }}>
      <Text>Hello World!</Text>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
