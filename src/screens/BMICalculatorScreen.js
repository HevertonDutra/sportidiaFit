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
import Icon from 'react-native-vector-icons/MaterialIcons';

const BMICalculatorScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  const calculateBMI = () => {
    if (!weight.trim() || !height.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o peso e a altura.');
      return;
    }

    const weightNum = parseFloat(weight.replace(',', '.'));
    const heightNum = parseFloat(height.replace(',', '.'));

    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      Alert.alert('Erro', 'Por favor, insira valores válidos para peso e altura.');
      return;
    }

    if (heightNum > 250 || heightNum < 50) {
      Alert.alert('Erro', 'A altura deve estar entre 50 e 250 cm.');
      return;
    }

    // Converter altura de cm para metros para o cálculo
    const heightInMeters = heightNum / 100;
    const bmi = weightNum / (heightInMeters * heightInMeters);
    setBmiResult(bmi);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Abaixo do peso', color: '#3498db' };
    if (bmi < 25) return { category: 'Peso normal', color: '#27ae60' };
    if (bmi < 30) return { category: 'Sobrepeso', color: '#f39c12' };
    if (bmi < 35) return { category: 'Obesidade grau I', color: '#e67e22' };
    if (bmi < 40) return { category: 'Obesidade grau II', color: '#d35400' };
    return { category: 'Obesidade grau III', color: '#c0392b' };
  };

  const clearFields = () => {
    setWeight('');
    setHeight('');
    setBmiResult(null);
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
    infoCard: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 20,
      marginBottom: 25,
      borderWidth: 1,
      borderColor: theme.border,
    },
    infoTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 10,
    },
    infoText: {
      fontSize: 14,
      color: theme.textSecondary,
      lineHeight: 20,
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
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.background,
    },
    unit: {
      fontSize: 16,
      color: theme.textSecondary,
      marginLeft: 10,
      fontWeight: '600',
      minWidth: 25,
    },
    buttonsRow: {
      flexDirection: 'row',
      marginBottom: 20,
      marginTop: 10,
    },
    calculateButton: {
      backgroundColor: theme.primary,
      borderRadius: 12,
      paddingVertical: 15,
      alignItems: 'center',
      flex: 1,
      marginRight: 10,
      minHeight: 50,
      justifyContent: 'center',
    },
    clearButton: {
      backgroundColor: theme.textSecondary,
      borderRadius: 12,
      paddingVertical: 15,
      alignItems: 'center',
      flex: 1,
      marginLeft: 10,
      minHeight: 50,
      justifyContent: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    resultCard: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 25,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
    },
    bmiValue: {
      fontSize: 48,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 10,
    },
    bmiCategory: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 15,
    },
    bmiDescription: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    rangesCard: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 20,
      marginTop: 20,
      borderWidth: 1,
      borderColor: theme.border,
    },
    rangesTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 15,
      textAlign: 'center',
    },
    rangeItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    rangeCategory: {
      fontSize: 14,
      color: theme.text,
    },
    rangeValue: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textSecondary,
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
        <Text style={styles.title}>Calculadora IMC</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Índice de Massa Corporal</Text>
          <Text style={styles.infoText}>
            O IMC é uma medida que relaciona seu peso com sua altura para avaliar se você está dentro de uma faixa de peso saudável.
          </Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Peso *</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              placeholder="70.5"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              maxLength={6}
            />
            <Text style={styles.unit}>kg</Text>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Altura *</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              placeholder="175"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              maxLength={3}
            />
            <Text style={styles.unit}>cm</Text>
          </View>
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculateBMI}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Calcular IMC</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearFields}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {bmiResult && (
          <View style={styles.resultCard}>
            <Text style={styles.bmiValue}>{bmiResult.toFixed(1)}</Text>
            <Text style={[styles.bmiCategory, { color: getBMICategory(bmiResult).color }]}>
              {getBMICategory(bmiResult).category}
            </Text>
            <Text style={styles.bmiDescription}>
              Seu IMC indica que você está na categoria "{getBMICategory(bmiResult).category}".
              Consulte sempre um profissional de saúde para uma avaliação personalizada.
            </Text>
          </View>
        )}

        <View style={styles.rangesCard}>
          <Text style={styles.rangesTitle}>Tabela de Referência IMC</Text>
          
          <View style={styles.rangeItem}>
            <Text style={styles.rangeCategory}>Abaixo do peso</Text>
            <Text style={styles.rangeValue}>Menor que 18,5</Text>
          </View>
          
          <View style={styles.rangeItem}>
            <Text style={styles.rangeCategory}>Peso normal</Text>
            <Text style={styles.rangeValue}>18,5 - 24,9</Text>
          </View>
          
          <View style={styles.rangeItem}>
            <Text style={styles.rangeCategory}>Sobrepeso</Text>
            <Text style={styles.rangeValue}>25,0 - 29,9</Text>
          </View>
          
          <View style={styles.rangeItem}>
            <Text style={styles.rangeCategory}>Obesidade grau I</Text>
            <Text style={styles.rangeValue}>30,0 - 34,9</Text>
          </View>
          
          <View style={styles.rangeItem}>
            <Text style={styles.rangeCategory}>Obesidade grau II</Text>
            <Text style={styles.rangeValue}>35,0 - 39,9</Text>
          </View>
          
          <View style={styles.rangeItem}>
            <Text style={styles.rangeCategory}>Obesidade grau III</Text>
            <Text style={styles.rangeValue}>Maior que 40,0</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BMICalculatorScreen;