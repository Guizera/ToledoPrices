import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { db } from '../firebase'; 
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export interface Product {
  id?: string;
  estabelecimento: string;
  categoria: string;
  nomeProduto: string;
  marca: string;
  unidadeMedida: string;
  valor: string;
  dataRegistro: Date;
}

interface ProductsContextData {
  products: Product[];
  addProduct: (newProduct: Product) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
}

export const ProductsContext = createContext<ProductsContextData>({
  products: [],
  addProduct: async () => { },
  removeProduct: async(productId) => { },
});

interface ProductsProviderProps {
  children: ReactNode;
}

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    const produtosRef = collection(db, 'Produtos');
    const q = query(produtosRef, orderBy('dataRegistro', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista: Product[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Product, 'id'>;
        return {
          id: doc.id,
          ...data,
        };
      });

      setProducts(lista);
    });

    return () => unsubscribe();
  }, []);

  const addProduct = async (newProduct: Product) => {
    await addDoc(collection(db, 'Produtos'), newProduct);
  };

  const removeProduct = async (productId: string) => {
    const docRef = doc(db, 'Produtos', productId);
    await deleteDoc(docRef);
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}
