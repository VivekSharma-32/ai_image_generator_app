import {
  Image,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Share from 'react-native-share';
import React, {useContext, useState} from 'react';
import {fontFamily} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {requestWriteStoragePermission} from '../utils';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Clipboard from '@react-native-clipboard/clipboard';
import {LikeImagesContext} from '../context/LikeImageContext';

const ImageCard = ({item}: any) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const {likedImages, toggleLikeImage} = useContext(LikeImagesContext);

  console.log(likedImages);

  // function to download the image
  const handleDownload = async () => {
    // ask the permission
    const isGranted = await requestWriteStoragePermission();

    if (!isGranted) {
      return;
    }
    // download the file  using react native blob utils
    const imageUrl = item.imageUrl;
    let PictureDir = ReactNativeBlobUtil.fs.dirs.PictureDir;
    const filePath = `${PictureDir}/download_image_${Date.now()}.png`;
    setIsDownloading(true);
    ReactNativeBlobUtil.config({
      path: filePath,
      appendExt: 'png',
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: filePath,
        description: 'Downloading Image',
        mime: 'image/png',
        mediaScannable: true,
      },
    })
      .fetch('GET', imageUrl)
      .progress({interval: 100}, (received, total) => {
        const percentage = (received / total) * 100; // Calculate percentage
        setDownloadProgress(percentage); // Update progress
      })
      .then(res => {
        copyMediaToStorage(filePath, filePath);
        setIsDownloading(false);
        setDownloadProgress(0);
        ToastAndroid.show('Image downloaded successfully', ToastAndroid.SHORT);
      })
      .catch(error => {
        setIsDownloading(false);
        console.error('Download error: ', error);
      });
  };

  // this function will copy the image in the photos
  const copyMediaToStorage = async (filePath: string, fileName: string) => {
    try {
      await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
        {
          name: fileName,
          parentFolder: 'dreamai',
          mimeType: 'image/png',
        },
        'Download',
        filePath,
      );
      console.log('File copied to the media store successfully');
    } catch (error) {
      console.log('Failed to copy file to media store');
    }
  };

  const processImageToShare = async () => {
    // ask the permission
    const isGranted = await requestWriteStoragePermission();

    if (!isGranted) {
      return;
    }

    // download the file  using react native blob utils
    const imageUrl = item.imageUrl;
    let PictureDir = ReactNativeBlobUtil.fs.dirs.PictureDir;
    const filePath = `${PictureDir}/download_image_${Date.now()}.png`;
    setIsProcessing(true);
    ReactNativeBlobUtil.config({
      path: filePath,
      appendExt: 'png',
      fileCache: true,
    })
      .fetch('GET', imageUrl)
      .progress({interval: 100}, (received, total) => {
        const percentage = (received / total) * 100; // Calculate percentage
        setDownloadProgress(percentage); // Update progress
      })
      .then(res => {
        setIsProcessing(false);
        setDownloadProgress(0);
        const base64Data = res.data;
        console.log('base64Data', base64Data);
        // if (!base64Data) {
        //   ToastAndroid.show('No Image to share', ToastAndroid.SHORT);
        // }

        // console.log('base64Data', base64Data);
        // const options = {
        //   title: 'Share Image',
        //   url: `file://${base64Data}`,
        //   message: 'Checkout this image',
        // };
        // Share.open(options)
        //   .then(res => {
        //     console.log(res);
        //   })
        //   .catch(err => {
        //     err && console.log(err);
        //   });
      });

    // .catch(error => {
    //   setIsDownloading(false);
    //   console.error('Download error: ', error);
    //   return null;
    // });
  };

  // function to share the image
  const handleShareImage = async () => {
    const base64Data = await processImageToShare();
  };

  const handleCopyImage = () => {
    const imageUrl = item.imageUrl;
    Clipboard.setString(imageUrl);
    ToastAndroid.show('Image url copied successfully', ToastAndroid.SHORT);
  };

  const handleLikeImage = () => {
    toggleLikeImage(item);
  };

  const isLiked = likedImages.some(likeImage => likeImage._id === item._id);

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
        <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
          <Ionicons name="download-outline" size={25} color={'#ffffff'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleShareImage}>
          <Ionicons name="share-outline" size={25} color={'#ffffff'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleCopyImage}>
          <Ionicons name="copy-outline" size={25} color={'#ffffff'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleLikeImage}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={25}
            color={isLiked ? '#ec0803' : '#ffffff'}
          />
        </TouchableOpacity>
      </View>

      {/* Modal container  */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isDownloading || isProcessing}>
        <View style={styles.overlay}>
          <View style={styles.progressContainer}>
            <Text style={styles.progressTitle}>
              {isProcessing ? 'Processing' : 'Downloading'} Image
            </Text>
            <Text style={styles.progressText}>{downloadProgress}%</Text>
            <Text style={styles.progressDescription}>
              Please wait while we are{' '}
              {isProcessing ? 'processing' : 'downloading'} your image.
            </Text>
            <View style={styles.progressBarContainer}>
              <View
                style={[styles.prgressBar, {width: `${downloadProgress}%`}]}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  progressContainer: {
    width: '80%',
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  prgressBar: {
    height: 10,
    backgroundColor: '#76c7c0',
    borderRadius: 5,
  },
  progressTitle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: fontFamily.bold,
    marginBottom: 10,
  },
  progressText: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: 10,
  },
  progressDescription: {
    fontSize: 14,
    color: '#fff',
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    marginTop: 10,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    marginTop: 10,
  },
});
