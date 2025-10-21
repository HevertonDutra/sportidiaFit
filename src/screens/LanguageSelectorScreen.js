import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelectorScreen = ({ navigation }) => {
  const { isDarkTheme } = useTheme();
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage();

  const handleLanguageSelect = async (languageCode) => {
    await changeLanguage(languageCode);
    navigation.goBack();
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDarkTheme ? '#1a1a1a' : '#f5f5f5' }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: isDarkTheme ? '#fff' : '#333' }]}>
        {t('selectLanguage')}
      </Text>

      {availableLanguages.map((language) => (
        <TouchableOpacity
          key={language.code}
          style={[
            styles.languageItem,
            { 
              backgroundColor: isDarkTheme ? '#333' : '#fff',
              borderColor: currentLanguage === language.code 
                ? (isDarkTheme ? '#4CAF50' : '#007AFF')
                : 'transparent',
              borderWidth: currentLanguage === language.code ? 2 : 0,
            }
          ]}
          onPress={() => handleLanguageSelect(language.code)}
        >
          <View style={styles.languageContent}>
            <Text style={styles.flagIcon}>{language.flag}</Text>
            <View style={styles.languageInfo}>
              <Text style={[
                styles.languageName, 
                { 
                  color: isDarkTheme ? '#fff' : '#333',
                  fontWeight: currentLanguage === language.code ? 'bold' : 'normal'
                }
              ]}>
                {language.name}
              </Text>
              {currentLanguage === language.code && (
                <Text style={[
                  styles.currentLabel,
                  { color: isDarkTheme ? '#4CAF50' : '#007AFF' }
                ]}>
                  {t('current')}
                </Text>
              )}
            </View>
          </View>
          {currentLanguage === language.code && (
            <Text style={[
              styles.checkmark,
              { color: isDarkTheme ? '#4CAF50' : '#007AFF' }
            ]}>
              ✓
            </Text>
          )}
        </TouchableOpacity>
      ))}

      <View style={styles.infoSection}>
        <Text style={[styles.infoText, { color: isDarkTheme ? '#ccc' : '#666' }]}>
          {t('languageChangeInfo')}
        </Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flagIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    marginBottom: 2,
  },
  currentLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  checkmark: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoSection: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LanguageSelectorScreen;