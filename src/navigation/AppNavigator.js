import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import HomeIcon from '../components/icons/HomeIcon';
import TabEvolutionIcon from '../components/icons/TabEvolutionIcon';
import DietIcon from '../components/icons/DietIcon';
import TabProfileIcon from '../components/icons/TabProfileIcon';

import HomeScreen from '../screens/HomeScreen';
import GalleryScreen from '../screens/GalleryScreen';
import EvolutionScreen from '../screens/EvolutionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileRegistrationScreen from '../screens/ProfileRegistrationScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LanguageSelectorScreen from '../screens/LanguageSelectorScreen';
import CommentsScreen from '../screens/CommentsScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import WorkoutDetailScreen from '../screens/WorkoutDetailScreen';
import DietScreen from '../screens/DietScreen';
import AddDishScreen from '../screens/AddDishScreen';
import BMICalculatorScreen from '../screens/BMICalculatorScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <HomeIcon size={size} color={color} />;
          } else if (route.name === 'Evolution') {
            return <TabEvolutionIcon size={size} color={color} />;
          } else if (route.name === 'Diet') {
            return <DietIcon size={size + 4} color={color} />;
          } else if (route.name === 'Profile') {
            return <TabProfileIcon size={size} color={color} />;
          }
          
          return <Icon name="help" size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ tabBarLabel: t('home') }}
      />
      <Tab.Screen 
        name="Evolution" 
        component={EvolutionScreen} 
        options={{ tabBarLabel: t('evolution') }}
      />
      <Tab.Screen 
        name="Diet" 
        component={DietScreen} 
        options={{ tabBarLabel: t('diet') }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarLabel: t('profile') }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="ProfileRegistration" component={ProfileRegistrationScreen} />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="AddWorkout" component={AddWorkoutScreen} />
        <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
        <Stack.Screen name="Diet" component={DietScreen} />
        <Stack.Screen name="AddDish" component={AddDishScreen} />
        <Stack.Screen name="BMICalculator" component={BMICalculatorScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="LanguageSelector" component={LanguageSelectorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;