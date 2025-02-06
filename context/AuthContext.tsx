import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, User } from 'firebase/auth';
import { auth } from '../firebase'; 

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  signIn: async () => {},
  signOutUser: async () => {},
  signUp: async () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log('Usuário logado:', currentUser);
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login realizado com sucesso!');
      } catch (error: any) {
        console.log('Erro ao logar:', error.code, error.message);
        throw error;
      }
  };

  const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log('Logout realizado!');
      } catch (error) {
        console.log('Erro ao deslogar:', error);
      }
  };

  const signUp = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        userCredential.user;
        console.log('Usuário cadastrado com sucesso!', userCredential.user);
      } catch (error: any) {
        console.log('Erro ao cadastrar:', error.code, error.message);
        throw error;
      }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOutUser, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
