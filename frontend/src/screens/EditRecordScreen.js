import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {
  TextInput,
  Button,
  Card,
  Title,
  ActivityIndicator,
  Text,
} from 'react-native-paper';
import {showImagePicker} from '../utils/imagePicker';
import {recordsAPI} from '../services/api';
import {theme} from '../utils/theme';

const EditRecordScreen = ({navigation, route}) => {
  const {record} = route.params;
  const [title, setTitle] = useState(record.title);
  const [description, setDescription] = useState(record.description);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (record.image_path) {
      setImage({
        uri: `http://localhost:8000/storage/${record.image_path}`,
        isExisting: true,
      });
    }
  }, [record]);

  const handleImagePicker = () => {
    showImagePicker(selectedImage => {
      setImage(selectedImage);
    });
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('_method', 'PUT');
      
      // Only append image if it's a new one
      if (image && !image.isExisting) {
        formData.append('image', {
          uri: image.uri,
          type: image.type,
          name: image.name,
        });
      }

      const response = await recordsAPI.update(record.id, formData);
      
      if (response.data.success) {
        Alert.alert('Success', 'Record updated successfully', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    } catch (error) {
      console.error('Error updating record:', error);
      Alert.alert('Error', 'Failed to update record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Edit Record</Title>
          
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            mode="outlined"
            theme={theme}
          />
          
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={4}
            theme={theme}
          />
          
          <View style={styles.imageSection}>
            <Text style={styles.imageLabel}>Image</Text>
            {image ? (
              <View style={styles.imageContainer}>
                <Image source={{uri: image.uri}} style={styles.image} />
                <Button
                  mode="outlined"
                  onPress={handleImagePicker}
                  style={styles.changeImageButton}>
                  Change Image
                </Button>
              </View>
            ) : (
              <Button
                mode="outlined"
                onPress={handleImagePicker}
                style={styles.selectImageButton}>
                Select Image
              </Button>
            )}
          </View>
          
          <Button
            mode="contained"
            onPress={handleSubmit}
            disabled={loading}
            style={styles.submitButton}
            contentStyle={styles.submitButtonContent}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              'Update Record'
            )}
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  card: {
    margin: 16,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  imageSection: {
    marginBottom: 24,
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 8,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectImageButton: {
    width: '100%',
  },
  changeImageButton: {
    width: '100%',
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
  },
  submitButtonContent: {
    paddingVertical: 8,
  },
});

export default EditRecordScreen;
