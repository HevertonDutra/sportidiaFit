import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules, Platform } from 'react-native';

const LanguageContext = createContext();

const translations = {
  'pt-BR': {
    // Navegação
    home: 'Início',
    evolution: 'Evolução',
    diet: 'Dieta',
    profile: 'Perfil',
    comments: 'Comentários',
    workout: 'Treinos',
    
    // Tela Inicial
    welcome: 'Bem-vindo à sua jornada fitness!',
    welcomeSubtext: 'Acompanhe sua evolução, gerencie sua galeria e conecte-se com a comunidade.',
    
    // Botões gerais
    save: 'Salvar',
    cancel: 'Cancelar',
    delete: 'Excluir',
    edit: 'Editar',
    back: 'Voltar',
    create: 'Criar',
    calculate: 'Calcular',
    clear: 'Limpar',
    
    // Treinos
    workouts: 'Treinos',
    newWorkout: 'Novo Treino',
    workoutName: 'Nome do Treino',
    equipmentName: 'Nome do Aparelho',
    workoutDescription: 'Descrição do Treino',
    selectVideo: 'Selecionar Vídeo',
    
    // Dieta
    dishes: 'Meus Pratos',
    newDish: 'Novo Prato',
    dishName: 'Nome do Prato',
    ingredients: 'Lista de Ingredientes',
    calories: 'Calorias',
    calculateBMI: 'Calcular IMC',
    
    // IMC
    bmiCalculator: 'Calculadora IMC',
    weight: 'Peso',
    height: 'Altura',
    bmiResult: 'Seu IMC',
    
    // Perfil
    createProfile: 'Criar Perfil',
    settings: 'Configurações',
    language: 'Idioma',
    fullName: 'Nome Completo',
    name: 'Nome',
    email: 'E-mail',
    enterFullName: 'Digite seu nome completo',
    emailPlaceholder: 'exemplo@email.com',
    instagramPlaceholder: '@seuusuario',
    saveProfile: 'Salvar Perfil',
    changePhoto: 'Alterar Foto',
    addPhoto: 'Adicionar Foto',
    notInformed: 'Não informado',
    profileNotCreated: 'Seu perfil ainda não foi criado.',
    tapCreateProfile: 'Toque em "Criar Perfil" para começar!',
    error: 'Erro',
    success: 'Sucesso',
    nameRequired: 'O nome é obrigatório.',
    profileSaved: 'Perfil salvo com sucesso!',
    profileSaveError: 'Não foi possível salvar o perfil.',
    
    // Configurações
    appearance: 'Aparência',
    theme: 'Tema',
    dark: 'Escuro',
    light: 'Claro',
    about: 'Sobre',
    version: 'Versão',
    selectLanguage: 'Selecionar Idioma',
    current: 'Atual',
    languageChangeInfo: 'As alterações de idioma são aplicadas imediatamente em todo o aplicativo.',
    
    // Categorias IMC
    underweight: 'Abaixo do peso',
    normalWeight: 'Peso normal',
    overweight: 'Sobrepeso',
    obesityGrade1: 'Obesidade grau I',
    obesityGrade2: 'Obesidade grau II',
    obesityGrade3: 'Obesidade grau III',
    
    // Evolução Dashboard
    evolutionDashboard: 'Dashboard de Evolução',
    analysisProgress: 'Análise de Progresso',
    visualSummary: 'Resumo Visual',
    positiveEvolutions: 'Evoluções Positivas',
    negativeEvolutions: 'Evoluções Negativas',
    successRate: 'Taxa de Sucesso',
    perfect: 'PERFEITO!',
    distribution: 'DISTRIBUIÇÃO',
    improvements: 'Progresso',
    regressions: 'Regressões',
    metrics: 'das métricas',
    continuousDays: 'dias contínuos',
    dashboard: 'Dashboard',
    history: 'Histórico',
    
    // Medidas corporais
    bodyMeasures: 'Medidas Corporais',
    weight: 'Peso',
    chest: 'Peito',
    waist: 'Cintura',
    hips: 'Quadril',
    biceps: 'Bíceps',
    thighs: 'Coxas',
    
    // Mensagens
    requiredFieldsError: 'Por favor, preencha os campos obrigatórios (Nome, Sobrenome, Peso e Altura).',
    evolutionSaved: 'Dados de evolução salvos com sucesso!',
    recordUpdated: 'Registro atualizado com sucesso!',
    testRecordsCreated: '10 novos registros de teste foram criados!',
    deleteRecord: 'Excluir Registro',
    deleteRecordConfirm: 'Tem certeza que deseja excluir este registro?',
    minRecordsShare: 'Você precisa de pelo menos 2 registros para compartilhar sua evolução.',
    shareError: 'Falha ao compartilhar relatório de evolução.',
    clearAllData: 'Limpar Todos os Dados',
    clearAllConfirm: 'Tem certeza que deseja limpar todos os dados de evolução? Esta ação não pode ser desfeita.',
    
    // Relatório de compartilhamento
    evolutionReport: 'Relatório de Evolução - SportidiaFit',
    period: 'Período',
    comparison: 'Comparação',
    status: 'Status',
    excellentProgress: 'Excelente Progresso',
    goodProgress: 'Bom Progresso',
    needsImprovement: 'Precisa Melhorar',
    from: 'de',
    to: 'até',
    days: 'dias',
    weeks: 'semanas',
    
    // Sistema de IA com Voz
    voiceAI: 'IA por Voz',
    voiceHelp: 'Ajuda por Voz',
    startListening: 'Começar Gravação',
    stopListening: 'Parar Gravação',
    listening: 'Ouvindo...',
    processing: 'Processando...',
    voiceInstructions: 'Diga seus dados. Ex: "Peso 75 quilos, altura 1 metro e 80"',
    voiceError: 'Erro de Voz',
    voiceErrorMessage: 'Erro ao reconhecer sua voz. Tente novamente.',
    voiceSuccess: 'Sucesso!',
    voiceDataExtracted: 'Dados extraídos com sucesso da sua fala!',
    voiceNoData: 'Nenhum Dado',
    voiceNoDataMessage: 'Não consegui identificar dados na sua fala. Tente ser mais específico.',
    voiceProcessingError: 'Erro ao processar comando de voz.',
    micPermissionTitle: 'Permissão do Microfone',
    micPermissionMessage: 'Este app precisa acessar o microfone para reconhecimento de voz.',
    permissionDenied: 'Permissão Negada',
    micPermissionRequired: 'Permissão do microfone é necessária para usar comandos de voz.',
    askLater: 'Perguntar Depois',
    ok: 'OK',
    tryAgain: 'Tentar Novamente',
  },
  
  'en': {
    // Navigation
    home: 'Home',
    evolution: 'Evolution',
    diet: 'Diet',
    profile: 'Profile',
    comments: 'Comments',
    workout: 'Workouts',
    
    // Home Screen
    welcome: 'Welcome to your fitness journey!',
    welcomeSubtext: 'Track your evolution, manage your gallery and connect with the community.',
    
    // General buttons
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    create: 'Create',
    calculate: 'Calculate',
    clear: 'Clear',
    
    // Workouts
    workouts: 'Workouts',
    newWorkout: 'New Workout',
    workoutName: 'Workout Name',
    equipmentName: 'Equipment Name',
    workoutDescription: 'Workout Description',
    selectVideo: 'Select Video',
    
    // Diet
    dishes: 'My Dishes',
    newDish: 'New Dish',
    dishName: 'Dish Name',
    ingredients: 'Ingredients List',
    calories: 'Calories',
    calculateBMI: 'Calculate BMI',
    
    // BMI
    bmiCalculator: 'BMI Calculator',
    weight: 'Weight',
    height: 'Height',
    bmiResult: 'Your BMI',
    
    // Profile
    createProfile: 'Create Profile',
    settings: 'Settings',
    language: 'Language',
    fullName: 'Full Name',
    name: 'Name',
    email: 'Email',
    enterFullName: 'Enter your full name',
    emailPlaceholder: 'example@email.com',
    instagramPlaceholder: '@yourusername',
    saveProfile: 'Save Profile',
    changePhoto: 'Change Photo',
    addPhoto: 'Add Photo',
    notInformed: 'Not informed',
    profileNotCreated: 'Your profile has not been created yet.',
    tapCreateProfile: 'Tap "Create Profile" to get started!',
    error: 'Error',
    success: 'Success',
    nameRequired: 'Name is required.',
    profileSaved: 'Profile saved successfully!',
    profileSaveError: 'Could not save profile.',
    
    // Settings
    appearance: 'Appearance',
    theme: 'Theme',
    dark: 'Dark',
    light: 'Light',
    about: 'About',
    version: 'Version',
    selectLanguage: 'Select Language',
    current: 'Current',
    languageChangeInfo: 'Language changes are applied immediately throughout the app.',
    
    // BMI Categories
    underweight: 'Underweight',
    normalWeight: 'Normal weight',
    overweight: 'Overweight',
    obesityGrade1: 'Obesity grade I',
    obesityGrade2: 'Obesity grade II',
    obesityGrade3: 'Obesity grade III',
    
    // Evolution Dashboard
    evolutionDashboard: 'Evolution Dashboard',
    analysisProgress: 'Progress Analysis',
    visualSummary: 'Visual Summary',
    positiveEvolutions: 'Positive Evolutions',
    negativeEvolutions: 'Negative Evolutions',
    successRate: 'Success Rate',
    perfect: 'PERFECT!',
    distribution: 'DISTRIBUTION',
    improvements: 'Progress',
    regressions: 'Regressions',
    metrics: 'of metrics',
    continuousDays: 'continuous days',
    dashboard: 'Dashboard',
    history: 'History',
    
    // Body measures
    bodyMeasures: 'Body Measures',
    weight: 'Weight',
    chest: 'Chest',
    waist: 'Waist',
    hips: 'Hips',
    biceps: 'Biceps',
    thighs: 'Thighs',
    
    // Messages
    requiredFieldsError: 'Please fill in the required fields (First Name, Last Name, Weight and Height).',
    evolutionSaved: 'Evolution data saved successfully!',
    recordUpdated: 'Record updated successfully!',
    testRecordsCreated: '10 new test records were created!',
    deleteRecord: 'Delete Record',
    deleteRecordConfirm: 'Are you sure you want to delete this record?',
    minRecordsShare: 'You need at least 2 records to share your evolution.',
    shareError: 'Failed to share evolution report.',
    clearAllData: 'Clear All Data',
    clearAllConfirm: 'Are you sure you want to clear all evolution data? This action cannot be undone.',
    
    // Share report
    evolutionReport: 'Evolution Report - SportidiaFit',
    period: 'Period',
    comparison: 'Comparison',
    status: 'Status',
    excellentProgress: 'Excellent Progress',
    goodProgress: 'Good Progress',
    needsImprovement: 'Needs Improvement',
    from: 'from',
    to: 'to',
    days: 'days',
    weeks: 'weeks',
    
    // Voice AI System
    voiceAI: 'Voice AI',
    voiceHelp: 'Voice Help',
    startListening: 'Start Recording',
    stopListening: 'Stop Recording',
    listening: 'Listening...',
    processing: 'Processing...',
    voiceInstructions: 'Say your data. Ex: "Weight 165 pounds, height 5 feet 11"',
    voiceError: 'Voice Error',
    voiceErrorMessage: 'Error recognizing your voice. Please try again.',
    voiceSuccess: 'Success!',
    voiceDataExtracted: 'Data successfully extracted from your speech!',
    voiceNoData: 'No Data',
    voiceNoDataMessage: 'Could not identify data in your speech. Try being more specific.',
    voiceProcessingError: 'Error processing voice command.',
    micPermissionTitle: 'Microphone Permission',
    micPermissionMessage: 'This app needs microphone access for voice recognition.',
    permissionDenied: 'Permission Denied',
    micPermissionRequired: 'Microphone permission is required to use voice commands.',
    askLater: 'Ask Later',
    ok: 'OK',
    tryAgain: 'Try Again',
  },
  
  'es': {
    // Navegación
    home: 'Inicio',
    evolution: 'Evolución',
    diet: 'Dieta',
    profile: 'Perfil',
    comments: 'Comentarios',
    workout: 'Entrenamientos',
    
    // Pantalla Principal
    welcome: '¡Bienvenido a tu jornada fitness!',
    welcomeSubtext: 'Sigue tu evolución, gestiona tu galería y conéctate con la comunidad.',
    
    // Botones generales
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    back: 'Volver',
    create: 'Crear',
    calculate: 'Calcular',
    clear: 'Limpiar',
    
    // Entrenamientos
    workouts: 'Entrenamientos',
    newWorkout: 'Nuevo Entrenamiento',
    workoutName: 'Nombre del Entrenamiento',
    equipmentName: 'Nombre del Equipo',
    workoutDescription: 'Descripción del Entrenamiento',
    selectVideo: 'Seleccionar Video',
    
    // Dieta
    dishes: 'Mis Platos',
    newDish: 'Nuevo Plato',
    dishName: 'Nombre del Plato',
    ingredients: 'Lista de Ingredientes',
    calories: 'Calorías',
    calculateBMI: 'Calcular IMC',
    
    // IMC
    bmiCalculator: 'Calculadora IMC',
    weight: 'Peso',
    height: 'Altura',
    bmiResult: 'Tu IMC',
    
    // Perfil
    createProfile: 'Crear Perfil',
    settings: 'Configuración',
    language: 'Idioma',
    fullName: 'Nombre Completo',
    name: 'Nombre',
    email: 'Email',
    enterFullName: 'Ingresa tu nombre completo',
    emailPlaceholder: 'ejemplo@email.com',
    instagramPlaceholder: '@tuusuario',
    saveProfile: 'Guardar Perfil',
    changePhoto: 'Cambiar Foto',
    addPhoto: 'Agregar Foto',
    notInformed: 'No informado',
    profileNotCreated: 'Tu perfil aún no ha sido creado.',
    tapCreateProfile: '¡Toca "Crear Perfil" para comenzar!',
    error: 'Error',
    success: 'Éxito',
    nameRequired: 'El nombre es obligatorio.',
    profileSaved: '¡Perfil guardado exitosamente!',
    profileSaveError: 'No se pudo guardar el perfil.',
    
    // Configuración
    appearance: 'Apariencia',
    theme: 'Tema',
    dark: 'Oscuro',
    light: 'Claro',
    about: 'Acerca de',
    version: 'Versión',
    selectLanguage: 'Seleccionar Idioma',
    current: 'Actual',
    languageChangeInfo: 'Los cambios de idioma se aplican inmediatamente en toda la aplicación.',
    
    // Categorías IMC
    underweight: 'Bajo peso',
    normalWeight: 'Peso normal',
    overweight: 'Sobrepeso',
    obesityGrade1: 'Obesidad grado I',
    obesityGrade2: 'Obesidad grado II',
    obesityGrade3: 'Obesidad grado III',
    
    // Dashboard de Evolución
    evolutionDashboard: 'Dashboard de Evolución',
    analysisProgress: 'Análisis de Progreso',
    visualSummary: 'Resumen Visual',
    positiveEvolutions: 'Evoluciones Positivas',
    negativeEvolutions: 'Evoluciones Negativas',
    successRate: 'Tasa de Éxito',
    perfect: '¡PERFECTO!',
    distribution: 'DISTRIBUCIÓN',
    improvements: 'Progreso',
    regressions: 'Regresiones',
    metrics: 'de las métricas',
    continuousDays: 'días continuos',
    dashboard: 'Dashboard',
    history: 'Historial',
    
    // Medidas corporales
    bodyMeasures: 'Medidas Corporales',
    weight: 'Peso',
    chest: 'Pecho',
    waist: 'Cintura',
    hips: 'Cadera',
    biceps: 'Bíceps',
    thighs: 'Muslos',
    
    // Mensajes
    requiredFieldsError: 'Por favor, complete los campos obligatorios (Nombre, Apellido, Peso y Altura).',
    evolutionSaved: '¡Datos de evolución guardados exitosamente!',
    recordUpdated: '¡Registro actualizado exitosamente!',
    testRecordsCreated: '¡Se crearon 10 nuevos registros de prueba!',
    deleteRecord: 'Eliminar Registro',
    deleteRecordConfirm: '¿Está seguro de que desea eliminar este registro?',
    minRecordsShare: 'Necesita al menos 2 registros para compartir su evolución.',
    shareError: 'Error al compartir el informe de evolución.',
    clearAllData: 'Limpiar Todos los Datos',
    clearAllConfirm: '¿Está seguro de que desea limpiar todos los datos de evolución? Esta acción no se puede deshacer.',
    
    // Informe para compartir
    evolutionReport: 'Informe de Evolución - SportidiaFit',
    period: 'Período',
    comparison: 'Comparación',
    status: 'Estado',
    excellentProgress: 'Progreso Excelente',
    goodProgress: 'Buen Progreso',
    needsImprovement: 'Necesita Mejora',
    from: 'desde',
    to: 'hasta',
    days: 'días',
    weeks: 'semanas',
    
    // Sistema de IA por Voz
    voiceAI: 'IA por Voz',
    voiceHelp: 'Ayuda por Voz',
    startListening: 'Comenzar Grabación',
    stopListening: 'Detener Grabación',
    listening: 'Escuchando...',
    processing: 'Procesando...',
    voiceInstructions: 'Diga sus datos. Ej: "Peso 75 kilos, altura 1 metro 80"',
    voiceError: 'Error de Voz',
    voiceErrorMessage: 'Error al reconocer su voz. Inténtelo de nuevo.',
    voiceSuccess: '¡Éxito!',
    voiceDataExtracted: '¡Datos extraídos exitosamente de su habla!',
    voiceNoData: 'Sin Datos',
    voiceNoDataMessage: 'No pude identificar datos en su habla. Trate de ser más específico.',
    voiceProcessingError: 'Error al procesar comando de voz.',
    micPermissionTitle: 'Permiso del Micrófono',
    micPermissionMessage: 'Esta app necesita acceso al micrófono para reconocimiento de voz.',
    permissionDenied: 'Permiso Denegado',
    micPermissionRequired: 'El permiso del micrófono es necesario para usar comandos de voz.',
    askLater: 'Preguntar Después',
    ok: 'OK',
    tryAgain: 'Intentar de Nuevo',
  },
  
  'zh': {
    // 导航
    home: '首页',
    evolution: '进展',
    diet: '饮食',
    profile: '个人资料',
    comments: '评论',
    workout: '锻炼',
    
    // 主屏幕
    welcome: '欢迎开始您的健身之旅！',
    welcomeSubtext: '跟踪您的进展，管理您的图库并与社区联系。',
    
    // 通用按钮
    save: '保存',
    cancel: '取消',
    delete: '删除',
    edit: '编辑',
    back: '返回',
    create: '创建',
    calculate: '计算',
    clear: '清除',
    
    // 锻炼
    workouts: '锻炼',
    newWorkout: '新锻炼',
    workoutName: '锻炼名称',
    equipmentName: '设备名称',
    workoutDescription: '锻炼描述',
    selectVideo: '选择视频',
    
    // 饮食
    dishes: '我的菜肴',
    newDish: '新菜肴',
    dishName: '菜肴名称',
    ingredients: '成分列表',
    calories: '卡路里',
    calculateBMI: '计算BMI',
    
    // BMI
    bmiCalculator: 'BMI计算器',
    weight: '体重',
    height: '身高',
    bmiResult: '您的BMI',
    
    // 个人资料
    createProfile: '创建个人资料',
    settings: '设置',
    language: '语言',
    fullName: '全名',
    name: '姓名',
    email: '电子邮件',
    enterFullName: '输入您的全名',
    emailPlaceholder: '示例@邮箱.com',
    instagramPlaceholder: '@您的用户名',
    saveProfile: '保存个人资料',
    changePhoto: '更换照片',
    addPhoto: '添加照片',
    notInformed: '未填写',
    profileNotCreated: '您的个人资料尚未创建。',
    tapCreateProfile: '点击"创建个人资料"开始！',
    error: '错误',
    success: '成功',
    nameRequired: '姓名是必填项。',
    profileSaved: '个人资料保存成功！',
    profileSaveError: '无法保存个人资料。',
    
    // 设置
    appearance: '外观',
    theme: '主题',
    dark: '深色',
    light: '浅色',
    about: '关于',
    version: '版本',
    selectLanguage: '选择语言',
    current: '当前',
    languageChangeInfo: '语言更改会立即应用到整个应用程序。',
    
    // BMI分类
    underweight: '体重不足',
    normalWeight: '正常体重',
    overweight: '超重',
    obesityGrade1: 'I度肥胖',
    obesityGrade2: 'II度肥胖',
    obesityGrade3: 'III度肥胖',
    
    // 进展仪表板
    evolutionDashboard: '进展仪表板',
    analysisProgress: '进度分析',
    visualSummary: '可视化摘要',
    positiveEvolutions: '积极进展',
    negativeEvolutions: '消极进展',
    successRate: '成功率',
    perfect: '完美！',
    distribution: '分布',
    improvements: '进步',
    regressions: '退步',
    metrics: '指标',
    continuousDays: '连续天数',
    dashboard: '仪表板',
    history: '历史',
    
    // 身体测量
    bodyMeasures: '身体测量',
    weight: '体重',
    chest: '胸围',
    waist: '腰围',
    hips: '臀围',
    biceps: '二头肌',
    thighs: '大腿',
    
    // 消息
    requiredFieldsError: '请填写必填字段（姓名、姓氏、体重和身高）。',
    evolutionSaved: '进展数据保存成功！',
    recordUpdated: '记录更新成功！',
    testRecordsCreated: '创建了10条新的测试记录！',
    deleteRecord: '删除记录',
    deleteRecordConfirm: '您确定要删除此记录吗？',
    minRecordsShare: '您需要至少2条记录才能分享您的进展。',
    shareError: '分享进展报告失败。',
    clearAllData: '清除所有数据',
    clearAllConfirm: '您确定要清除所有进展数据吗？此操作无法撤消。',
    
    // 分享报告
    evolutionReport: '进展报告 - SportidiaFit',
    period: '期间',
    comparison: '比较',
    status: '状态',
    excellentProgress: '优秀进步',
    goodProgress: '良好进步',
    needsImprovement: '需要改进',
    from: '从',
    to: '到',
    days: '天',
    weeks: '周',
    
    // 语音AI系统
    voiceAI: '语音AI',
    voiceHelp: '语音帮助',
    startListening: '开始录音',
    stopListening: '停止录音',
    listening: '正在听取...',
    processing: '处理中...',
    voiceInstructions: '说出您的数据。例如："体重75公斤，身高1米80"',
    voiceError: '语音错误',
    voiceErrorMessage: '识别您的语音时出错。请重试。',
    voiceSuccess: '成功！',
    voiceDataExtracted: '成功从您的语音中提取数据！',
    voiceNoData: '无数据',
    voiceNoDataMessage: '无法识别您语音中的数据。请更具体一些。',
    voiceProcessingError: '处理语音命令时出错。',
    micPermissionTitle: '麦克风权限',
    micPermissionMessage: '此应用需要访问麦克风进行语音识别。',
    permissionDenied: '权限被拒绝',
    micPermissionRequired: '需要麦克风权限才能使用语音命令。',
    askLater: '稍后询问',
    ok: '确定',
    tryAgain: '重试',
  },
  
  'fr': {
    // Navigation
    home: 'Accueil',
    evolution: 'Évolution',
    diet: 'Régime',
    profile: 'Profil',
    comments: 'Commentaires',
    workout: 'Entraînements',
    
    // Écran d'accueil
    welcome: 'Bienvenue dans votre parcours fitness !',
    welcomeSubtext: 'Suivez votre évolution, gérez votre galerie et connectez-vous avec la communauté.',
    
    // Boutons généraux
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    back: 'Retour',
    create: 'Créer',
    calculate: 'Calculer',
    clear: 'Effacer',
    
    // Entraînements
    workouts: 'Entraînements',
    newWorkout: 'Nouvel Entraînement',
    workoutName: 'Nom de l\'Entraînement',
    equipmentName: 'Nom de l\'Équipement',
    workoutDescription: 'Description de l\'Entraînement',
    selectVideo: 'Sélectionner Vidéo',
    
    // Régime
    dishes: 'Mes Plats',
    newDish: 'Nouveau Plat',
    dishName: 'Nom du Plat',
    ingredients: 'Liste des Ingrédients',
    calories: 'Calories',
    calculateBMI: 'Calculer IMC',
    
    // IMC
    bmiCalculator: 'Calculateur IMC',
    weight: 'Poids',
    height: 'Taille',
    bmiResult: 'Votre IMC',
    
    // Profil
    createProfile: 'Créer Profil',
    settings: 'Paramètres',
    language: 'Langue',
    fullName: 'Nom Complet',
    name: 'Nom',
    email: 'Email',
    enterFullName: 'Entrez votre nom complet',
    emailPlaceholder: 'exemple@email.com',
    instagramPlaceholder: '@votrenom',
    saveProfile: 'Enregistrer Profil',
    changePhoto: 'Changer Photo',
    addPhoto: 'Ajouter Photo',
    notInformed: 'Non renseigné',
    profileNotCreated: 'Votre profil n\'a pas encore été créé.',
    tapCreateProfile: 'Appuyez sur "Créer Profil" pour commencer !',
    error: 'Erreur',
    success: 'Succès',
    nameRequired: 'Le nom est obligatoire.',
    profileSaved: 'Profil enregistré avec succès !',
    profileSaveError: 'Impossible d\'enregistrer le profil.',
    
    // Paramètres
    appearance: 'Apparence',
    theme: 'Thème',
    dark: 'Sombre',
    light: 'Clair',
    about: 'À propos',
    version: 'Version',
    selectLanguage: 'Sélectionner Langue',
    current: 'Actuel',
    languageChangeInfo: 'Les changements de langue sont appliqués immédiatement dans toute l\'application.',
    
    // Catégories IMC
    underweight: 'Insuffisance pondérale',
    normalWeight: 'Poids normal',
    overweight: 'Surpoids',
    obesityGrade1: 'Obésité grade I',
    obesityGrade2: 'Obésité grade II',
    obesityGrade3: 'Obésité grade III',
    
    // Tableau de Bord Évolution
    evolutionDashboard: 'Tableau de Bord Évolution',
    analysisProgress: 'Analyse des Progrès',
    visualSummary: 'Résumé Visuel',
    positiveEvolutions: 'Évolutions Positives',
    negativeEvolutions: 'Évolutions Négatives',
    successRate: 'Taux de Succès',
    perfect: 'PARFAIT!',
    distribution: 'DISTRIBUTION',
    improvements: 'Progrès',
    regressions: 'Régressions',
    metrics: 'des métriques',
    continuousDays: 'jours continus',
    dashboard: 'Tableau de Bord',
    history: 'Historique',
    
    // Mesures corporelles
    bodyMeasures: 'Mesures Corporelles',
    weight: 'Poids',
    chest: 'Poitrine',
    waist: 'Taille',
    hips: 'Hanches',
    biceps: 'Biceps',
    thighs: 'Cuisses',
    
    // Messages
    requiredFieldsError: 'Veuillez remplir les champs obligatoires (Prénom, Nom, Poids et Taille).',
    evolutionSaved: 'Données d\'évolution sauvegardées avec succès!',
    recordUpdated: 'Enregistrement mis à jour avec succès!',
    testRecordsCreated: '10 nouveaux enregistrements de test ont été créés!',
    deleteRecord: 'Supprimer l\'Enregistrement',
    deleteRecordConfirm: 'Êtes-vous sûr de vouloir supprimer cet enregistrement?',
    minRecordsShare: 'Vous avez besoin d\'au moins 2 enregistrements pour partager votre évolution.',
    shareError: 'Échec du partage du rapport d\'évolution.',
    clearAllData: 'Effacer Toutes les Données',
    clearAllConfirm: 'Êtes-vous sûr de vouloir effacer toutes les données d\'évolution? Cette action ne peut pas être annulée.',
    
    // Rapport de partage
    evolutionReport: 'Rapport d\'Évolution - SportidiaFit',
    period: 'Période',
    comparison: 'Comparaison',
    status: 'Statut',
    excellentProgress: 'Progrès Excellent',
    goodProgress: 'Bon Progrès',
    needsImprovement: 'Nécessite Amélioration',
    from: 'de',
    to: 'à',
    days: 'jours',
    weeks: 'semaines',
    
    // Système d'IA Vocale
    voiceAI: 'IA Vocale',
    voiceHelp: 'Aide Vocale',
    startListening: 'Commencer l\'Enregistrement',
    stopListening: 'Arrêter l\'Enregistrement',
    listening: 'Écoute...',
    processing: 'Traitement...',
    voiceInstructions: 'Dites vos données. Ex: "Poids 75 kilos, taille 1 mètre 80"',
    voiceError: 'Erreur Vocale',
    voiceErrorMessage: 'Erreur lors de la reconnaissance de votre voix. Veuillez réessayer.',
    voiceSuccess: 'Succès!',
    voiceDataExtracted: 'Données extraites avec succès de votre parole!',
    voiceNoData: 'Aucune Donnée',
    voiceNoDataMessage: 'Je n\'ai pas pu identifier de données dans votre parole. Essayez d\'être plus spécifique.',
    voiceProcessingError: 'Erreur lors du traitement de la commande vocale.',
    micPermissionTitle: 'Autorisation du Microphone',
    micPermissionMessage: 'Cette application a besoin d\'accéder au microphone pour la reconnaissance vocale.',
    permissionDenied: 'Permission Refusée',
    micPermissionRequired: 'L\'autorisation du microphone est requise pour utiliser les commandes vocales.',
    askLater: 'Demander Plus Tard',
    ok: 'OK',
    tryAgain: 'Réessayer',
  },
  
  'de': {
    // Navigation
    home: 'Startseite',
    evolution: 'Entwicklung',
    diet: 'Diät',
    profile: 'Profil',
    comments: 'Kommentare',
    workout: 'Training',
    
    // Startbildschirm
    welcome: 'Willkommen zu Ihrer Fitness-Reise!',
    welcomeSubtext: 'Verfolgen Sie Ihre Entwicklung, verwalten Sie Ihre Galerie und verbinden Sie sich mit der Community.',
    
    // Allgemeine Schaltflächen
    save: 'Speichern',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    back: 'Zurück',
    create: 'Erstellen',
    calculate: 'Berechnen',
    clear: 'Löschen',
    
    // Training
    workouts: 'Training',
    newWorkout: 'Neues Training',
    workoutName: 'Trainingsname',
    equipmentName: 'Gerätename',
    workoutDescription: 'Trainingsbeschreibung',
    selectVideo: 'Video Auswählen',
    
    // Diät
    dishes: 'Meine Gerichte',
    newDish: 'Neues Gericht',
    dishName: 'Gerichtname',
    ingredients: 'Zutatenliste',
    calories: 'Kalorien',
    calculateBMI: 'BMI Berechnen',
    
    // BMI
    bmiCalculator: 'BMI-Rechner',
    weight: 'Gewicht',
    height: 'Größe',
    bmiResult: 'Ihr BMI',
    
    // Profil
    createProfile: 'Profil Erstellen',
    settings: 'Einstellungen',
    language: 'Sprache',
    fullName: 'Vollständiger Name',
    name: 'Name',
    email: 'E-Mail',
    enterFullName: 'Geben Sie Ihren vollständigen Namen ein',
    emailPlaceholder: 'beispiel@email.com',
    instagramPlaceholder: '@ihrname',
    saveProfile: 'Profil Speichern',
    changePhoto: 'Foto Ändern',
    addPhoto: 'Foto Hinzufügen',
    notInformed: 'Nicht angegeben',
    profileNotCreated: 'Ihr Profil wurde noch nicht erstellt.',
    tapCreateProfile: 'Tippen Sie auf "Profil Erstellen" um zu beginnen!',
    error: 'Fehler',
    success: 'Erfolg',
    nameRequired: 'Name ist erforderlich.',
    profileSaved: 'Profil erfolgreich gespeichert!',
    profileSaveError: 'Profil konnte nicht gespeichert werden.',
    
    // Einstellungen
    appearance: 'Erscheinungsbild',
    theme: 'Design',
    dark: 'Dunkel',
    light: 'Hell',
    about: 'Über',
    version: 'Version',
    selectLanguage: 'Sprache Auswählen',
    current: 'Aktuell',
    languageChangeInfo: 'Sprachänderungen werden sofort in der gesamten Anwendung angewendet.',
    
    // BMI-Kategorien
    underweight: 'Untergewicht',
    normalWeight: 'Normalgewicht',
    overweight: 'Übergewicht',
    obesityGrade1: 'Adipositas Grad I',
    obesityGrade2: 'Adipositas Grad II',
    obesityGrade3: 'Adipositas Grad III',
    
    // Evolution Dashboard
    evolutionDashboard: 'Evolution Dashboard',
    analysisProgress: 'Fortschrittsanalyse',
    visualSummary: 'Visuelle Zusammenfassung',
    positiveEvolutions: 'Positive Entwicklungen',
    negativeEvolutions: 'Negative Entwicklungen',
    successRate: 'Erfolgsrate',
    perfect: 'PERFEKT!',
    distribution: 'VERTEILUNG',
    improvements: 'Fortschritt',
    regressions: 'Rückschritte',
    metrics: 'der Metriken',
    continuousDays: 'aufeinanderfolgende Tage',
    dashboard: 'Dashboard',
    history: 'Verlauf',
    
    // Körpermaße
    bodyMeasures: 'Körpermaße',
    weight: 'Gewicht',
    chest: 'Brust',
    waist: 'Taille',
    hips: 'Hüfte',
    biceps: 'Bizeps',
    thighs: 'Oberschenkel',
    
    // Nachrichten
    requiredFieldsError: 'Bitte füllen Sie die Pflichtfelder aus (Vorname, Nachname, Gewicht und Größe).',
    evolutionSaved: 'Evolutionsdaten erfolgreich gespeichert!',
    recordUpdated: 'Datensatz erfolgreich aktualisiert!',
    testRecordsCreated: '10 neue Testdatensätze wurden erstellt!',
    deleteRecord: 'Datensatz Löschen',
    deleteRecordConfirm: 'Sind Sie sicher, dass Sie diesen Datensatz löschen möchten?',
    minRecordsShare: 'Sie benötigen mindestens 2 Datensätze, um Ihre Evolution zu teilen.',
    shareError: 'Fehler beim Teilen des Evolutionsberichts.',
    clearAllData: 'Alle Daten Löschen',
    clearAllConfirm: 'Sind Sie sicher, dass Sie alle Evolutionsdaten löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
    
    // Bericht teilen
    evolutionReport: 'Evolutionsbericht - SportidiaFit',
    period: 'Zeitraum',
    comparison: 'Vergleich',
    status: 'Status',
    excellentProgress: 'Ausgezeichneter Fortschritt',
    goodProgress: 'Guter Fortschritt',
    needsImprovement: 'Verbesserung Erforderlich',
    from: 'von',
    to: 'bis',
    days: 'Tage',
    weeks: 'Wochen',
    
    // Sprach-KI System
    voiceAI: 'Sprach-KI',
    voiceHelp: 'Sprachhilfe',
    startListening: 'Aufnahme Starten',
    stopListening: 'Aufnahme Stoppen',
    listening: 'Zuhören...',
    processing: 'Verarbeitung...',
    voiceInstructions: 'Sagen Sie Ihre Daten. Z.B.: "Gewicht 75 Kilo, Größe 1 Meter 80"',
    voiceError: 'Sprachfehler',
    voiceErrorMessage: 'Fehler beim Erkennen Ihrer Stimme. Bitte versuchen Sie es erneut.',
    voiceSuccess: 'Erfolg!',
    voiceDataExtracted: 'Daten erfolgreich aus Ihrer Sprache extrahiert!',
    voiceNoData: 'Keine Daten',
    voiceNoDataMessage: 'Ich konnte keine Daten in Ihrer Sprache identifizieren. Versuchen Sie spezifischer zu sein.',
    voiceProcessingError: 'Fehler beim Verarbeiten des Sprachbefehls.',
    micPermissionTitle: 'Mikrofon-Berechtigung',
    micPermissionMessage: 'Diese App benötigt Mikrofon-Zugriff für Spracherkennung.',
    permissionDenied: 'Berechtigung Verweigert',
    micPermissionRequired: 'Mikrofon-Berechtigung ist erforderlich für Sprachbefehle.',
    askLater: 'Später Fragen',
    ok: 'OK',
    tryAgain: 'Erneut Versuchen',
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('pt-BR');

  useEffect(() => {
    loadLanguage();
  }, []);

  const getDeviceLanguage = () => {
    const deviceLanguage = Platform.OS === 'ios' 
      ? NativeModules.SettingsManager?.settings?.AppleLocale ||
        NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] || 'pt-BR'
      : NativeModules.I18nManager?.localeIdentifier || 'pt-BR';
      
    // Mapear idiomas do dispositivo para os idiomas suportados
    const languageMap = {
      'pt_BR': 'pt-BR',
      'pt-BR': 'pt-BR',
      'pt': 'pt-BR',
      'en': 'en',
      'en_US': 'en',
      'en-US': 'en',
      'es': 'es',
      'es_ES': 'es',
      'es-ES': 'es',
      'zh': 'zh',
      'zh_CN': 'zh',
      'zh-CN': 'zh',
      'fr': 'fr',
      'fr_FR': 'fr',
      'fr-FR': 'fr',
      'de': 'de',
      'de_DE': 'de',
      'de-DE': 'de',
    };

    const normalizedLanguage = deviceLanguage.replace('_', '-');
    return languageMap[normalizedLanguage] || languageMap[normalizedLanguage.split('-')[0]] || 'pt-BR';
  };

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      } else {
        // Se não há idioma salvo, usar o idioma do dispositivo
        const deviceLanguage = getDeviceLanguage();
        setCurrentLanguage(deviceLanguage);
        await AsyncStorage.setItem('selectedLanguage', deviceLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
      // Fallback para idioma do dispositivo em caso de erro
      const deviceLanguage = getDeviceLanguage();
      setCurrentLanguage(deviceLanguage);
    }
  };

  const changeLanguage = async (languageCode) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', languageCode);
      setCurrentLanguage(languageCode);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations['pt-BR'][key] || key;
  };

  const availableLanguages = [
    { code: 'pt-BR', name: 'Português (BR)', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      changeLanguage,
      t,
      availableLanguages
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};