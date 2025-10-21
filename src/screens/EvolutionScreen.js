import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
  Linking,
  Platform,
  PermissionsAndroid,
  Animated,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
// Sistema de IA simulado (sem dependência externa problemática)

const { width } = Dimensions.get('window');

const EvolutionScreen = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  const [evolutionData, setEvolutionData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard ou history
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    weight: '',
    height: '',
    chest: '',
    waist: '',
    hips: '',
    biceps: '',
    thighs: '',
    date: new Date().toLocaleDateString('pt-BR'),
  });
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    weight: '',
    height: '',
    chest: '',
    waist: '',
    hips: '',
    biceps: '',
    thighs: '',
    date: '',
  });

  // Estados para o sistema de IA com voz
  const [isListening, setIsListening] = useState(false);
  const [voiceResults, setVoiceResults] = useState([]);
  const [voiceModalVisible, setVoiceModalVisible] = useState(false);
  const [processingVoice, setProcessingVoice] = useState(false);
  const [microphoneAnimation] = useState(new Animated.Value(1));

  useEffect(() => {
    loadEvolutionData();
    initializeSampleData();
  }, []);

  // Função para criar registros de exemplo com mais cenários
  const initializeSampleData = async () => {
    try {
      // Sempre recriar dados de exemplo para teste
      const sampleData = [
        // REGISTRO 1 - Início da jornada (baseline)
        {
          id: '1',
          firstName: 'João',
          lastName: 'Silva',
          weight: '85.5',
          height: '175',
          chest: '98',
          waist: '95',
          hips: '105',
          biceps: '32',
          thighs: '58',
          date: '01/01/2024',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
        // REGISTRO 2 - Primeira evolução (algumas melhorias)
        {
          id: '2',
          firstName: 'João',
          lastName: 'Silva',
          weight: '83.2',
          height: '175',
          chest: '100',
          waist: '92',
          hips: '102',
          biceps: '34',
          thighs: '60',
          date: '01/02/2024',
          createdAt: '2024-02-01T00:00:00.000Z',
        },
        // REGISTRO 3 - Progresso consistente
        {
          id: '3',
          firstName: 'João',
          lastName: 'Silva',
          weight: '80.8',
          height: '175',
          chest: '103',
          waist: '88',
          hips: '99',
          biceps: '36',
          thighs: '62',
          date: '01/03/2024',
          createdAt: '2024-03-01T00:00:00.000Z',
        },
        // REGISTRO 4 - Platô com alguns retrocessos
        {
          id: '4',
          firstName: 'João',
          lastName: 'Silva',
          weight: '81.5',
          height: '175',
          chest: '102',
          waist: '90',
          hips: '100',
          biceps: '35',
          thighs: '61',
          date: '01/04/2024',
          createdAt: '2024-04-01T00:00:00.000Z',
        },
        // REGISTRO 5 - Recuperação e melhoria
        {
          id: '5',
          firstName: 'João',
          lastName: 'Silva',
          weight: '78.5',
          height: '175',
          chest: '106',
          waist: '85',
          hips: '96',
          biceps: '38',
          thighs: '64',
          date: '01/05/2024',
          createdAt: '2024-05-01T00:00:00.000Z',
        },
        // REGISTRO 6 - Evolução excelente
        {
          id: '6',
          firstName: 'João',
          lastName: 'Silva',
          weight: '76.2',
          height: '175',
          chest: '109',
          waist: '82',
          hips: '93',
          biceps: '40',
          thighs: '66',
          date: '01/06/2024',
          createdAt: '2024-06-01T00:00:00.000Z',
        },
        // REGISTRO 7 - Manutenção com pequenas melhorias
        {
          id: '7',
          firstName: 'João',
          lastName: 'Silva',
          weight: '75.8',
          height: '175',
          chest: '110',
          waist: '81',
          hips: '92',
          biceps: '41',
          thighs: '67',
          date: '01/07/2024',
          createdAt: '2024-07-01T00:00:00.000Z',
        },
        // REGISTRO 8 - Pequeno retrocesso (teste de cores vermelhas)
        {
          id: '8',
          firstName: 'João',
          lastName: 'Silva',
          weight: '77.1',
          height: '175',
          chest: '108',
          waist: '83',
          hips: '94',
          biceps: '40',
          thighs: '66',
          date: '01/08/2024',
          createdAt: '2024-08-01T00:00:00.000Z',
        },
        // REGISTRO 9 - Evoluções mistas (algumas positivas e negativas)
        {
          id: '9',
          firstName: 'João',
          lastName: 'Silva',
          weight: '75.5',
          height: '175',
          chest: '111',
          waist: '85', // PIOROU: 80 → 85 (+5cm na cintura)
          hips: '91',
          biceps: '42',
          thighs: '71', // PIOROU: 68 → 71 (+3cm nas coxas)
          date: '01/09/2024',
          createdAt: '2024-09-01T00:00:00.000Z',
        },
        // REGISTRO 10 - Resultado final com evoluções negativas visíveis
        {
          id: '10',
          firstName: 'João',
          lastName: 'Silva',
          weight: '74.2', // MELHOROU
          height: '175',
          chest: '113', // MELHOROU
          waist: '88', // PIOROU: 85 → 88 (+3cm na cintura)
          hips: '89', // MELHOROU
          biceps: '43', // MELHOROU
          thighs: '73', // PIOROU: 71 → 73 (+2cm nas coxas)
          date: '14/10/2024',
          createdAt: '2024-10-14T00:00:00.000Z',
        },
      ];
      setEvolutionData(sampleData);
      await AsyncStorage.setItem('evolutionData', JSON.stringify(sampleData));
      console.log('✅ 10 registros de teste criados com sucesso!');
    } catch (error) {
      console.error('Error initializing sample data:', error);
    }
  };

  const loadEvolutionData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('evolutionData');
      if (savedData) {
        setEvolutionData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Error loading evolution data:', error);
    }
  };

  const saveEvolutionData = async (data) => {
    try {
      await AsyncStorage.setItem('evolutionData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving evolution data:', error);
    }
  };

  // =============================================
  // SISTEMA DE IA COM RECONHECIMENTO DE VOZ
  // =============================================

  // Sistema de IA simulado - sem dependência externa
  useEffect(() => {
    // Simulação pronta para integração futura com Web Speech API ou outra solução
    console.log('🤖 Sistema de IA por voz inicializado (modo simulação)');
  }, []);

  // Funções simuladas do sistema de voz
  const simulateVoiceRecognition = () => {
    setIsListening(true);
    console.log('🎤 Simulando reconhecimento de voz...');
    
    // Simular tempo de escuta
    setTimeout(() => {
      setIsListening(false);
      setProcessingVoice(true);
      
      // Exemplos de comandos simulados
      const sampleCommands = [
        'peso 75 quilos altura 1 metro e 80',
        'meu peso é 80 kg e altura 175 cm',
        'peso 70 altura 1.70 peito 100 cintura 85',
        'estou pesando 68 quilos, altura 1 metro 65, braço 35 centímetros',
      ];
      
      const randomCommand = sampleCommands[Math.floor(Math.random() * sampleCommands.length)];
      setVoiceResults([randomCommand]);
      
      setTimeout(() => {
        processVoiceCommand(randomCommand);
      }, 1000);
    }, 3000);
  };

  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: t('micPermissionTitle'),
            message: t('micPermissionMessage'),
            buttonNeutral: t('askLater'),
            buttonNegative: t('cancel'),
            buttonPositive: t('ok'),
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const startListening = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      Alert.alert(t('permissionDenied'), t('micPermissionRequired'));
      return;
    }

    try {
      setVoiceModalVisible(true);
      setVoiceResults([]);
      setProcessingVoice(false);
      
      // Animação do microfone
      Animated.loop(
        Animated.sequence([
          Animated.timing(microphoneAnimation, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(microphoneAnimation, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Iniciar simulação de reconhecimento de voz
      simulateVoiceRecognition();
    } catch (e) {
      console.error('Error starting voice recognition:', e);
      setVoiceModalVisible(false);
    }
  };

  const stopListening = async () => {
    try {
      setIsListening(false);
      setProcessingVoice(false);
      microphoneAnimation.stopAnimation();
      microphoneAnimation.setValue(1);
    } catch (e) {
      console.error('Error stopping voice recognition:', e);
    }
  };

  const processVoiceCommand = (command) => {
    setProcessingVoice(true);
    console.log('🤖 Processing voice command:', command);

    // Converter para minúsculas para facilitar processamento
    const lowerCommand = command.toLowerCase();

    try {
      // Parser inteligente para extrair dados
      const extractedData = parseVoiceData(lowerCommand);
      
      if (Object.keys(extractedData).length > 0) {
        // Aplicar dados extraídos ao formulário
        setFormData(prev => ({
          ...prev,
          ...extractedData
        }));
        
        Alert.alert(
          t('voiceSuccess'), 
          t('voiceDataExtracted'),
          [
            {
              text: t('ok'),
              onPress: () => {
                setVoiceModalVisible(false);
                setProcessingVoice(false);
              }
            }
          ]
        );
      } else {
        Alert.alert(
          t('voiceNoData'), 
          t('voiceNoDataMessage'),
          [
            {
              text: t('tryAgain'),
              onPress: () => {
                setProcessingVoice(false);
                startListening();
              }
            },
            {
              text: t('cancel'),
              onPress: () => {
                setVoiceModalVisible(false);
                setProcessingVoice(false);
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error processing voice command:', error);
      setProcessingVoice(false);
      Alert.alert(t('voiceError'), t('voiceProcessingError'));
    }
  };

  const parseVoiceData = (command) => {
    const extractedData = {};

    // Padrões para peso em português
    const weightPatterns = [
      /(?:peso|pesar|estou pesando|tenho|kg|quilos?)\s*(?:de\s*)?(?:é\s*)?(\d+(?:[,\.]\d+)?)\s*(?:kg|quilos?|quilo)?/gi,
      /(\d+(?:[,\.]\d+)?)\s*(?:kg|quilos?|quilo)/gi,
    ];

    // Padrões para altura em português  
    const heightPatterns = [
      /(?:altura|alto|metro|metros|cm|centímetros?)\s*(?:de\s*)?(?:é\s*)?(\d+(?:[,\.]\d+)?)\s*(?:m|metros?|cm|centímetros?)?/gi,
      /(\d+(?:[,\.]\d+)?)\s*(?:m|metros?)\s*(?:e\s*)?(?:(\d+)\s*(?:cm|centímetros?))?/gi,
    ];

    // Padrões para medidas corporais
    const chestPatterns = [
      /(?:peito|peitoral|tórax|busto)\s*(?:de\s*)?(?:é\s*)?(\d+(?:[,\.]\d+)?)\s*(?:cm|centímetros?)?/gi,
    ];

    const waistPatterns = [
      /(?:cintura|barriga|abdômen|abdominal)\s*(?:de\s*)?(?:é\s*)?(\d+(?:[,\.]\d+)?)\s*(?:cm|centímetros?)?/gi,
    ];

    const hipsPatterns = [
      /(?:quadril|quadris|bunda)\s*(?:de\s*)?(?:é\s*)?(\d+(?:[,\.]\d+)?)\s*(?:cm|centímetros?)?/gi,
    ];

    const bicepsPatterns = [
      /(?:bíceps?|braço|braços)\s*(?:de\s*)?(?:é\s*)?(\d+(?:[,\.]\d+)?)\s*(?:cm|centímetros?)?/gi,
    ];

    const thighsPatterns = [
      /(?:coxa|coxas|perna|pernas)\s*(?:de\s*)?(?:é\s*)?(\d+(?:[,\.]\d+)?)\s*(?:cm|centímetros?)?/gi,
    ];

    // Função helper para extrair valor
    const extractValue = (patterns, text) => {
      for (const pattern of patterns) {
        const match = pattern.exec(text);
        if (match) {
          return match[1]?.replace(',', '.') || null;
        }
      }
      return null;
    };

    // Extrair dados
    const weight = extractValue(weightPatterns, command);
    if (weight) extractedData.weight = weight;

    const height = extractValue(heightPatterns, command);
    if (height) {
      // Converter para cm se estiver em metros
      const heightNum = parseFloat(height);
      if (heightNum < 3) {
        extractedData.height = (heightNum * 100).toString();
      } else {
        extractedData.height = height;
      }
    }

    const chest = extractValue(chestPatterns, command);
    if (chest) extractedData.chest = chest;

    const waist = extractValue(waistPatterns, command);
    if (waist) extractedData.waist = waist;

    const hips = extractValue(hipsPatterns, command);
    if (hips) extractedData.hips = hips;

    const biceps = extractValue(bicepsPatterns, command);
    if (biceps) extractedData.biceps = biceps;

    const thighs = extractValue(thighsPatterns, command);
    if (thighs) extractedData.thighs = thighs;

    console.log('🔍 Extracted data:', extractedData);
    return extractedData;
  };

  const handleSave = () => {
    if (!formData.firstName || !formData.lastName || !formData.weight || !formData.height) {
      Alert.alert(t('error'), t('requiredFieldsError'));
      return;
    }

    const newEntry = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedData = [newEntry, ...evolutionData];
    setEvolutionData(updatedData);
    saveEvolutionData(updatedData);
    
    setFormData({
      firstName: '',
      lastName: '',
      weight: '',
      height: '',
      chest: '',
      waist: '',
      hips: '',
      biceps: '',
      thighs: '',
      date: new Date().toLocaleDateString('pt-BR'),
    });
    
    setModalVisible(false);
    Alert.alert(t('success'), t('evolutionSaved'));
  };

  const deleteEntry = (id) => {
    Alert.alert(
      t('deleteRecord'),
      t('deleteRecordConfirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: () => {
            const updatedData = evolutionData.filter(item => item.id !== id);
            setEvolutionData(updatedData);
            saveEvolutionData(updatedData);
          },
        },
      ]
    );
  };

  const editEntry = (item) => {
    setEditingItem(item);
    setEditFormData({
      firstName: item.firstName,
      lastName: item.lastName,
      weight: item.weight,
      height: item.height,
      chest: item.chest || '',
      waist: item.waist || '',
      hips: item.hips || '',
      biceps: item.biceps || '',
      thighs: item.thighs || '',
      date: item.date,
    });
    setEditModalVisible(true);
  };

  const saveEditedEntry = () => {
    if (!editFormData.firstName || !editFormData.lastName || !editFormData.weight || !editFormData.height) {
      Alert.alert(t('error'), t('requiredFieldsError'));
      return;
    }

    const updatedData = evolutionData.map(item => {
      if (item.id === editingItem.id) {
        return {
          ...item,
          firstName: editFormData.firstName,
          lastName: editFormData.lastName,
          weight: editFormData.weight,
          height: editFormData.height,
          chest: editFormData.chest,
          waist: editFormData.waist,
          hips: editFormData.hips,
          biceps: editFormData.biceps,
          thighs: editFormData.thighs,
        };
      }
      return item;
    });

    setEvolutionData(updatedData);
    saveEvolutionData(updatedData);
    setEditModalVisible(false);
    setEditingItem(null);
    Alert.alert(t('success'), t('recordUpdated'));
  };

  // Função para recriar dados de teste
  const recreateTestData = () => {
    Alert.alert(
      t('clearAllData'),
      t('clearAllConfirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('clear'),
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('evolutionData');
            await initializeSampleData();
            Alert.alert(t('success'), t('testRecordsCreated'));
          },
        },
      ]
    );
  };

  // Função para calcular evolução entre dois registros
  const calculateEvolution = () => {
    if (evolutionData.length < 2) return [];
    
    const sorted = evolutionData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const latest = sorted[sorted.length - 1];
    const previous = sorted[sorted.length - 2];
    
    const evolutions = [];
    
    const metrics = [
      { key: 'weight', label: t('weight'), unit: 'kg', inverse: true }, // peso menor é melhor
      { key: 'chest', label: t('chest'), unit: 'cm', inverse: false }, // peito maior é melhor
      { key: 'waist', label: t('waist'), unit: 'cm', inverse: true }, // cintura menor é melhor
      { key: 'hips', label: t('hips'), unit: 'cm', inverse: true }, // quadril menor é melhor
      { key: 'biceps', label: t('biceps'), unit: 'cm', inverse: false }, // bíceps maior é melhor
      { key: 'thighs', label: t('thighs'), unit: 'cm', inverse: false }, // coxas maior é melhor
    ];
    
    metrics.forEach(metric => {
      const currentValue = parseFloat(latest[metric.key] || 0);
      const previousValue = parseFloat(previous[metric.key] || 0);
      
      if (currentValue && previousValue) {
        const difference = currentValue - previousValue;
        const percentChange = ((difference / previousValue) * 100).toFixed(1);
        
        let isPositive;
        if (metric.inverse) {
          isPositive = difference < 0; // Para peso e cintura, redução é positiva
        } else {
          isPositive = difference > 0; // Para músculos, aumento é positivo
        }
        
        evolutions.push({
          label: metric.label,
          current: currentValue,
          previous: previousValue,
          difference: Math.abs(difference),
          percentChange: Math.abs(parseFloat(percentChange)),
          isPositive,
          unit: metric.unit,
          trend: difference > 0 ? 'up' : difference < 0 ? 'down' : 'equal',
        });
      }
    });
    
    return evolutions;
  };

  // Função para calcular estatísticas gerais
  const getEvolutionStats = () => {
    const evolutions = calculateEvolution();
    const positive = evolutions.filter(e => e.isPositive).length;
    const negative = evolutions.filter(e => !e.isPositive).length;
    const total = evolutions.length;
    
    return { positive, negative, total, evolutions };
  };

  // Funções de Exportação e Compartilhamento
  const generateReportText = () => {
    const stats = getEvolutionStats();
    const latest = evolutionData[evolutionData.length - 1];
    const previous = evolutionData[evolutionData.length - 2];
    
    if (!latest || !previous) return '';

    let report = `🏆 RELATÓRIO DE EVOLUÇÃO SPORTIDIAFIT\n`;
    report += `=====================================\n\n`;
    report += `👤 Usuário: ${latest.firstName} ${latest.lastName}\n`;
    report += `📅 Período: ${previous.date} → ${latest.date}\n\n`;
    
    report += `📊 RESUMO GERAL:\n`;
    report += `✅ Evoluções Positivas: ${stats.positive}\n`;
    report += `❌ Evoluções Negativas: ${stats.negative}\n`;
    report += `📈 Taxa de Sucesso: ${((stats.positive / stats.total) * 100).toFixed(0)}%\n\n`;
    
    report += `📏 DETALHES DAS MÉTRICAS:\n`;
    stats.evolutions.forEach(evolution => {
      const icon = evolution.isPositive ? '✅' : '❌';
      const trend = evolution.trend === 'up' ? '↗️' : '↘️';
      report += `${icon} ${evolution.label}: ${evolution.previous} → ${evolution.current} ${evolution.unit} `;
      report += `${trend} ${evolution.difference.toFixed(1)} ${evolution.unit} (${evolution.percentChange}%)\n`;
    });
    
    report += `\n💪 Gerado pelo SportidiaFit App`;
    return report;
  };

  // Função única de compartilhamento que abre o menu nativo do sistema
  const shareEvolutionReport = async () => {
    try {
      if (evolutionData.length < 2) {
        Alert.alert(t('error'), t('minRecordsShare'));
        return;
      }

      const stats = getEvolutionStats();
      const latest = evolutionData[evolutionData.length - 1];
      const previous = evolutionData[evolutionData.length - 2];
      
      // Criar mensagem de evolução
      let message = `🏆 ${t('evolutionReport').toUpperCase()}!\n\n`;
      message += `� ${latest.firstName} ${latest.lastName}\n`;
      message += `📅 ${previous.date} → ${latest.date}\n\n`;
      message += `📊 ${t('comparison').toUpperCase()}:\n`;
      message += `✅ ${stats.positive} ${t('positiveEvolutions')}\n`;
      message += `❌ ${stats.negative} ${t('negativeEvolutions')}\n`;
      message += `📈 ${((stats.positive / stats.total) * 100).toFixed(0)}% ${t('successRate')}\n\n`;
      
      // Adicionar detalhes das principais métricas
      stats.evolutions.forEach(evolution => {
        const icon = evolution.isPositive ? '✅' : '❌';
        const trend = evolution.trend === 'up' ? '↗️' : '↘️';
        message += `${icon} ${evolution.label}: ${evolution.previous} → ${evolution.current} ${evolution.unit} ${trend}\n`;
      });
      
      message += `\n💪 Alcance seus objetivos com o SportidiaFit!`;
      message += `\n🏆 #SportidiaFit #Fitness #Evolucao #Treino #Saude #Academia #Musculacao #ComunidadeSportidia`;

      // Opções de compartilhamento nativo
      const shareOptions = {
        title: `SportidiaFit - ${t('evolutionReport')}`,
        message: message,
        subject: t('evolutionReport'), // Para email
        url: 'https://sportidia.com', // URL opcional
      };

      // Abrir menu nativo de compartilhamento do sistema operacional
      await Share.open(shareOptions);
      
    } catch (error) {
      if (error.message !== 'User did not share') {
        console.error('Error sharing evolution report:', error);
        Alert.alert(t('error'), t('shareError'));
      }
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
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    tabContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: theme.surface,
    },
    tab: {
      flex: 1,
      paddingVertical: 8,
      alignItems: 'center',
      borderRadius: 12,
      marginHorizontal: 5,
      minHeight: 48,
      justifyContent: 'center',
    },
    activeTab: {
      backgroundColor: theme.primary,
    },
    inactiveTab: {
      backgroundColor: 'transparent',
    },
    tabText: {
      fontSize: 16,
      fontWeight: '600',
    },
    activeTabText: {
      color: '#FFFFFF',
    },
    inactiveTabText: {
      color: theme.textSecondary,
    },
    dashboardContainer: {
      flex: 1,
      paddingHorizontal: 16,
    },
    statsCard: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    // Estilos para Design Moderno com Gráficos
    modernGraphCard: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 1,
      borderColor: theme.border,
    },
    modernHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    modernHeaderCentered: {
      alignItems: 'center',
      marginBottom: 16,
    },
    modernTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.text,
      letterSpacing: 0.3,
    },
    shareButton: {
      padding: 8,
      borderRadius: 6,
      backgroundColor: theme.surface,
      minHeight: 48,
      minWidth: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    visualSummaryContainer: {
      backgroundColor: theme.surface,
      borderRadius: 10,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    summaryTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textSecondary,
      textAlign: 'center',
      marginBottom: 12,
      letterSpacing: 1,
    },
    metricsRow: {
      marginBottom: 16,
    },
    metricItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    colorIndicator: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 8,
    },
    metricText: {
      fontSize: 14,
      color: theme.text,
      fontWeight: '500',
    },
    perfectionIndicator: {
      height: 40,
      backgroundColor: '#F5F5F5',
      borderRadius: 20,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    perfectionBar: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      backgroundColor: '#4CAF50',
      borderRadius: 20,
      minWidth: 4,
    },
    perfectionText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      zIndex: 1,
    },
    distributionSection: {
      marginBottom: 20,
    },
    distributionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 12,
    },
    distributionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      paddingVertical: 4,
    },
    distributionLabel: {
      fontSize: 14,
      color: theme.text,
      width: 80,
      fontWeight: '500',
    },
    dotContainer: {
      flexDirection: 'row',
      flex: 1,
      marginHorizontal: 12,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 1,
    },
    distributionPercent: {
      fontSize: 12,
      color: theme.textSecondary,
      width: 80,
      textAlign: 'right',
      fontWeight: '500',
    },
    timelineSection: {
      backgroundColor: theme.surface,
      borderRadius: 8,
      padding: 12,
      borderLeftWidth: 4,
      borderLeftColor: theme.primary,
    },
    timelineText: {
      fontSize: 14,
      color: theme.textSecondary,
      fontStyle: 'italic',
      textAlign: 'center',
    },
    statsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    statsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
    },
    comparisonSubtitle: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 15,
      fontStyle: 'italic',
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    statLabel: {
      fontSize: 16,
      color: theme.textSecondary,
    },
    positiveColor: {
      color: '#4CAF50',
    },
    negativeColor: {
      color: '#F44336',
    },
    evolutionGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    evolutionItem: {
      width: (width - 48) / 3,
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 15,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3,
    },
    evolutionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    evolutionLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
    },
    evolutionIcon: {
      padding: 4,
      borderRadius: 12,
    },
    positiveBackground: {
      backgroundColor: '#E8F5E8',
    },
    negativeBackground: {
      backgroundColor: '#FFEBEE',
    },
    evolutionValue: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    evolutionChange: {
      fontSize: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    changeText: {
      marginLeft: 4,
      fontSize: 12,
    },
    previousValue: {
      fontSize: 11,
      color: theme.textSecondary,
      marginTop: 2,
    },

    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
    },
    headerButtons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    addButton: {
      backgroundColor: theme.primary,
      borderRadius: 25,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingBottom: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyText: {
      fontSize: 18,
      color: theme.textSecondary,
      textAlign: 'center',
      marginTop: 20,
    },
    evolutionCard: {
      backgroundColor: theme.card,
      borderRadius: 15,
      padding: 20,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
    },
    cardDate: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    cardContent: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    dataItem: {
      width: '48%',
      marginBottom: 10,
    },
    dataLabel: {
      fontSize: 12,
      color: theme.textSecondary,
      marginBottom: 2,
    },
    dataValue: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    cardActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    editButton: {
      padding: 5,
      marginRight: 10,
    },
    deleteButton: {
      padding: 5,
    },
    modal: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: theme.card,
      borderRadius: 20,
      padding: 20,
      width: '90%',
      maxHeight: '80%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
    },
    closeButton: {
      padding: 5,
    },
    formGroup: {
      marginBottom: 15,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.surface,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    halfInput: {
      width: '48%',
    },
    saveButton: {
      backgroundColor: theme.primary,
      borderRadius: 10,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 20,
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      marginVertical: 10,
    },

    // Estilos do Sistema de IA por Voz
    voiceContainer: {
      padding: 20,
      alignItems: 'center',
    },
    voiceInstructionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E3F2FD',
      padding: 15,
      borderRadius: 10,
      marginBottom: 30,
      width: '100%',
    },
    voiceInstructions: {
      flex: 1,
      fontSize: 14,
      color: '#1976D2',
      marginLeft: 10,
      lineHeight: 20,
    },
    microphoneContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
    },
    microphoneButton: {
      width: 120,
      height: 120,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    microphoneTouchable: {
      width: 120,
      height: 120,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    voiceStatusContainer: {
      alignItems: 'center',
      marginBottom: 20,
      height: 40,
      justifyContent: 'center',
    },
    listeningText: {
      fontSize: 18,
      color: '#F44336',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    processingText: {
      fontSize: 18,
      color: '#FF9800',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    readyText: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
    },
    voiceResultsContainer: {
      backgroundColor: '#F5F5F5',
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
      width: '100%',
    },
    voiceResultsTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
    },
    voiceResultsText: {
      fontSize: 16,
      color: theme.text,
      fontStyle: 'italic',
      lineHeight: 22,
    },
    voiceButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 10,
    },
    voicePrimaryButton: {
      backgroundColor: '#9C27B0',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 25,
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginLeft: 10,
      justifyContent: 'center',
    },
    voicePrimaryButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 8,
    },
    voiceSecondaryButton: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme.textSecondary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 25,
      flex: 1,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    voiceSecondaryButtonText: {
      color: theme.textSecondary,
      fontSize: 16,
      fontWeight: 'bold',
    },
    voiceInputContainer: {
      width: '100%',
      marginBottom: 20,
      backgroundColor: '#F8F9FA',
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: '#E0E0E0',
    },
    voiceInputLabel: {
      fontSize: 14,
      color: '#4CAF50',
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    voiceInput: {
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: theme.text,
      borderWidth: 1,
      borderColor: '#DDD',
      minHeight: 50,
      textAlignVertical: 'top',
      marginBottom: 12,
    },
    testButton: {
      backgroundColor: '#4CAF50',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    testButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: 'bold',
      marginLeft: 6,
    },
  });

  const renderDashboard = () => {
    const stats = getEvolutionStats();
    
    if (evolutionData.length < 2) {
      return (
        <View style={styles.emptyContainer}>
          <Icon name="trending-up" size={80} color={theme.textSecondary} />
          <Text style={styles.emptyText}>
            Você precisa de pelo menos 2 registros{'\n'}
            para visualizar o dashboard de evolução!
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.dashboardContainer} showsVerticalScrollIndicator={false}>
        {/* Card Moderno com Gráficos */}
        <View style={styles.modernGraphCard}>
          <View style={styles.modernHeader}>
            <Text style={styles.modernTitle}>📈 {t('analysisProgress').toUpperCase()}</Text>
            <TouchableOpacity onPress={shareEvolutionReport} style={styles.shareButton}>
              <Icon name="share" size={20} color={theme.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.visualSummaryContainer}>
            <Text style={styles.summaryTitle}>{t('visualSummary').toUpperCase()}</Text>
            <View style={styles.metricsRow}>
              <View style={styles.metricItem}>
                <View style={[styles.colorIndicator, { backgroundColor: '#4CAF50' }]} />
                <Text style={styles.metricText}>{stats.positive} {t('positiveEvolutions')}</Text>
              </View>
              <View style={styles.metricItem}>
                <View style={[styles.colorIndicator, { backgroundColor: '#F44336' }]} />
                <Text style={styles.metricText}>{stats.negative} {t('negativeEvolutions')}</Text>
              </View>
              <View style={styles.metricItem}>
                <View style={[styles.colorIndicator, { backgroundColor: '#2196F3' }]} />
                <Text style={styles.metricText}>{((stats.positive / Math.max(stats.total, 1)) * 100).toFixed(0)}% {t('successRate')}</Text>
              </View>
            </View>
            
            <View style={styles.perfectionIndicator}>
              <View style={[
                styles.perfectionBar, 
                { width: `${(stats.positive / Math.max(stats.total, 1)) * 100}%` }
              ]} />
              <Text style={styles.perfectionText}>
                {stats.positive === stats.total && stats.total > 0 ? t('perfect') : 
                 stats.positive > stats.negative ? t('excellentProgress').toUpperCase() : t('goodProgress').toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.distributionSection}>
            <Text style={styles.distributionTitle}>📊 {t('distribution').toUpperCase()}:</Text>
            
            <View style={styles.distributionRow}>
              <Text style={styles.distributionLabel}>{t('improvements')}</Text>
              <View style={styles.dotContainer}>
                {Array.from({ length: 10 }, (_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      { backgroundColor: i < (stats.positive / Math.max(stats.total, 1)) * 10 ? '#4CAF50' : '#E0E0E0' }
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.distributionPercent}>
                {Math.round((stats.positive / Math.max(stats.total, 1)) * 100)}% {t('metrics')}
              </Text>
            </View>
            
            <View style={styles.distributionRow}>
              <Text style={styles.distributionLabel}>{t('regressions')}</Text>
              <View style={styles.dotContainer}>
                {Array.from({ length: 10 }, (_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      { backgroundColor: i < (stats.negative / Math.max(stats.total, 1)) * 10 ? '#F44336' : '#E0E0E0' }
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.distributionPercent}>
                {Math.round((stats.negative / Math.max(stats.total, 1)) * 100)}% {t('metrics')}
              </Text>
            </View>
          </View>

          <View style={styles.timelineSection}>
            <Text style={styles.timelineText}>
              ⏰ {evolutionData.length >= 2 ? 
                `${new Date(evolutionData[0]?.createdAt).toLocaleDateString('pt-BR', { month: 'short', day: '2-digit' })} → ${new Date(evolutionData[evolutionData.length - 1]?.createdAt).toLocaleDateString('pt-BR', { month: 'short', day: '2-digit' })} (${Math.ceil((new Date(evolutionData[evolutionData.length - 1]?.createdAt) - new Date(evolutionData[0]?.createdAt)) / (1000 * 60 * 60 * 24))} dias contínuos)` :
                'Primeiro registro - Inicie sua jornada!'
              }
            </Text>
          </View>
        </View>

        {/* Grid de Evoluções */}
        <View style={styles.evolutionGrid}>
          {stats.evolutions.map((evolution, index) => (
            <View key={index} style={styles.evolutionItem}>
              <View style={styles.evolutionHeader}>
                <Text style={styles.evolutionLabel}>{evolution.label}</Text>
                <View style={[
                  styles.evolutionIcon,
                  evolution.isPositive ? styles.positiveBackground : styles.negativeBackground
                ]}>
                  <Icon
                    name={evolution.isPositive ? 'trending-up' : 'trending-down'}
                    size={16}
                    color={evolution.isPositive ? '#4CAF50' : '#F44336'}
                  />
                </View>
              </View>
              
              <Text style={[
                styles.evolutionValue,
                evolution.isPositive ? styles.positiveColor : styles.negativeColor
              ]}>
                {evolution.current} {evolution.unit}
              </Text>
              
              <View style={styles.evolutionChange}>
                <Icon
                  name={evolution.trend === 'up' ? 'arrow-upward' : 'arrow-downward'}
                  size={12}
                  color={evolution.isPositive ? '#4CAF50' : '#F44336'}
                />
                <Text style={[
                  styles.changeText,
                  evolution.isPositive ? styles.positiveColor : styles.negativeColor
                ]}>
                  {evolution.difference.toFixed(1)} {evolution.unit} ({evolution.percentChange}%)
                </Text>
              </View>
              
              <Text style={styles.previousValue}>
                Anterior: {evolution.previous} {evolution.unit}
              </Text>
            </View>
          ))}
        </View>


      </ScrollView>
    );
  };

  const renderHistory = () => {
    if (evolutionData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Icon name="history" size={80} color={theme.textSecondary} />
          <Text style={styles.emptyText}>
            Nenhum registro de evolução encontrado.{'\n'}
            Toque no botão + para adicionar seu primeiro registro!
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {evolutionData.map((item) => (
          <View key={item.id} style={styles.evolutionCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>
                  {item.firstName} {item.lastName}
                </Text>
                <Text style={styles.cardDate}>{item.date}</Text>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editEntry(item)}
                >
                  <Icon name="edit" size={20} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteEntry(item.id)}
                >
                  <Icon name="delete" size={20} color={theme.error} />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.cardContent}>
              <View style={styles.dataItem}>
                <Text style={styles.dataLabel}>Peso</Text>
                <Text style={styles.dataValue}>{item.weight} kg</Text>
              </View>
              <View style={styles.dataItem}>
                <Text style={styles.dataLabel}>Altura</Text>
                <Text style={styles.dataValue}>{item.height} cm</Text>
              </View>
              {item.chest && (
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>Peito</Text>
                  <Text style={styles.dataValue}>{item.chest} cm</Text>
                </View>
              )}
              {item.waist && (
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>Cintura</Text>
                  <Text style={styles.dataValue}>{item.waist} cm</Text>
                </View>
              )}
              {item.hips && (
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>Quadril</Text>
                  <Text style={styles.dataValue}>{item.hips} cm</Text>
                </View>
              )}
              {item.biceps && (
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>Bíceps</Text>
                  <Text style={styles.dataValue}>{item.biceps} cm</Text>
                </View>
              )}
              {item.thighs && (
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>Coxas</Text>
                  <Text style={styles.dataValue}>{item.thighs} cm</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Evolução SportidiaFit</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: '#FF9800', marginRight: 10 }]}
            onPress={recreateTestData}
          >
            <Icon name="refresh" size={25} color="#FFFFFF" />
          </TouchableOpacity>
          
          {/* Botão de IA por Voz */}
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: '#9C27B0', marginRight: 10 }]}
            onPress={startListening}
          >
            <Icon name="mic" size={25} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="add" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'dashboard' ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'dashboard' ? styles.activeTabText : styles.inactiveTabText,
          ]}>
            {t('dashboard')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'history' ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'history' ? styles.activeTabText : styles.inactiveTabText,
          ]}>
            {t('history')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      {activeTab === 'dashboard' ? renderDashboard() : renderHistory()}

      {/* Modal de Edição */}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Registro</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Icon name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionTitle}>Dados Pessoais</Text>
              <View style={styles.row}>
                <View style={[styles.formGroup, styles.halfInput]}>
                  <Text style={styles.label}>Nome *</Text>
                  <TextInput
                    style={styles.input}
                    value={editFormData.firstName}
                    onChangeText={(text) => setEditFormData({...editFormData, firstName: text})}
                    placeholder="Digite seu nome"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
                <View style={[styles.formGroup, styles.halfInput]}>
                  <Text style={styles.label}>Sobrenome *</Text>
                  <TextInput
                    style={styles.input}
                    value={editFormData.lastName}
                    onChangeText={(text) => setEditFormData({...editFormData, lastName: text})}
                    placeholder="Digite seu sobrenome"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.formGroup, styles.halfInput]}>
                  <Text style={styles.label}>Peso (kg) *</Text>
                  <TextInput
                    style={styles.input}
                    value={editFormData.weight}
                    onChangeText={(text) => setEditFormData({...editFormData, weight: text})}
                    placeholder="Ex: 70.5"
                    keyboardType="numeric"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
                <View style={[styles.formGroup, styles.halfInput]}>
                  <Text style={styles.label}>Altura (cm) *</Text>
                  <TextInput
                    style={styles.input}
                    value={editFormData.height}
                    onChangeText={(text) => setEditFormData({...editFormData, height: text})}
                    placeholder="Ex: 175"
                    keyboardType="numeric"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
              </View>

              <Text style={styles.sectionTitle}>Medidas Corporais (opcional)</Text>
              <View style={styles.row}>
                <View style={[styles.formGroup, styles.halfInput]}>
                  <Text style={styles.label}>Peito (cm)</Text>
                  <TextInput
                    style={styles.input}
                    value={editFormData.chest}
                    onChangeText={(text) => setEditFormData({...editFormData, chest: text})}
                    placeholder="Ex: 100"
                    keyboardType="numeric"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
                <View style={[styles.formGroup, styles.halfInput]}>
                  <Text style={styles.label}>Cintura (cm)</Text>
                  <TextInput
                    style={styles.input}
                    value={editFormData.waist}
                    onChangeText={(text) => setEditFormData({...editFormData, waist: text})}
                    placeholder="Ex: 80"
                    keyboardType="numeric"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.formGroup, styles.halfInput]}>
                  <Text style={styles.label}>Quadril (cm)</Text>
                  <TextInput
                    style={styles.input}
                    value={editFormData.hips}
                    onChangeText={(text) => setEditFormData({...editFormData, hips: text})}
                    placeholder="Ex: 95"
                    keyboardType="numeric"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
                <View style={[styles.formGroup, styles.halfInput]}>
                  <Text style={styles.label}>Bíceps (cm)</Text>
                  <TextInput
                    style={styles.input}
                    value={editFormData.biceps}
                    onChangeText={(text) => setEditFormData({...editFormData, biceps: text})}
                    placeholder="Ex: 35"
                    keyboardType="numeric"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Coxas (cm)</Text>
                <TextInput
                  style={styles.input}
                  value={editFormData.thighs}
                  onChangeText={(text) => setEditFormData({...editFormData, thighs: text})}
                  placeholder="Ex: 60"
                  keyboardType="numeric"
                  placeholderTextColor={theme.textSecondary}
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={saveEditedEntry}>
                <Text style={styles.saveButtonText}>Salvar Alterações</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal de Novo Registro */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novo Registro</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionTitle}>Dados Pessoais</Text>
              <View style={styles.row}>
                <View style={[styles.formGroup, styles.halfInput]}>
                  <Text style={styles.label}>Nome *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.firstName}
                    onChangeText={(text) => setFormData({...formData, firstName: text})}
                    placeholder="Digite seu nome"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
                <View style={[styles.formGroup, styles.halfInput]}>
                  <Text style={styles.label}>Sobrenome *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.lastName}
                    onChangeText={(text) => setFormData({...formData, lastName: text})}
                    placeholder="Digite seu sobrenome"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.formGroup, styles.halfInput]}>
                  <Text style={styles.label}>Peso (kg) *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.weight}
                    onChangeText={(text) => setFormData({...formData, weight: text})}
                    placeholder="Ex: 70.5"
                    keyboardType="numeric"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
                <View style={[styles.formGroup, styles.halfInput]}>
                  <Text style={styles.label}>Altura (cm) *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.height}
                    onChangeText={(text) => setFormData({...formData, height: text})}
                    placeholder="Ex: 175"
                    keyboardType="numeric"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
              </View>

              <Text style={styles.sectionTitle}>Medidas Corporais (opcional)</Text>
              <View style={styles.row}>
                <View style={[styles.formGroup, styles.halfInput]}>
                  <Text style={styles.label}>Peito (cm)</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.chest}
                    onChangeText={(text) => setFormData({...formData, chest: text})}
                    placeholder="Ex: 100"
                    keyboardType="numeric"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
                <View style={[styles.formGroup, styles.halfInput]}>
                  <Text style={styles.label}>Cintura (cm)</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.waist}
                    onChangeText={(text) => setFormData({...formData, waist: text})}
                    placeholder="Ex: 80"
                    keyboardType="numeric"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.formGroup, styles.halfInput]}>
                  <Text style={styles.label}>Quadril (cm)</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.hips}
                    onChangeText={(text) => setFormData({...formData, hips: text})}
                    placeholder="Ex: 95"
                    keyboardType="numeric"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
                <View style={[styles.formGroup, styles.halfInput]}>
                  <Text style={styles.label}>Bíceps (cm)</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.biceps}
                    onChangeText={(text) => setFormData({...formData, biceps: text})}
                    placeholder="Ex: 35"
                    keyboardType="numeric"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Coxas (cm)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.thighs}
                  onChangeText={(text) => setFormData({...formData, thighs: text})}
                  placeholder="Ex: 60"
                  keyboardType="numeric"
                  placeholderTextColor={theme.textSecondary}
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar Registro</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal de IA por Voz */}
      <Modal
        visible={voiceModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          stopListening();
          setVoiceModalVisible(false);
        }}
      >
        <View style={styles.modal}>
          <View style={[styles.modalContent, { maxHeight: '70%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('voiceAI')}</Text>
              <TouchableOpacity
                onPress={() => {
                  stopListening();
                  setVoiceModalVisible(false);
                }}
              >
                <Icon name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.voiceContainer}>
              {/* Instruções */}
              <View style={styles.voiceInstructionsContainer}>
                <Icon name="info" size={24} color="#2196F3" />
                <Text style={styles.voiceInstructions}>
                  {t('voiceInstructions')}
                </Text>
              </View>

              {/* Microfone Animado */}
              <View style={styles.microphoneContainer}>
                <Animated.View 
                  style={[
                    styles.microphoneButton,
                    {
                      transform: [{ scale: microphoneAnimation }],
                      backgroundColor: isListening ? '#F44336' : '#9C27B0'
                    }
                  ]}
                >
                  <TouchableOpacity
                    style={styles.microphoneTouchable}
                    onPress={isListening ? stopListening : startListening}
                  >
                    <Icon 
                      name={isListening ? "stop" : "mic"} 
                      size={40} 
                      color="#FFFFFF" 
                    />
                  </TouchableOpacity>
                </Animated.View>
              </View>

              {/* Status */}
              <View style={styles.voiceStatusContainer}>
                {isListening && (
                  <Text style={styles.listeningText}>
                    🎤 {t('listening')}
                  </Text>
                )}
                {processingVoice && (
                  <Text style={styles.processingText}>
                    🤖 {t('processing')}
                  </Text>
                )}
                {!isListening && !processingVoice && (
                  <Text style={styles.readyText}>
                    📱 {t('startListening')}
                  </Text>
                )}
              </View>

              {/* Input Manual para Teste */}
              <View style={styles.voiceInputContainer}>
                <Text style={styles.voiceInputLabel}>
                  💡 Teste o sistema digitando um comando:
                </Text>
                <TextInput
                  style={styles.voiceInput}
                  placeholder="Ex: peso 75 kg altura 1.80m cintura 85cm"
                  placeholderTextColor={theme.textSecondary}
                  value={voiceResults[0] || ''}
                  onChangeText={(text) => setVoiceResults([text])}
                  multiline
                />
                <TouchableOpacity 
                  style={styles.testButton}
                  onPress={() => {
                    if (voiceResults[0]) {
                      processVoiceCommand(voiceResults[0]);
                    }
                  }}
                >
                  <Icon name="play-arrow" size={20} color="#FFFFFF" />
                  <Text style={styles.testButtonText}>Testar Comando</Text>
                </TouchableOpacity>
              </View>

              {/* Resultados da Voz */}
              {voiceResults.length > 0 && voiceResults[0] && (
                <View style={styles.voiceResultsContainer}>
                  <Text style={styles.voiceResultsTitle}>Comando Atual:</Text>
                  <Text style={styles.voiceResultsText}>
                    "{voiceResults[0]}"
                  </Text>
                </View>
              )}

              {/* Botões de Ação */}
              <View style={styles.voiceButtonsContainer}>
                <TouchableOpacity 
                  style={styles.voiceSecondaryButton}
                  onPress={() => {
                    stopListening();
                    setVoiceModalVisible(false);
                  }}
                >
                  <Text style={styles.voiceSecondaryButtonText}>
                    {t('cancel')}
                  </Text>
                </TouchableOpacity>
                
                {!isListening && (
                  <TouchableOpacity 
                    style={styles.voicePrimaryButton}
                    onPress={startListening}
                  >
                    <Icon name="mic" size={20} color="#FFFFFF" />
                    <Text style={styles.voicePrimaryButtonText}>
                      {t('startListening')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EvolutionScreen;
