import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { AuthContext } from '../context/AuthContext';
import { OrangeButton } from '../components/OrangeButton';

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { signIn } = useContext(AuthContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Erro', 'Digite email e senha.');
      return;
    }

    try {
      await signIn(email, password);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.replace('Main');
    } catch (error: any) {
      console.log('Erro ao logar:', error.code, error.message);
      Alert.alert('Erro no Login', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bem-vindo!</Text>

        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          placeholderTextColor="#999"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <OrangeButton title="Entrar" onPress={handleLogin} />

        <TouchableOpacity
          style={{ marginTop: 16, alignItems: 'center' }}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={{ color: '#007BFF', fontWeight: 'bold' }}>
            Não tem conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#003761', 
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      width: '85%',           
      backgroundColor: '#fff', 
      borderRadius: 12,
      padding: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,         
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#333',
      textAlign: 'center',
    },
    input: {
      backgroundColor: '#f3f3f3',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 16,
      fontSize: 16,
      color: '#333',
    },
  });