import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface OrangeButtonProps {
  title: string;
  onPress: () => void;
}

export function OrangeButton({ title, onPress }: OrangeButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#d58500', 
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',  
    fontSize: 16,
    fontWeight: 'bold',
  },
});
