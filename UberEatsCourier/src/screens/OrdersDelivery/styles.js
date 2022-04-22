import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  handleIndicator: {
    backgroundColor: 'grey',
    width: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingBottom: 25,
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginHorizontal: 10,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: '500',
  },
  detailsContainer: {
    padding: 20,
  },
  restaurantName: {
    fontSize: 24,
    letterSpacing: 0.5,
    fontWeight: '700',
    marginBottom: 5,
  },
  addressContainer: {
    marginVertical: 8,
    flexDirection: 'row',
  },
  addressText: {
    fontSize: 18,
    marginLeft: 10,
    color: 'grey',
    letterSpacing: 0.5,
  },
  dishesContainer: {
    margin: 5,
    borderTopWidth: 2,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  dish: {
    color: 'grey',
    marginTop: 2,
    fontSize: 15,
    letterSpacing: 0.5,
  },
});
