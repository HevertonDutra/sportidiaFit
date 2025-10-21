import React, { useState, useEffect } from 'react';
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
import { useLanguage } from '../contexts/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [profile, setProfile] = useState({
    name: '',
    whatsapp: '',
    email: '',
    instagram: '',
    profileImage: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const saveProfile = async () => {
    try {
      if (!profile.name.trim()) {
        Alert.alert(t('error'), t('nameRequired'));
        return;
      }

      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      setIsEditing(false);
      Alert.alert(t('success'), t('profileSaved'));
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert(t('error'), t('profileSaveError'));
    }
  };

  const selectProfileImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 400,
      maxHeight: 400,
    };

    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets[0]) {
        setProfile({
          ...profile,
          profileImage: response.assets[0].uri,
        });
      }
    });
  };

  const formatWhatsApp = (text) => {
    // Remove todos os caracteres não numéricos
    const numbers = text.replace(/\D/g, '');
    
    // Aplica a máscara (XX) XXXXX-XXXX
    if (numbers.length <= 11) {
      const formatted = numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      return formatted;
    }
    return text;
  };

  const formatInstagram = (text) => {
    // Remove o @ se já estiver presente e adiciona no início
    const username = text.replace('@', '');
    return username ? `@${username}` : '';
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
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    headerButtons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingsButton: {
      backgroundColor: theme.textSecondary,
      borderRadius: 10,
      paddingHorizontal: 8,
      paddingVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
    },
    editButton: {
      backgroundColor: theme.primary,
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    editButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 16,
    },
    profileImageContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    profileImagePlaceholder: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      borderWidth: 2,
      borderColor: theme.border,
      borderStyle: 'dashed',
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    imageButton: {
      backgroundColor: theme.primary,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    imageButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    formGroup: {
      marginBottom: 16,
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
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 8,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.surface,
      minHeight: 48,
    },
    readOnlyInput: {
      backgroundColor: theme.background,
      borderColor: theme.border,
    },
    infoCard: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    infoIcon: {
      marginRight: 16,
      width: 24,
      alignItems: 'center',
    },
    infoText: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
    },
    infoLabel: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 2,
    },
    saveButton: {
      backgroundColor: theme.primary,
      borderRadius: 10,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 30,
      minHeight: 48,
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: theme.textSecondary,
      borderRadius: 10,
      paddingVertical: 16,
      alignItems: 'center',
      marginBottom: 8,
      minHeight: 48,
    },
    cancelButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    emptyStateText: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      fontStyle: 'italic',
    },
  });

  if (!isEditing && (!profile.name && !profile.whatsapp && !profile.email && !profile.instagram)) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('profile')}</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={[styles.settingsButton, { minHeight: 44, minWidth: 44, marginRight: 8 }]}
              onPress={() => navigation.navigate('Settings')}
              activeOpacity={0.7}
            >
              <Icon name="settings" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editButton, { minHeight: 44, minWidth: 100 }]}
              onPress={() => {
                console.log('Botão "Criar Perfil" foi pressionado!');
                navigation.navigate('ProfileRegistration');
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.editButtonText}>{t('createProfile')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.content, { justifyContent: 'center', alignItems: 'center' }]}>
          <Icon name="person-outline" size={40} color={theme.textSecondary} />
          <Text style={[styles.emptyStateText, { marginTop: 20 }]}>
            {t('profileNotCreated')}{'\n'}
            {t('tapCreateProfile')}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('profile')}</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={[styles.settingsButton, { minHeight: 44, minWidth: 44, marginRight: 8 }]}
            onPress={() => navigation.navigate('Settings')}
            activeOpacity={0.7}
          >
            <Icon name="settings" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          {!isEditing && (
            <TouchableOpacity
              style={[styles.editButton, { minHeight: 44, minWidth: 80 }]}
              onPress={() => {
                console.log('Botão "Editar" foi pressionado!');
                setIsEditing(true);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.editButtonText}>{t('edit')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileImageContainer}>
          {profile.profileImage ? (
            <Image source={{ uri: profile.profileImage }} style={styles.image} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Icon name="person" size={32} color={theme.textSecondary} />
            </View>
          )}
          {isEditing && (
            <TouchableOpacity
              style={styles.imageButton}
              onPress={selectProfileImage}
            >
              <Text style={styles.imageButtonText}>
                {profile.profileImage ? t('changePhoto') : t('addPhoto')}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {isEditing ? (
          <>
            <View style={styles.formGroup}>
              <Text style={styles.label}>{t('fullName')} *</Text>
              <TextInput
                style={styles.input}
                value={profile.name}
                onChangeText={(text) => setProfile({ ...profile, name: text })}
                placeholder={t('enterFullName')}
                placeholderTextColor={theme.textSecondary}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>WhatsApp</Text>
              <TextInput
                style={styles.input}
                value={profile.whatsapp}
                onChangeText={(text) => setProfile({ ...profile, whatsapp: formatWhatsApp(text) })}
                placeholder="(11) 99999-9999"
                keyboardType="phone-pad"
                placeholderTextColor={theme.textSecondary}
                maxLength={15}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{t('email')}</Text>
              <TextInput
                style={styles.input}
                value={profile.email}
                onChangeText={(text) => setProfile({ ...profile, email: text })}
                placeholder={t('emailPlaceholder')}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={theme.textSecondary}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Instagram</Text>
              <TextInput
                style={styles.input}
                value={profile.instagram}
                onChangeText={(text) => setProfile({ ...profile, instagram: formatInstagram(text) })}
                placeholder={t('instagramPlaceholder')}
                autoCapitalize="none"
                placeholderTextColor={theme.textSecondary}
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
              <Text style={styles.saveButtonText}>{t('saveProfile')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setIsEditing(false);
                loadProfile(); // Recarrega os dados originais
              }}
            >
              <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Icon name="person" size={24} color={theme.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>{t('name')}</Text>
                <Text style={styles.infoText}>
                  {profile.name || t('notInformed')}
                </Text>
              </View>
            </View>

            {profile.whatsapp && (
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Icon name="phone" size={24} color={theme.accent} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>WhatsApp</Text>
                  <Text style={styles.infoText}>{profile.whatsapp}</Text>
                </View>
              </View>
            )}

            {profile.email && (
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Icon name="email" size={24} color={theme.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>E-mail</Text>
                  <Text style={styles.infoText}>{profile.email}</Text>
                </View>
              </View>
            )}

            {profile.instagram && (
              <View style={[styles.infoRow, { marginBottom: 0 }]}>
                <View style={styles.infoIcon}>
                  <Icon name="camera-alt" size={24} color={theme.accent} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>Instagram</Text>
                  <Text style={styles.infoText}>{profile.instagram}</Text>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
