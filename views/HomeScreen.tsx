import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import { ProductsContext, Product } from '../context/ProductsContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { SwipeListView } from 'react-native-swipe-list-view';
import { HomeStackParamList } from './HomeStack';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

export default function HomeScreen() {
  const { products, removeProduct } = useContext(ProductsContext);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const renderItem = ({ item }: ListRenderItemInfo<Product>) => {
    let iconName = 'category' as keyof typeof MaterialIcons.glyphMap;
    const catLower = item.categoria.toLowerCase();

    //deixei algumas categorias prontas, pode ser adicionada mais...
    if (catLower.includes('alimento')) {
      iconName = 'restaurant';
    } else if (catLower.includes('bebida')) {
      iconName = 'local-drink';
    } else if (catLower.includes('limpeza')) {
      iconName = 'cleaning-services';
    }

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
      >
        <MaterialIcons name={iconName} size={24} style={styles.categoryIcon} />
        <View style={{ flex: 1 }}>
          <Text style={styles.productName}>{item.nomeProduto}</Text>
          <Text style={styles.productCategory}>{item.categoria}</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} />
      </TouchableOpacity>
    );
  };

  const renderHiddenItem = (data: { item: Product }) => {
    const item = data.item;
    return (
      <View style={styles.hiddenContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            if (item.id) removeProduct(item.id);
          }}
        >
          <MaterialIcons name="delete" size={24} color="#fff" />
          <Text style={styles.deleteText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <Text>Nenhum produto cadastrado ainda.</Text>
      ) : (
        <SwipeListView
          data={products}
          keyExtractor={(item) => item.id || String(Math.random())}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-75} 
          stopRightSwipe={-75}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16,
  },
  // Front row
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  categoryIcon: {
    marginRight: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
  },
  // Hidden row
  hiddenContainer: {
    flex: 1,
    backgroundColor: 'red',
    marginBottom: 8,
    borderRadius: 4,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 16,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    marginLeft: 4,
    fontWeight: 'bold',
  },
});
