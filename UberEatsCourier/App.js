import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import OrdersScreen from './src/screens/OrdersScreen';
import OrdersDelivery from './src/screens/OrdersDelivery';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <OrdersScreen /> */}
        <OrdersDelivery />
        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 50,
  },
});

// 56:40
