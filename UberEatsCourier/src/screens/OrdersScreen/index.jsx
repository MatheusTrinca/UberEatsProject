import { useRef } from 'react';
import { Text, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const OrdersScreen = () => {
  const bottomSheetRef = useRef(null);

  return (
    <View style={{ backgroundColor: 'lightblue', flex: 1 }}>
      <BottomSheet ref={bottomSheetRef} snapPoints={['12%', '95%']}>
        <View style={{ flex: 1 }}>
          <Text>Hello World!</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default OrdersScreen;
