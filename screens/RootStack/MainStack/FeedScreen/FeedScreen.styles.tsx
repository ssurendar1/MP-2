import { StyleSheet } from "react-native";
import { AppStyles } from "../../../../AppStyles";

export const styles = StyleSheet.create({
  ...AppStyles,
  container: {
    flex: 1,
    backgroundColor: '#F0ECE5',
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden', // Ensure the image and card content are aligned
  },
  cardImage: {
    height: 200, // Set the height of the image
    width: '100%', // Full width
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardDate: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#333',
  },
  noShadow: {
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
    elevation: 0,  // For Android if needed
  },
});