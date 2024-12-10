import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {fontFamily} from '../theme';
import ImageCard from '../components/ImageCard';

const DiscoverScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const data = [
    {
      id: 1,
      imageUrl:
        'https://images.nightcafe.studio/jobs/hVccyZiCpHZyLdfDIcKg/hVccyZiCpHZyLdfDIcKg--1--sczqn.jpg?tr=w-1600,c-at_max',
      prompt: 'Generate an AI Image',
    },
    {
      id: 2,
      imageUrl:
        'https://images.nightcafe.studio/jobs/hVccyZiCpHZyLdfDIcKg/hVccyZiCpHZyLdfDIcKg--1--sczqn.jpg?tr=w-1600,c-at_max',
      prompt: 'Generate an AI Image',
    },
    {
      id: 3,
      imageUrl:
        'https://images.nightcafe.studio/jobs/hVccyZiCpHZyLdfDIcKg/hVccyZiCpHZyLdfDIcKg--1--sczqn.jpg?tr=w-1600,c-at_max',
      prompt: 'Generate an AI Image',
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    // make an api call

    // setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return <ImageCard item={item} />;
        }}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={'#3b82f6'}
          />
        }
      />
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 28,
  },
  listContainer: {
    paddingBottom: 50,
  },
});
