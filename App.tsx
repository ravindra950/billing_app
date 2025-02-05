import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PhoneSignIn from './android/app/src/Components/Phone';
import InvoiceForm from './android/app/src/Components/InvoiceForm';
import { Provider as PaperProvider } from 'react-native-paper';
import Signup from './android/app/src/Components/Signup';
import Login from './android/app/src/Components/Login';
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <PaperProvider>
      <SafeAreaView style={[backgroundStyle, styles.container]}>
        {/* <Signup /> */}
        <InvoiceForm />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreen: {
    flex: 1,
    width: '100%',
  },
});

export default App;
