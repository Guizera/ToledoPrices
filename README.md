# MeuApp

Este é um aplicativo desenvolvido em **React Native** com **TypeScript** utilizando **Expo**, **Firebase Authentication** e **Cloud Firestore**. O aplicativo permite que o usuário se cadastre, faça login, adicione produtos, visualize a lista de produtos cadastrados (com opção de exclusão) e realize logout através da tela de configurações.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) instalado globalmente:
  ```bash
  npm install -g expo-cli

- Instale as dependencias:
  ```bash
  npm install dependence-name

##Estrutura
App/
├── App.tsx
├── firebase.ts
├── context/
│   ├── AuthContext.tsx
│   └── ProductsContext.tsx
├── components/
│   └── OrangeButton.tsx
└── views/
    ├── SplashScreen.tsx
    ├── LoginScreen.tsx
    ├── RegisterScreen.tsx
    ├── BottomTabs.tsx
    ├── HomeScreen.tsx
    ├── ProductDetailScreen.tsx
    └── SettingsScreen.tsx
