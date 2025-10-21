import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WorkoutScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const storedWorkouts = await AsyncStorage.getItem('workouts');
      if (storedWorkouts) {
        setWorkouts(JSON.parse(storedWorkouts));
      }
    } catch (error) {
      console.error('Erro ao carregar treinos:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkout = async (workoutId) => {
    Alert.alert(
      'Excluir Treino',
      'Tem certeza que deseja excluir este treino?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedWorkouts = workouts.filter(workout => workout.id !== workoutId);
              setWorkouts(updatedWorkouts);
              await AsyncStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
            } catch (error) {
              console.error('Erro ao excluir treino:', error);
            }
          },
        },
      ]
    );
  };

  const renderWorkoutCard = ({ item }) => (
    <View style={[styles.workoutCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
        activeOpacity={0.7}
      >
        {item.videoUri && (
          <View style={styles.videoThumbnail}>
            <Icon name="play-circle-filled" size={40} color={theme.primary} />
            <Text style={[styles.videoLabel, { color: theme.textSecondary }]}>Vídeo</Text>
          </View>
        )}
        
        <View style={styles.workoutInfo}>
          <Text style={[styles.workoutName, { color: theme.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={[styles.equipmentName, { color: theme.primary }]} numberOfLines={1}>
            {item.equipment}
          </Text>
          <Text style={[styles.workoutDescription, { color: theme.textSecondary }]} numberOfLines={2}>
            {item.description}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={(e) => {
            e.stopPropagation();
            deleteWorkout(item.id);
          }}
          activeOpacity={0.7}
        >
          <Icon name="delete" size={24} color={theme.error || '#FF6B6B'} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );



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
      paddingVertical: 16,
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
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 8,
      minHeight: 48,
      minWidth: 100,
    },
    addButtonText: {
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
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      marginTop: 16,
    },
    workoutCard: {
      borderRadius: 10,
      marginBottom: 16,
      borderWidth: 1,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    cardContent: {
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center',
    },
    videoThumbnail: {
      width: 80,
      height: 80,
      backgroundColor: theme.background,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    videoLabel: {
      fontSize: 14,
      marginTop: 4,
    },
    workoutInfo: {
      flex: 1,
      paddingRight: 8,
    },
    workoutName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    equipmentName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    workoutDescription: {
      fontSize: 16,
      lineHeight: 20,
    },
    deleteButton: {
      padding: 8,
      minHeight: 48,
      minWidth: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>Carregando treinos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Treinos</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddWorkout')}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>Novo Treino</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {workouts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="fitness-center" size={40} color={theme.textSecondary} />
            <Text style={styles.emptyText}>
              Nenhum treino cadastrado ainda.{'\n'}
              Toque em "Novo Treino" para começar!
            </Text>
          </View>
        ) : (
          <FlatList
            data={workouts}
            renderItem={renderWorkoutCard}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default WorkoutScreen;
