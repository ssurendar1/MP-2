
import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Image } from "react-native";
import { Appbar, Card } from "react-native-paper";
import { getFirestore, collection, onSnapshot, query } from "firebase/firestore";
import { SocialModel } from "../../../../models/social.js";
import { styles } from "./FeedScreen.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../MainStackScreen.js";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "FeedScreen">;
}

const FeedScreen: React.FC<Props> = ({ navigation }) => {
  const [socials, setSocials] = useState<SocialModel[]>([]);

  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, 'socials'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const socialsList: SocialModel[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          eventDate: data.eventDate,
          eventDescription: data.eventDescription,
          eventImage: data.eventImage,
          eventLocation: data.eventLocation,
          eventName: data.eventName
        };
      });

      setSocials(socialsList);
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  const renderItem = ({ item }: { item: SocialModel }) => (
    <Card style={styles.noShadow} onPress={() => navigation.navigate('DetailScreen', { social: item })}>
      <Card.Title title={item.eventName} subtitle={new Date(item.eventDate).toLocaleString()} />
      <Card.Content>
        <Image style={styles.cardImage} source={{ uri: item.eventImage }} />
        <Text>{item.eventLocation}</Text>
        <Text>{item.eventDescription}</Text>
      </Card.Content>
    </Card>
  );

  const NavigationBar = () => (
    <Appbar.Header style={{ backgroundColor: 'transparent' }}>
      <Appbar.Content title="Socials" />
      <Appbar.Action icon="plus" onPress={() => navigation.navigate('NewSocialScreen')} />
    </Appbar.Header>
  );

  return (
    <>
      <NavigationBar />
      <View style={styles.container}>
        <FlatList
          data={socials}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} 
        />
      </View>
    </>
  );
};

export default FeedScreen;
