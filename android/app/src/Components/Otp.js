



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const OtpVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('+91 8888278965'); // Default phone number
  const [otp, setOtp] = useState(''); // OTP input state
  const [resendTimer, setResendTimer] = useState(30); // Timer for resend OTP

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const handleResendOtp = () => {
    setResendTimer(30); // Reset timer to 30 seconds
    console.log('Resending OTP to:', phoneNumber);
  };

  const handleVerifyOtp = () => {
    // Simulate OTP verification
    if (otp === '123456') {
      console.log('OTP verified successfully!');
    } else {
      console.log('Invalid OTP');
    }
  };

  const handleChangePhone = () => {
    // Logic to change phone number
    console.log('Change phone number pressed.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifying OTP</Text>

      {/* OTP Sent Row */}
      <View style={styles.sentToContainer}>
        <Text style={styles.sentToText}>OTP sent to {phoneNumber}</Text>
        <TouchableOpacity onPress={handleChangePhone}>
          <Text style={styles.changeText}>Change?</Text>
        </TouchableOpacity>
      </View>

      {/* OTP Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        maxLength={6}
      />

      {/* Resend OTP */}
      {resendTimer > 0 ? (
        <Text style={styles.resendText}>Resend OTP in {resendTimer} sec</Text>
      ) : (
        <TouchableOpacity onPress={handleResendOtp}>
          <Text style={styles.resendButtonText}>Resend OTP</Text>
        </TouchableOpacity>
      )}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleVerifyOtp}>
        <Text style={styles.buttonText}>Submit OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sentToContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  sentToText: {
    fontSize: 16,
    color: '#333',
  },
  changeText: {
    fontSize: 16,
    color: '#4285F4',
    marginLeft: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  resendText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  resendButtonText: {
    fontSize: 14,
    color: '#4285F4',
    textAlign: 'center',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#FF0000',
        paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OtpVerification;