import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';

export const LikeImagesContext = createContext(null);

export const LikeImagesProvider = ({children}) => {
  const [likedImages, setLikedImages] = useState([]);

  useEffect(() => {
    loadLikedImages();
  }, []);

  const loadLikedImages = async () => {
    let images = await AsyncStorage.getItem('likedImages');

    images = images ? JSON.parse(images) : [];
    setLikedImages(images);
  };

  const toggleLikeImage = async genImage => {
    let likedImages = await AsyncStorage.getItem('likedImages');
    likedImages = likedImages ? JSON.parse(likedImages) : [];

    const imageExist = likedImages.some(item => item._id == genImage._id);

    if (imageExist) {
      likedImages = likedImages.filter(item => item._id !== genImage._id);
      ToastAndroid.show('Image removed successfully!', ToastAndroid.SHORT);
    } else {
      likedImages.push(genImage);
      ToastAndroid.show('Image liked successfully!', ToastAndroid.SHORT);
    }

    setLikedImages(likedImages);
    await AsyncStorage.setItem('likedImages', JSON.stringify(likedImages));
  };

  const value = {
    likedImages,
    toggleLikeImage,
  };
  return (
    <LikeImagesContext.Provider value={value}>
      {children}
    </LikeImagesContext.Provider>
  );
};
