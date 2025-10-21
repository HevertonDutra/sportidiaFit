import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';


const AddDishScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [dishName, setDishName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [calories, setCalories] = useState('');
  const [saving, setSaving] = useState(false);

  const validateForm = () => {
    if (!dishName.trim()) {
      Alert.alert('Erro', 'Por favor, insira o nome do prato.');
      return false;
    }
    if (!ingredients.trim()) {
      Alert.alert('Erro', 'Por favor, insira a lista de ingredientes.');
      return false;
    }
    if (!calories.trim() || isNaN(calories) || parseFloat(calories) <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido para as calorias.');
      return false;
    }
    return true;
  };

  const saveDish = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const newDish = {
        id: Date.now().toString(),
        name: dishName.trim(),
        ingredients: ingredients.trim(),
        calories: parseFloat(calories),
        createdAt: new Date().toISOString(),
      };

      const existingDishes = await AsyncStorage.getItem('dishes');
      const dishes = existingDishes ? JSON.parse(existingDishes) : [];
      dishes.push(newDish);

      await AsyncStorage.setItem('dishes', JSON.stringify(dishes));
      
      Alert.alert(
        'Sucesso',
        'Prato cadastrado com sucesso!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Erro ao salvar prato:', error);
      Alert.alert('Erro', 'Não foi possível salvar o prato. Tente novamente.');
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
      height: 120,
      textAlignVertical: 'top',
    },
    caloriesInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    caloriesInput: {
      flex: 1,
    },
    caloriesUnit: {
      fontSize: 16,
      color: theme.textSecondary,
      marginLeft: 10,
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
    hint: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 5,
      fontStyle: 'italic',
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
        <Text style={styles.title}>Novo Prato</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome do Prato *</Text>
          <TextInput
            style={styles.input}
            value={dishName}
            onChangeText={setDishName}
            placeholder="Ex: Salada Caesar"
            placeholderTextColor={theme.textSecondary}
            maxLength={50}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Lista de Ingredientes *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={ingredients}
            onChangeText={setIngredients}
            placeholder="Ex: Alface americana, frango grelhado, croutons, parmesão, molho caesar..."
            placeholderTextColor={theme.textSecondary}
            multiline
            maxLength={300}
          />
          <Text style={styles.hint}>
            Liste os principais ingredientes separados por vírgula
          </Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Calorias *</Text>
          <View style={styles.caloriesInputContainer}>
            <TextInput
              style={[styles.input, styles.caloriesInput]}
              value={calories}
              onChangeText={setCalories}
              placeholder="350"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              maxLength={6}
            />
            <Text style={styles.caloriesUnit}>kcal</Text>
          </View>
          <Text style={styles.hint}>
            Valor aproximado de calorias por porção
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.saveButton,
            saving && styles.disabledButton,
          ]}
          onPress={saveDish}
          disabled={saving}
          activeOpacity={0.7}
        >
          <Text style={styles.saveButtonText}>
            {saving ? 'Salvando...' : 'Salvar Prato'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddDishScreen;