import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {fontFamily} from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageCard from '../components/ImageCard';

const HomeScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const handleOpenLink = () => {
    // Open link:TODO
    const url = '';
    Linking.openURL(url).catch(error => {
      console.log(error);
    });
  };

  // this function will clear the text
  const clearText = () => {
    if (prompt !== '') {
      setPrompt('');
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo container  */}
      <View style={styles.appLogoContainer}>
        <Text style={styles.appName}>DreamAI</Text>
        <TouchableOpacity onPress={handleOpenLink}>
          <Text style={styles.madeBy}>
            Made By{' '}
            <Text
              style={[
                styles.madeBy,
                {
                  textDecorationLine: 'underline',
                },
              ]}>
              Vivek Sharma
            </Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* input container  */}
      <View style={styles.textInputWrapper}>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Enter your prompt"
            placeholderTextColor={'#808080'}
            multiline
            style={styles.textInput}
            value={prompt}
            onChangeText={setPrompt}
          />
          {prompt ? (
            <TouchableOpacity style={styles.clearButton} onPress={clearText}>
              <Icon name="close" size={24} color={'#fff'} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Generate Button  */}
      <TouchableOpacity style={styles.generateButton}>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <Text style={styles.generateButtonText}>Generate</Text>
        )}
      </TouchableOpacity>

      {/* description  */}
      {!image && (
        <>
          <Text style={styles.description}>
            Generate images in real-time. Enter a prompt and generate images in
            milliseconds as you type. Powered by Flux and Together AI
          </Text>
          <View style={styles.footer}>
            <Text style={styles.poweredText}>
              Powered by Together.ai & Flux
            </Text>
          </View>
        </>
      )}

      {image && (
        <View style={styles.imageWrapper}>
          <ImageCard item={{imageUrl: image, prompt: 'Generate an AI Image'}} />
        </View>
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  appLogoContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  appName: {
    color: '#fff',
    fontFamily: fontFamily.bold,
    fontSize: 22,
    textAlign: 'center',
  },
  madeBy: {
    color: '#808080',
    fontFamily: fontFamily.regular,
    fontSize: 12,
    marginTop: 5,
  },

  textInputWrapper: {
    marginTop: 20,
  },
  textInputContainer: {
    position: 'relative',
  },
  textInput: {
    width: '100%',
    height: 120,
    borderWidth: 2,
    borderColor: '#565656',
    borderRadius: 10,
    backgroundColor: '#222222',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  generateButton: {
    marginTop: 10,
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderBottomWidth: 10,
    borderColor: '#f8f2f2',
  },
  generateButtonText: {
    color: '#fff',
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
  },

  description: {
    color: '#808080',
    fontFamily: fontFamily.regular,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },

  footer: {
    alignItems: 'center',
    marginTop: 30,
  },
  poweredText: {
    color: '#808080',
    fontFamily: fontFamily.regular,
    fontSize: 12,
  },

  imageWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
});
