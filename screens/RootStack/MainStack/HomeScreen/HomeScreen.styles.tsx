import { StyleSheet } from "react-native";
import { AppStyles } from "../../../../AppStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0ECE5',
      },
      title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#161A30', 
      },
      button: {
        backgroundColor: '#B6BBC4', 
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 25,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, 
      },
      buttonText: {
        color: '#161A30', 
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
      }
});
