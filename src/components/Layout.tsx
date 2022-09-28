import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return <SafeAreaView style={styles.general}>{props.children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  general: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default Layout;
