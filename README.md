# SportidiaFit 💪

Um aplicativo de academia completo desenvolvido em React Native para acompanhar sua jornada fitness.

## 📱 Funcionalidades

### 🏠 Tela Inicial
- Interface limpa e intuitiva
- Acesso rápido a todas as funcionalidades
- **Ícone de Modo Escuro Customizado**: Lua crescente que muda cor conforme o tema
- Tradução completa para múltiplos idiomas

### 🌍 Sistema de Internacionalização
- **6 idiomas suportados**:
  - 🇧🇷 Português (Brasil)
  - 🇺🇸 English
  - 🇪🇸 Español  
  - �🇷 Français (Francês)
  - 🇩🇪 Deutsch (Alemão)
  - �🇨🇳 中文 (Chinês)
- **Detecção Automática**: Idioma do dispositivo detectado automaticamente
- Alternância instantânea de idioma
- Tradução completa da interface
- Armazenamento da preferência do usuário

### ⚙️ Configurações
- Seleção de idioma com interface intuitiva
- Alternância entre tema claro/escuro
- Informações da versão do aplicativo
- Acesso direto via perfil do usuário

### 🏋️ Sistema de Treinos
- Cadastro completo de exercícios
- Upload e reprodução de vídeos demonstrativos
- Detalhamento de equipamentos
- Interface otimizada para gestão de treinos

### 🍽️ Módulo de Dieta
- **Cadastro de Pratos**: Nome, ingredientes e calorias
- **Calculadora de IMC**: 
  - Entrada em centímetros para altura
  - Classificação automática (baixo peso, normal, sobrepeso, obesidade)
  - Interface clara e educativa

### 📊 Controle de Evolução
- Cadastre seus dados corporais
- Acompanhe peso, altura e medidas
- Histórico completo de registros
- Campos para medidas específicas:
  - Peito, cintura, quadril
  - Bíceps, coxas

### 👤 Perfil do Usuário
- Cadastre informações pessoais
- Nome, WhatsApp, email
- Instagram (@usuario)
- Foto de perfil personalizada
- **Botão de configurações integrado**

### 💬 Sistema de Comentários
- Compartilhe experiências
- Sistema de curtidas
- Comentários em tempo real
- Interface inspirada em redes sociais

## 🎨 Design

### Tema Claro (Padrão)
- **Cores principais**: Branco e Azul
- **Background**: #FFFFFF
- **Primária**: #007BFF
- **Secundária**: #17A2B8

### Modo Escuro
- **Cores principais**: Preto e Laranja
- **Background**: #121212
- **Primária**: #FF8C00
- **Secundária**: #FFA500

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── icons/          # Ícones SVG customizados
│       ├── WorkoutIcon.js
│       ├── DietIcon.js
│       ├── EvolutionIcon.js
│       ├── ProfileIcon.js
│       └── CommentsIcon.js
├── contexts/           # Contextos React
│   ├── ThemeContext.js      # Gerenciamento de temas
│   └── LanguageContext.js   # Sistema de internacionalização
├── navigation/         # Configuração de navegação
│   └── AppNavigator.js
├── screens/           # Telas do aplicativo
│   ├── HomeScreen.js           # Tela principal
│   ├── WorkoutScreen.js        # Lista de treinos
│   ├── AddWorkoutScreen.js     # Cadastro de treinos
│   ├── WorkoutDetailScreen.js  # Detalhes do treino
│   ├── DietScreen.js           # Módulo de dieta
│   ├── AddDishScreen.js        # Cadastro de pratos
│   ├── BMICalculatorScreen.js  # Calculadora IMC
│   ├── EvolutionScreen.js      # Controle de evolução
│   ├── ProfileScreen.js        # Perfil do usuário
│   ├── SettingsScreen.js       # Configurações
│   ├── LanguageSelectorScreen.js # Seleção de idioma
│   └── CommentsScreen.js       # Sistema de comentários
└── assets/            # Recursos estáticos
    ├── images/        # Imagens PNG/SVG
    └── videos/        # Vídeos MP4
```

## 📦 Dependências Principais

- `@react-navigation/native` - Navegação
- `@react-navigation/bottom-tabs` - Navegação por abas
- `@react-navigation/stack` - Navegação em pilha
- `react-native-vector-icons` - Ícones
- `react-native-image-picker` - Seleção de imagens
- `react-native-video` - Reprodução de vídeos
- `@react-native-async-storage/async-storage` - Armazenamento local
- `react-native-svg` - Suporte a SVG

## ✅ Funcionalidades Implementadas

- [x] **Sistema de Navegação Completo** - Navegação por abas (Início, Evolução, Dieta, Perfil)
- [x] **Sistema de Internacionalização** - 4 idiomas suportados (PT, EN, ES, ZH)
- [x] **Temas Claro/Escuro** - Alternância dinâmica de temas
- [x] **Módulo de Treinos** - Cadastro completo com vídeos
- [x] **Módulo de Dieta** - Cadastro de pratos e calculadora IMC
- [x] **Sistema de Perfil** - Gerenciamento completo do usuário
- [x] **Tela de Configurações** - Configurações de idioma e tema
- [x] **Ícones Customizados** - Sistema completo de ícones SVG
- [x] **Controle de Evolução** - Acompanhamento de progresso
- [x] **Sistema de Comentários** - Interação com comunidade

## 🎯 Próximas Funcionalidades

- [ ] Sincronização com a nuvem
- [ ] Planos de treino personalizados
- [ ] Integração com wearables
- [ ] Notificações push
- [ ] Backup automático de dados
- [ ] Compartilhamento social
- [ ] Modo offline aprimorado

---

**SportidiaFit** - Transforme sua jornada fitness! 🏋️‍♂️
