import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { styles } from "./HomeScreen.styles";

type HomeScreenProps = {
  navigation: NavigationProp<any, any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MDB Socials!</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('FeedScreen')}
      >
        <Text style={styles.buttonText}>View Socials</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('NewSocialScreen')}
      >
        <Text style={styles.buttonText}>Create New Social</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
