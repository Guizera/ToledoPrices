import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from './HomeStack';
import { Product } from '../context/ProductsContext';

type ProductDetailRouteProp = RouteProp<HomeStackParamList, 'ProductDetail'>;

interface ProductDetailScreenProps {
  route: ProductDetailRouteProp;
}

export default function ProductDetailScreen({ route }: ProductDetailScreenProps) {
  const product: Product | undefined = route.params?.product;

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Estabelecimento:</Text>
      <Text style={styles.value}>{product.estabelecimento}</Text>

      <Text style={styles.label}>Categoria:</Text>
      <Text style={styles.value}>{product.categoria}</Text>

      <Text style={styles.label}>Nome do Produto:</Text>
      <Text style={styles.value}>{product.nomeProduto}</Text>

      <Text style={styles.label}>Marca:</Text>
      <Text style={styles.value}>{product.marca}</Text>

      <Text style={styles.label}>Unidade de Medida:</Text>
      <Text style={styles.value}>{product.unidadeMedida}</Text>

      <Text style={styles.label}>Valor do Produto:</Text>
      <Text style={styles.value}>{product.valor}</Text>

      <Text style={styles.label}>Data de Registro:</Text>
      <Text style={styles.value}>{product.dataRegistro.toLocaleDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
});
