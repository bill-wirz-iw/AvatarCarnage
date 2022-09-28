import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

type StyledTextInputProps = {
  placeholder: string;
  textContentType: 'username' | 'password';
  value: string;
  onChangeText: ((text: string) => void) | undefined;
};

const StyledTextInput = ({
  placeholder,
  textContentType,
  value,
  onChangeText,
}: StyledTextInputProps) => {
  return (
    <TextInput
      style={styles.body}
      placeholder={placeholder}
      textContentType={textContentType}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  body: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'grey',
    borderBottomWidth: 1,
    color: 'black',
  },
});

export default StyledTextInput;
