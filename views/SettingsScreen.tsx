import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function SettingsScreen() {
  const { user, signOutUser } = useContext(AuthContext);
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('Erro ao sair:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      {user ? (
        <>
          <Text>Email: {user.email}</Text>
          <Button title="Logout" onPress={handleLogout} color="red" />
        </>
      ) : (
        <Text>Você não está logado.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, marginBottom: 16 },
});
