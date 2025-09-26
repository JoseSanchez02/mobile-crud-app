import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Alert, Platform} from 'react-native';

export const showImagePicker = (callback) => {
  Alert.alert(
    'Select Image',
    'Choose an option',
    [
      {
        text: 'Camera',
        onPress: () => openCamera(callback),
      },
      {
        text: 'Gallery',
        onPress: () => openGallery(callback),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
    {cancelable: true},
  );
};

const openCamera = (callback) => {
  const options = {
    mediaType: 'photo',
    quality: 0.8,
    maxWidth: 1000,
    maxHeight: 1000,
  };

  launchCamera(options, response => {
    if (response.didCancel || response.error) {
      return;
    }
    
    if (response.assets && response.assets[0]) {
      const asset = response.assets[0];
      callback({
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName || `image_${Date.now()}.jpg`,
        size: asset.fileSize,
      });
    }
  });
};

const openGallery = (callback) => {
  const options = {
    mediaType: 'photo',
    quality: 0.8,
    maxWidth: 1000,
    maxHeight: 1000,
  };

  launchImageLibrary(options, response => {
    if (response.didCancel || response.error) {
      return;
    }
    
    if (response.assets && response.assets[0]) {
      const asset = response.assets[0];
      callback({
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName || `image_${Date.now()}.jpg`,
        size: asset.fileSize,
      });
    }
  });
};
