import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';


const SettingsScreen = ({ navigation }) => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const { t, currentLanguage, availableLanguages } = useLanguage();
  


  const showLanguageSelector = () => {
    Alert.alert(
      t('language'),
      t('selectLanguage'),
      availableLanguages.map(lang => ({
        text: `${lang.flag} ${lang.name}`,
        onPress: () => navigation.navigate('LanguageSelector'),
        style: currentLanguage === lang.code ? 'default' : 'cancel'
      }))
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDarkTheme ? '#1a1a1a' : '#f5f5f5' }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#333' }]}>
          {t('appearance')}
        </Text>
        
        <TouchableOpacity
          style={[
            styles.settingItem,
            { backgroundColor: isDarkTheme ? '#333' : '#fff' }
          ]}
          onPress={toggleTheme}
        >
          <View style={styles.settingContent}>
            <Text style={[styles.settingText, { color: isDarkTheme ? '#fff' : '#333' }]}>
              {t('theme')}
            </Text>
            <Text style={[styles.settingValue, { color: isDarkTheme ? '#ccc' : '#666' }]}>
              {isDarkTheme ? t('dark') : t('light')}
            </Text>
          </View>
          <Text style={styles.settingIcon}>
            {isDarkTheme ? '🌙' : '☀️'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#333' }]}>
          {t('language')}
        </Text>
        
        <TouchableOpacity
          style={[
            styles.settingItem,
            { backgroundColor: isDarkTheme ? '#333' : '#fff' }
          ]}
          onPress={() => navigation.navigate('LanguageSelector')}
        >
          <View style={styles.settingContent}>
            <Text style={[styles.settingText, { color: isDarkTheme ? '#fff' : '#333' }]}>
              {t('language')}
            </Text>
            <Text style={[styles.settingValue, { color: isDarkTheme ? '#ccc' : '#666' }]}>
              {availableLanguages.find(lang => lang.code === currentLanguage)?.name || 'Português (BR)'}
            </Text>
          </View>
          <Text style={styles.settingIcon}>
            {availableLanguages.find(lang => lang.code === currentLanguage)?.flag || '🇧🇷'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#333' }]}>
          {t('about')}
        </Text>
        
        <View style={[
          styles.settingItem,
          { backgroundColor: isDarkTheme ? '#333' : '#fff' }
        ]}>
          <View style={styles.settingContent}>
            <Text style={[styles.settingText, { color: isDarkTheme ? '#fff' : '#333' }]}>
              {t('version')}
            </Text>
            <Text style={[styles.settingValue, { color: isDarkTheme ? '#ccc' : '#666' }]}>
              1.0.0
            </Text>
          </View>
          <Text style={styles.settingIcon}>📱</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingLeft: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
    minHeight: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingContent: {
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingValue: {
    fontSize: 14,
  },
  settingIcon: {
    fontSize: 20,
    marginLeft: 8,
  },
});

export default SettingsScreen;
