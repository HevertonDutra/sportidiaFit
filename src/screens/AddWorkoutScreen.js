import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';


const AddWorkoutScreen = ({ navigation }) => {
  const { theme } = useTheme();

  
  const [workoutName, setWorkoutName] = useState('');
  const [equipmentName, setEquipmentName] = useState('');
  const [description, setDescription] = useState('');
  const [videoUri, setVideoUri] = useState(null);
  const [saving, setSaving] = useState(false);

  const selectVideo = () => {
    const options = {
      mediaType: 'video',
      videoQuality: 'medium',
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.error) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const video = response.assets[0];
        setVideoUri(video.uri);
        console.log('Vídeo selecionado:', video.uri);
      }
    });
  };

  const removeVideo = () => {
    Alert.alert(
      'Remover Vídeo',
      'Tem certeza que deseja remover o vídeo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', onPress: () => setVideoUri(null) },
      ]
    );
  };

  const validateForm = () => {
    if (!workoutName.trim()) {
      Alert.alert('Erro', 'Por favor, insira o nome do treino.');
      return false;
    }
    if (!equipmentName.trim()) {
      Alert.alert('Erro', 'Por favor, insira o nome do aparelho.');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Erro', 'Por favor, insira a descrição do treino.');
      return false;
    }
    return true;
  };

  const saveWorkout = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const newWorkout = {
        id: Date.now().toString(),
        name: workoutName.trim(),
        equipment: equipmentName.trim(),
        description: description.trim(),
        videoUri: videoUri,
        createdAt: new Date().toISOString(),
      };

      const existingWorkouts = await AsyncStorage.getItem('workouts');
      const workouts = existingWorkouts ? JSON.parse(existingWorkouts) : [];
      workouts.push(newWorkout);

      await AsyncStorage.setItem('workouts', JSON.stringify(workouts));
      
      Alert.alert(
        'Sucesso',
        'Treino cadastrado com sucesso!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Erro ao salvar treino:', error);
      Alert.alert('Erro', 'Não foi possível salvar o treino. Tente novamente.');
    } finally {
      setSaving(false);
    }
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
    backButton: {
      padding: 8,
      minHeight: 44,
      minWidth: 44,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 20,
    },
    formGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.background,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    videoSection: {
      marginBottom: 20,
    },
    videoContainer: {
      borderWidth: 2,
      borderColor: theme.border,
      borderStyle: 'dashed',
      borderRadius: 8,
      padding: 20,
      alignItems: 'center',
      backgroundColor: theme.surface,
    },
    videoPreview: {
      width: '100%',
      height: 200,
      borderRadius: 8,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    videoText: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      marginTop: 10,
    },
    videoButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 15,
    },
    videoButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      minHeight: 44,
      justifyContent: 'center',
      alignItems: 'center',
    },
    removeButton: {
      backgroundColor: theme.error || '#FF6B6B',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      minHeight: 44,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    saveButton: {
      backgroundColor: theme.primary,
      borderRadius: 12,
      paddingVertical: 15,
      marginTop: 20,
      marginBottom: 10,
      alignItems: 'center',
      minHeight: 50,
      justifyContent: 'center',
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    disabledButton: {
      opacity: 0.6,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Novo Treino</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome do Treino *</Text>
          <TextInput
            style={styles.input}
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Ex: Supino Reto"
            placeholderTextColor={theme.textSecondary}
            maxLength={50}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome do Aparelho *</Text>
          <TextInput
            style={styles.input}
            value={equipmentName}
            onChangeText={setEquipmentName}
            placeholder="Ex: Banco de Supino"
            placeholderTextColor={theme.textSecondary}
            maxLength={50}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Descrição do Treino *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Descreva como executar o exercício, número de séries, repetições, etc."
            placeholderTextColor={theme.textSecondary}
            multiline
            maxLength={500}
          />
        </View>

        <View style={styles.videoSection}>
          <Text style={styles.label}>Vídeo do Treino</Text>
          <View style={styles.videoContainer}>
            {videoUri ? (
              <>
                <View style={styles.videoPreview}>
                  <Icon name="videocam" size={50} color={theme.primary} />
                  <Text style={[styles.videoText, { color: theme.text }]}>
                    Vídeo selecionado
                  </Text>
                </View>
                <View style={styles.videoButtons}>
                  <TouchableOpacity
                    style={styles.videoButton}
                    onPress={selectVideo}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.buttonText}>Trocar Vídeo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={removeVideo}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.buttonText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Icon name="video-library" size={50} color={theme.textSecondary} />
                <Text style={styles.videoText}>
                  Adicione um vídeo demonstrativo do treino
                </Text>
                <TouchableOpacity
                  style={[styles.videoButton, { marginTop: 15 }]}
                  onPress={selectVideo}
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonText}>Selecionar Vídeo</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.saveButton,
            saving && styles.disabledButton,
          ]}
          onPress={saveWorkout}
          disabled={saving}
          activeOpacity={0.7}
        >
          <Text style={styles.saveButtonText}>
            {saving ? 'Salvando...' : 'Salvar Treino'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddWorkoutScreen;