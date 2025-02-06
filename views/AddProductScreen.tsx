import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Button } from 'react-native';
import { ProductsContext, Product } from '../context/ProductsContext';
import { MaskedTextInput } from 'react-native-mask-text';
import { OrangeButton } from '../components/OrangeButton';

export default function AddProductScreen() {
  const { products, addProduct } = useContext(ProductsContext);
  const [id, setId] = useState('');
  const [estabelecimento, setEstabelecimento] = useState('');
  const [categoria, setCategoria] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [marca, setMarca] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [valor, setValor] = useState('');
  const [dataRegistro, setDataRegistro] = useState('');

  const handleAdd = async () => {
    if (
      !estabelecimento ||
      !categoria ||
      !nomeProduto ||
      !marca ||
      !unidadeMedida ||
      !valor ||
      !dataRegistro
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    
    const existe = products.find(
      (p) =>
        p.estabelecimento.toLowerCase() === estabelecimento.toLowerCase() &&
        p.nomeProduto.toLowerCase() === nomeProduto.toLowerCase()
    );
    if (existe) {
      Alert.alert(
        'Erro',
        'Este produto já foi registrado para este estabelecimento.'
      );
      return;
    }

    if (dataRegistro.length < 10) {
      Alert.alert('Erro', 'Data de registro invalida');
    }

    const day = dataRegistro.substring(0, 2);
    const month = dataRegistro.substring(3, 5);
    const year = dataRegistro.substring(6, 10);
    
    const dataObj = new Date(`${year}-${month}-${day}T00:00:00`);

    const novoProduto: Product = {
      id,
      estabelecimento,
      categoria,
      nomeProduto,
      marca,
      unidadeMedida,
      valor,
      dataRegistro: dataObj,
    };

    try {
      await addProduct(novoProduto);

      Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
      setId('');
      setEstabelecimento('');
      setCategoria('');
      setNomeProduto('');
      setMarca('');
      setUnidadeMedida('');
      setValor('');
      setDataRegistro('');
    } catch (error) {
      console.log('Erro ao adicionar produto:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o produto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Produto</Text>

      <Text>Estabelecimento:</Text>
      <TextInput
        style={styles.input}
        value={estabelecimento}
        onChangeText={setEstabelecimento}
      />

      <Text>Categoria:</Text>
      <TextInput
        style={styles.input}
        value={categoria}
        onChangeText={setCategoria}
      />

      <Text>Nome do Produto:</Text>
      <TextInput
        style={styles.input}
        value={nomeProduto}
        onChangeText={setNomeProduto}
      />

      <Text>Marca:</Text>
      <TextInput
        style={styles.input}
        value={marca}
        onChangeText={setMarca}
      />

      <Text>Unidade de Medida:</Text>
      <TextInput
        style={styles.input}
        value={unidadeMedida}
        onChangeText={setUnidadeMedida}
      />

      <Text>Valor:</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      <Text>Data de Registro:</Text>
      <MaskedTextInput
        mask="99/99/9999"
        style={styles.input}
        value={dataRegistro}
        onChangeText={(text, rawText) => {
          setDataRegistro(text);
        }}
        keyboardType='numeric'
      />

      <OrangeButton title="Enviar" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
  },
});
