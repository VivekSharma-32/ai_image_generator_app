import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fontFamily} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ImageCard = ({item}: any) => {
  return (
    <View style={styles.imageCard}>
      {/* image  */}
      <Image
        source={{uri: item.imageUrl}}
        style={styles.image}
        resizeMode="cover"
      />
      {/* prompt text  */}
      <Text style={styles.promptText}>{item?.prompt || 'No Prompt'}</Text>
      {/* button container  */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="download-outline" size={25} color={'#ffffff'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={25} color={'#ffffff'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="copy-outline" size={25} color={'#ffffff'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={25} color={'#ffffff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  imageCard: {
    width: '100%',
    padding: 15,
    backgroundColor: '#000',
    marginBottom: 20,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 350,
    borderRadius: 8,
  },
  promptText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 50,
    alignItems: 'center',
  },
});
