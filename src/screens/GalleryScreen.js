import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');

const GalleryScreen = () => {
  const { theme } = useTheme();
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const savedGallery = await AsyncStorage.getItem('gallery');
      if (savedGallery) {
        setMediaItems(JSON.parse(savedGallery));
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
    }
  };

  const saveGallery = async (items) => {
    try {
      await AsyncStorage.setItem('gallery', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving gallery:', error);
    }
  };

  const showMediaPicker = () => {
    Alert.alert(
      'Adicionar Mídia',
      'Escolha uma opção',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Câmera', onPress: () => openCamera() },
        { text: 'Galeria', onPress: () => openGallery() },
      ]
    );
  };

  const openCamera = () => {
    const options = {
      mediaType: 'mixed',
      quality: 0.8,
    };

    launchCamera(options, (response) => {
      if (response.assets && response.assets[0]) {
        addMediaItem(response.assets[0]);
      }
    });
  };

  const openGallery = () => {
    const options = {
      mediaType: 'mixed',
      quality: 0.8,
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets[0]) {
        addMediaItem(response.assets[0]);
      }
    });
  };

  const addMediaItem = (asset) => {
    const newItem = {
      id: Date.now().toString(),
      uri: asset.uri,
      type: asset.type,
      fileName: asset.fileName || `media_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const updatedItems = [newItem, ...mediaItems];
    setMediaItems(updatedItems);
    saveGallery(updatedItems);
  };

  const deleteMediaItem = (id) => {
    Alert.alert(
      'Excluir Mídia',
      'Tem certeza que deseja excluir este item?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const updatedItems = mediaItems.filter(item => item.id !== id);
            setMediaItems(updatedItems);
            saveGallery(updatedItems);
          },
        },
      ]
    );
  };

  const openMedia = (item) => {
    setSelectedMedia(item);
    setModalVisible(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
    },
    addButton: {
      backgroundColor: theme.primary,
      borderRadius: 25,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      paddingHorizontal: 10,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyText: {
      fontSize: 18,
      color: theme.textSecondary,
      textAlign: 'center',
      marginTop: 20,
    },
    mediaGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingVertical: 10,
    },
    mediaItem: {
      width: (width - 40) / 2,
      height: 150,
      margin: 5,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: theme.surface,
    },
    mediaImage: {
      width: '100%',
      height: '80%',
    },
    mediaInfo: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 8,
      backgroundColor: theme.card,
    },
    mediaType: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    deleteButton: {
      padding: 4,
    },
    modal: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.9)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '90%',
      height: '70%',
      backgroundColor: theme.card,
      borderRadius: 15,
      overflow: 'hidden',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
    },
    closeButton: {
      padding: 5,
    },
    modalMedia: {
      flex: 1,
    },
    fullImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    videoPlayer: {
      width: '100%',
      height: '100%',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Galeria de Mídia</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={showMediaPicker}
        >
          <Icon name="add" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {mediaItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="photo-library" size={80} color={theme.textSecondary} />
            <Text style={styles.emptyText}>
              Sua galeria está vazia.{'\n'}
              Toque no botão + para adicionar fotos e vídeos!
            </Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mediaGrid}>
              {mediaItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.mediaItem}
                  onPress={() => openMedia(item)}
                >
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.mediaImage}
                  />
                  <View style={styles.mediaInfo}>
                    <Text style={styles.mediaType}>
                      {item.type?.startsWith('video') ? 'Vídeo' : 'Imagem'}
                    </Text>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteMediaItem(item.id)}
                    >
                      <Icon name="delete" size={18} color={theme.error} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedMedia?.type?.startsWith('video') ? 'Vídeo' : 'Imagem'}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalMedia}>
              {selectedMedia?.type?.startsWith('video') ? (
                <Video
                  source={{ uri: selectedMedia.uri }}
                  style={styles.videoPlayer}
                  controls={true}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={{ uri: selectedMedia?.uri }}
                  style={styles.fullImage}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GalleryScreen;