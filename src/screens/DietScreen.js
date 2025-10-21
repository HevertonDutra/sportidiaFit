import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DietScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDishes();
  }, []);

  const loadDishes = async () => {
    try {
      const storedDishes = await AsyncStorage.getItem('dishes');
      if (storedDishes) {
        setDishes(JSON.parse(storedDishes));
      }
    } catch (error) {
      console.error('Erro ao carregar pratos:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDish = async (dishId) => {
    Alert.alert(
      'Excluir Prato',
      'Tem certeza que deseja excluir este prato?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedDishes = dishes.filter(dish => dish.id !== dishId);
              setDishes(updatedDishes);
              await AsyncStorage.setItem('dishes', JSON.stringify(updatedDishes));
            } catch (error) {
              console.error('Erro ao excluir prato:', error);
            }
          },
        },
      ]
    );
  };

  const renderDishCard = ({ item }) => (
    <View style={[styles.dishCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={styles.dishInfo}>
        <Text style={[styles.dishName, { color: theme.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.caloriesText, { color: theme.primary }]}>
          {item.calories} kcal
        </Text>
        <Text style={[styles.ingredientsText, { color: theme.textSecondary }]} numberOfLines={2}>
          {item.ingredients}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteDish(item.id)}
        activeOpacity={0.7}
      >
        <Icon name="delete" size={24} color={theme.error || '#FF6B6B'} />
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
    backButton: {
      padding: 8,
      minHeight: 48,
      minWidth: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 16,
    },
    actionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      paddingHorizontal: 4,
    },
    actionButton: {
      backgroundColor: theme.primary,
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 8,
      flex: 1,
      marginHorizontal: 5,
      alignItems: 'center',
      minHeight: 50,
      justifyContent: 'center',
    },
    actionButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 16,
    },
    dishCard: {
      borderRadius: 10,
      marginBottom: 16,
      borderWidth: 1,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center',
    },
    dishInfo: {
      flex: 1,
      paddingRight: 8,
    },
    dishName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    caloriesText: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    ingredientsText: {
      fontSize: 16,
      lineHeight: 18,
    },
    deleteButton: {
      padding: 8,
      minHeight: 48,
      minWidth: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 50,
    },
    emptyText: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      marginTop: 16,
    },
  });

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>Carregando pratos...</Text>
      </View>
    );
  }

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
        <Text style={styles.title}>Dieta</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('AddDish')}
            activeOpacity={0.7}
          >
            <Text style={styles.actionButtonText}>Novo Prato</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('BMICalculator')}
            activeOpacity={0.7}
          >
            <Text style={styles.actionButtonText}>Calcular IMC</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Meus Pratos</Text>

        {dishes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="restaurant" size={80} color={theme.textSecondary} />
            <Text style={styles.emptyText}>
              Nenhum prato cadastrado ainda.{'\n'}
              Toque em "Novo Prato" para começar!
            </Text>
          </View>
        ) : (
          <FlatList
            data={dishes}
            renderItem={renderDishCard}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default DietScreen;
