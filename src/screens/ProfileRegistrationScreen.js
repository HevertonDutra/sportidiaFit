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
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const ProfileRegistrationScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState({
    // Dados Pessoais
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    
    // Contato
    phone: '',
    whatsapp: '',
    email: '',
    
    // Redes Sociais
    instagram: '',
    facebook: '',
    
    // Perfil Fitness
    fitnessLevel: '',
    goals: [],
    experience: '',
    
    // Foto
    profileImage: null,
  });

  const [errors, setErrors] = useState({});

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

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!profile.firstName.trim()) {
          newErrors.firstName = 'Nome é obrigatório';
        }
        if (!profile.lastName.trim()) {
          newErrors.lastName = 'Sobrenome é obrigatório';
        }
        if (!profile.email.trim()) {
          newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
          newErrors.email = 'Email inválido';
        }
        break;
      case 2:
        if (!profile.phone.trim()) {
          newErrors.phone = 'Telefone é obrigatório';
        }
        break;
      case 3:
        // Redes sociais são opcionais
        break;
      case 4:
        if (!profile.fitnessLevel) {
          newErrors.fitnessLevel = 'Selecione seu nível fitness';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      } else {
        saveProfile();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      Alert.alert('Sucesso', 'Perfil cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Erro', 'Não foi possível salvar o perfil.');
    }
  };

  const selectProfileImage = () => {
    Alert.alert(
      'Foto do Perfil',
      'Escolha uma opção',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Câmera', onPress: () => openCamera() },
        { text: 'Galeria', onPress: () => openGallery() },
      ]
    );
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 400,
      maxHeight: 400,
    };

    launchCamera(options, (response) => {
      if (response.assets && response.assets[0]) {
        setProfile({ ...profile, profileImage: response.assets[0].uri });
      }
    });
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 400,
      maxHeight: 400,
    };

    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets[0]) {
        setProfile({ ...profile, profileImage: response.assets[0].uri });
      }
    });
  };

  const formatPhone = (text) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 11) {
      const formatted = numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      return formatted;
    }
    return text;
  };

  const toggleGoal = (goal) => {
    const goals = profile.goals.includes(goal)
      ? profile.goals.filter(g => g !== goal)
      : [...profile.goals, goal];
    setProfile({ ...profile, goals });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 40,
      paddingBottom: 20,
      backgroundColor: theme.primary,
    },
    headerBackButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.2)',
    },
    headerCenter: {
      flex: 1,
      alignItems: 'center',
    },
    headerSpacer: {
      width: 40,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    headerSubtitle: {
      fontSize: 16,
      color: '#FFFFFF',
      textAlign: 'center',
      marginTop: 5,
      opacity: 0.8,
    },
    progressContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 20,
    },
    progressStep: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: theme.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
    },
    progressStepActive: {
      backgroundColor: theme.primary,
    },
    progressStepCompleted: {
      backgroundColor: theme.success,
    },
    progressStepText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: theme.textSecondary,
    },
    progressStepTextActive: {
      color: '#FFFFFF',
    },
    progressLine: {
      height: 2,
      flex: 1,
      backgroundColor: theme.border,
      marginHorizontal: 5,
    },
    progressLineCompleted: {
      backgroundColor: theme.success,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    stepTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 10,
      textAlign: 'center',
    },
    stepDescription: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      marginBottom: 30,
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
    requiredLabel: {
      color: theme.error,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.surface,
    },
    inputError: {
      borderColor: theme.error,
    },
    errorText: {
      color: theme.error,
      fontSize: 12,
      marginTop: 5,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    halfInput: {
      width: '48%',
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
      marginBottom: 15,
      borderWidth: 3,
      borderColor: theme.primary,
    },
    profileImagePlaceholder: {
      borderStyle: 'dashed',
      borderColor: theme.border,
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    imageButton: {
      backgroundColor: theme.primary,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    imageButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    optionContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 10,
    },
    optionButton: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 8,
      marginRight: 10,
      marginBottom: 10,
      backgroundColor: theme.surface,
    },
    optionButtonSelected: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    optionText: {
      fontSize: 14,
      color: theme.text,
    },
    optionTextSelected: {
      color: '#FFFFFF',
    },
    goalButton: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 15,
      paddingHorizontal: 15,
      paddingVertical: 12,
      marginRight: 10,
      marginBottom: 10,
      backgroundColor: theme.surface,
      minWidth: 80,
      alignItems: 'center',
    },
    goalButtonSelected: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: theme.surface,
    },
    button: {
      flex: 1,
      borderRadius: 12,
      paddingVertical: 15,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    backButton: {
      backgroundColor: theme.textSecondary,
    },
    nextButton: {
      backgroundColor: theme.primary,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  const renderStep1 = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Dados Pessoais</Text>
      <Text style={styles.stepDescription}>
        Vamos começar com suas informações básicas
      </Text>

      <View style={styles.row}>
        <View style={[styles.formGroup, styles.halfInput]}>
          <Text style={styles.label}>
            Nome <Text style={styles.requiredLabel}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, errors.firstName && styles.inputError]}
            value={profile.firstName}
            onChangeText={(text) => setProfile({ ...profile, firstName: text })}
            placeholder="Digite seu nome"
            placeholderTextColor={theme.textSecondary}
          />
          {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
        </View>

        <View style={[styles.formGroup, styles.halfInput]}>
          <Text style={styles.label}>
            Sobrenome <Text style={styles.requiredLabel}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, errors.lastName && styles.inputError]}
            value={profile.lastName}
            onChangeText={(text) => setProfile({ ...profile, lastName: text })}
            placeholder="Digite seu sobrenome"
            placeholderTextColor={theme.textSecondary}
          />
          {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>
          Email <Text style={styles.requiredLabel}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          value={profile.email}
          onChangeText={(text) => setProfile({ ...profile, email: text })}
          placeholder="exemplo@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={theme.textSecondary}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput
          style={styles.input}
          value={profile.birthDate}
          onChangeText={(text) => setProfile({ ...profile, birthDate: text })}
          placeholder="DD/MM/AAAA"
          placeholderTextColor={theme.textSecondary}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Gênero</Text>
        <View style={styles.optionContainer}>
          {['Masculino', 'Feminino', 'Outro', 'Prefiro não dizer'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                profile.gender === option && styles.optionButtonSelected,
              ]}
              onPress={() => setProfile({ ...profile, gender: option })}
            >
              <Text
                style={[
                  styles.optionText,
                  profile.gender === option && styles.optionTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderStep2 = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Informações de Contato</Text>
      <Text style={styles.stepDescription}>
        Como podemos entrar em contato com você?
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>
          Telefone <Text style={styles.requiredLabel}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.phone && styles.inputError]}
          value={profile.phone}
          onChangeText={(text) => setProfile({ ...profile, phone: formatPhone(text) })}
          placeholder="(11) 99999-9999"
          keyboardType="phone-pad"
          placeholderTextColor={theme.textSecondary}
          maxLength={15}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>WhatsApp</Text>
        <TextInput
          style={styles.input}
          value={profile.whatsapp}
          onChangeText={(text) => setProfile({ ...profile, whatsapp: formatPhone(text) })}
          placeholder="(11) 99999-9999"
          keyboardType="phone-pad"
          placeholderTextColor={theme.textSecondary}
          maxLength={15}
        />
      </View>
    </ScrollView>
  );

  const renderStep3 = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Redes Sociais</Text>
      <Text style={styles.stepDescription}>
        Conecte suas redes sociais (opcional)
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Instagram</Text>
        <TextInput
          style={styles.input}
          value={profile.instagram}
          onChangeText={(text) => {
            const username = text.replace('@', '');
            setProfile({ ...profile, instagram: username ? `@${username}` : '' });
          }}
          placeholder="@seuusuario"
          autoCapitalize="none"
          placeholderTextColor={theme.textSecondary}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Facebook</Text>
        <TextInput
          style={styles.input}
          value={profile.facebook}
          onChangeText={(text) => setProfile({ ...profile, facebook: text })}
          placeholder="Seu nome no Facebook"
          placeholderTextColor={theme.textSecondary}
        />
      </View>
    </ScrollView>
  );

  const renderStep4 = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Perfil Fitness</Text>
      <Text style={styles.stepDescription}>
        Conte-nos sobre sua jornada fitness
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>
          Nível de Condicionamento <Text style={styles.requiredLabel}>*</Text>
        </Text>
        <View style={styles.optionContainer}>
          {['Iniciante', 'Intermediário', 'Avançado', 'Atleta'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.optionButton,
                profile.fitnessLevel === level && styles.optionButtonSelected,
              ]}
              onPress={() => setProfile({ ...profile, fitnessLevel: level })}
            >
              <Text
                style={[
                  styles.optionText,
                  profile.fitnessLevel === level && styles.optionTextSelected,
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.fitnessLevel && <Text style={styles.errorText}>{errors.fitnessLevel}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Objetivos (selecione quantos quiser)</Text>
        <View style={styles.optionContainer}>
          {[
            'Perda de Peso',
            'Ganho de Massa',
            'Definição',
            'Resistência',
            'Flexibilidade',
            'Saúde Geral',
          ].map((goal) => (
            <TouchableOpacity
              key={goal}
              style={[
                styles.goalButton,
                profile.goals.includes(goal) && styles.goalButtonSelected,
              ]}
              onPress={() => toggleGoal(goal)}
            >
              <Text
                style={[
                  styles.optionText,
                  profile.goals.includes(goal) && styles.optionTextSelected,
                ]}
              >
                {goal}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Experiência com Exercícios</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={profile.experience}
          onChangeText={(text) => setProfile({ ...profile, experience: text })}
          placeholder="Conte-nos sobre sua experiência com exercícios..."
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          placeholderTextColor={theme.textSecondary}
        />
      </View>
    </ScrollView>
  );

  const renderStep5 = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Foto do Perfil</Text>
      <Text style={styles.stepDescription}>
        Adicione uma foto para personalizar seu perfil
      </Text>

      <View style={styles.profileImageContainer}>
        {profile.profileImage ? (
          <Image source={{ uri: profile.profileImage }} style={styles.image} />
        ) : (
          <View style={[styles.profileImage, styles.profileImagePlaceholder]}>
            <Icon name="person" size={50} color={theme.textSecondary} />
          </View>
        )}
        <TouchableOpacity style={styles.imageButton} onPress={selectProfileImage}>
          <Text style={styles.imageButtonText}>
            {profile.profileImage ? 'Alterar Foto' : 'Adicionar Foto'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.stepTitle}>Resumo do Perfil</Text>
        <View style={{ backgroundColor: theme.surface, padding: 15, borderRadius: 10 }}>
          <Text style={[styles.label, { marginBottom: 5 }]}>
            {profile.firstName} {profile.lastName}
          </Text>
          <Text style={styles.errorText}>{profile.email}</Text>
          {profile.fitnessLevel && (
            <Text style={styles.errorText}>Nível: {profile.fitnessLevel}</Text>
          )}
          {profile.goals.length > 0 && (
            <Text style={styles.errorText}>
              Objetivos: {profile.goals.join(', ')}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );

  const renderProgress = () => {
    const steps = [1, 2, 3, 4, 5];
    return (
      <View style={styles.progressContainer}>
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <View
              style={[
                styles.progressStep,
                step === currentStep && styles.progressStepActive,
                step < currentStep && styles.progressStepCompleted,
              ]}
            >
              <Text
                style={[
                  styles.progressStepText,
                  (step === currentStep || step < currentStep) &&
                    styles.progressStepTextActive,
                ]}
              >
                {step}
              </Text>
            </View>
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.progressLine,
                  step < currentStep && styles.progressLineCompleted,
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Cadastro de Perfil</Text>
          <Text style={styles.headerSubtitle}>
            Etapa {currentStep} de 5
          </Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {renderProgress()}

      {renderCurrentStep()}

      <View style={styles.buttonContainer}>
        {currentStep > 1 && (
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={prevStep}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.nextButton, currentStep === 1 && { flex: 1 }]}
          onPress={nextStep}
        >
          <Text style={styles.buttonText}>
            {currentStep === 5 ? 'Finalizar' : 'Próximo'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileRegistrationScreen;