import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersDelivery from '../screens/OrdersDelivery';
import OrdersScreen from '../screens/OrdersScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
      <Stack.Screen name="OrdersDeliveryScreen" component={OrdersDelivery} />
    </Stack.Navigator>
  );
};

export default Navigator;
