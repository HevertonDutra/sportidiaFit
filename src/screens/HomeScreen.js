import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DarkModeIcon from '../components/icons/DarkModeIcon';
import WorkoutIcon from '../components/icons/WorkoutIcon';
import DietIcon from '../components/icons/DietIcon';
import EvolutionIcon from '../components/icons/EvolutionIcon';
import ProfileIcon from '../components/icons/ProfileIcon';
import CommentsIcon from '../components/icons/CommentsIcon';

const HomeScreen = ({ navigation }) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

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
      paddingTop: 16,
      paddingBottom: 12,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.text,
    },
    themeButton: {
      padding: 10,
      borderRadius: 20,
      backgroundColor: theme.surface,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingBottom: 20,
    },
    welcomeCard: {
      backgroundColor: theme.card,
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    welcomeText: {
      fontSize: 22,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    welcomeSubtext: {
      fontSize: 16,
      color: theme.textSecondary,
    },
    menuGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    menuItem: {
      backgroundColor: theme.card,
      borderRadius: 15,
      width: '48%',
      padding: 16,
      marginBottom: 12,
      alignItems: 'center',
      minHeight: 120,
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    menuIcon: {
      marginBottom: 10,
    },
    menuText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      textAlign: 'center',
    },
  });

  const menuItems = [
    {
      title: t('workouts'),
      icon: 'fitness-center',
      color: theme.primary,
      screen: 'Workout',
    },
    {
      title: t('diet'),
      icon: 'restaurant',
      color: theme.accent,
      screen: 'Diet',
    },
    {
      title: t('evolution'),
      icon: 'trending-up',
      color: theme.primary,
      screen: 'Evolution',
    },
    {
      title: t('profile'),
      icon: 'person',
      color: theme.accent,
      screen: 'Profile',
    },
    {
      title: t('comments'),
      icon: 'comment',
      color: theme.primary,
      screen: 'Comments',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>SportidiaFit</Text>
        <TouchableOpacity
          style={styles.themeButton}
          onPress={toggleTheme}
        >
          <DarkModeIcon
            size={28}
            color={isDark ? '#000' : '#000'}
            isDark={isDark}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>{t('welcome')}</Text>
          <Text style={styles.welcomeSubtext}>
            {t('welcomeSubtext')}
          </Text>
        </View>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.menuIcon}>
                {item.title === t('workouts') ? (
                  <WorkoutIcon size={40} color={item.color} />
                ) : item.title === t('diet') ? (
                  <DietIcon size={46} color={item.color} />
                ) : item.title === t('evolution') ? (
                  <EvolutionIcon size={40} color={item.color} />
                ) : item.title === t('profile') ? (
                  <ProfileIcon size={40} color={item.color} />
                ) : item.title === t('comments') ? (
                  <CommentsIcon size={40} color={item.color} />
                ) : (
                  <Icon name={item.icon} size={40} color={item.color} />
                )}
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;