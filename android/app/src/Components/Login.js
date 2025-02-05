import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = () => {
  return (
    <View style={styles.container}>
      {/* Row with Login and Signup buttons */}
              <Text style={styles.subtitle}>Login</Text>
      
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText1}>Signup</Text>
        </TouchableOpacity>
      </View>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email address"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#1e95a3"

      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="#1e95a3"

      />

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      

      <View style={styles.loginButtonContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      {/* Don't have an account */}
      <View style={styles.signupPrompt}>
        <Text style={styles.promptText}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.signupText}> Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#acc8f8',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  button: {


    width: '40%',
    height: 50,
    backgroundColor: '#0097b2',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  button1: {


    width: '40%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,   
    borderColor: '#131216', 
  },
  buttonText1: {
    color: '#1e95a3',
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  forgotPassword: {
    // color: '#007BFF',
    color: 'black',
    textAlign: 'left',
    marginBottom: 20,
    fontSize: 14,
  },
  loginButton: {
    width: '60%',
    height: 50,
    backgroundColor: '#0097b2',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    width:'30%',
    color: '#fff',
    fontSize: 18,
  },
  loginButtonContainer: {
    alignItems: 'center', // Center align the button
    marginBottom: 20,
  },
  
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'left',
  },
  promptText: {
    fontSize: 14,
    color: '#666',
  },
  signupText: {
    fontSize: 14,
    color: '#1e95a3',

  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 15,
  },
});

export default Login;
