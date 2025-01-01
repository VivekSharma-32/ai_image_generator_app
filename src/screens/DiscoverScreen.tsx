import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fontFamily} from '../theme';
import ImageCard from '../components/ImageCard';
import {api} from '../utils/api';

const DiscoverScreen = () => {
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleFetchImages();
  }, [page]);

  const handleFetchImages = async () => {
    try {
      setLoading(true);
      const response = await api.get('/discover-image', {
        params: {
          page: page,
        },
      });

      if (page == 1) {
        setImages(response?.data?.images);
      } else {
        setImages(prevImages => [...prevImages, ...response?.data?.images]);
      }

      let isNextPage =
        response?.data?.totalPages > response?.data?.currentPage ? true : false;
      setHasNextPage(isNextPage);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  const handleLoadMoreImages = () => {
    if (hasNextPage) {
      setPage(page + 1);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <FlatList
        data={images}
        renderItem={({item, index}) => {
          return <ImageCard item={item} />;
        }}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={'#3b82f6'}
          />
        }
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size={'large'} color={'#3bb2f6'} />
          ) : null
        }
        onEndReached={handleLoadMoreImages}
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
