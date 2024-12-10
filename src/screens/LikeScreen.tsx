import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {fontFamily, fontSize} from '../theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImageCard from '../components/ImageCard';

const LikeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  // const data = [
  //   {
  //     id: 1,
  //     imageUrl:
  //       'https://images.nightcafe.studio/jobs/hVccyZiCpHZyLdfDIcKg/hVccyZiCpHZyLdfDIcKg--1--sczqn.jpg?tr=w-1600,c-at_max',
  //     prompt: 'Generate an AI Image',
  //   },
  //   {
  //     id: 2,
  //     imageUrl:
  //       'https://images.nightcafe.studio/jobs/hVccyZiCpHZyLdfDIcKg/hVccyZiCpHZyLdfDIcKg--1--sczqn.jpg?tr=w-1600,c-at_max',
  //     prompt: 'Generate an AI Image',
  //   },
  //   {
  //     id: 3,
  //     imageUrl:
  //       'https://images.nightcafe.studio/jobs/hVccyZiCpHZyLdfDIcKg/hVccyZiCpHZyLdfDIcKg--1--sczqn.jpg?tr=w-1600,c-at_max',
  //     prompt: 'Generate an AI Image',
  //   },
  // ];

  const data = [];
  const onRefresh = () => {
    setRefreshing(true);
    // make an api call

    // setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liked Image</Text>
      <FlatList
        data={[]}
        renderItem={({item, index}) => {
          return <ImageCard item={item} />;
        }}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          (styles.listContainer, data.length === 0 && styles.emptyListContainer)
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={'#3b82f6'}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyStateContainer}>
            <AntDesign name="hearto" size={80} color={'#d3d3d3'} />
            <Text style={styles.emptyStateText}>
              You haven't liked any images yet!
            </Text>
            <Text style={styles.subText}>
              Browse and like images to see them here
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default LikeScreen;

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
  emptyStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    flex: 1,
  },
  emptyStateText: {
    color: '#d3d3d3',
    fontFamily: fontFamily.medium,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  subText: {
    color: '#a9a9a9',
    fontFamily: fontFamily.regular,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  emptyListContainer: {
    flexGrow: 1,
  },
});
