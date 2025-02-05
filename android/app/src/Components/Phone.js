import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const countries = [
  { name: 'India', code: '+91', flag: 'https://flagcdn.com/w320/in.png' },
  { name: 'United States', code: '+1', flag: 'https://flagcdn.com/w320/us.png' },
  { name: 'United Kingdom', code: '+44', flag: 'https://flagcdn.com/w320/gb.png' },
  { name: 'Canada', code: '+1', flag: 'https://flagcdn.com/w320/ca.png' },
];

const Signup = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');
  const [otpModalVisible, setOtpModalVisible] = useState(false);

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setModalVisible(false);
  };

  const handleGetOtp = async () => {
    const fullPhoneNumber = `${selectedCountry.code}${phoneNumber}`;
    try {
      const confirmation = await auth().signInWithPhoneNumber(fullPhoneNumber);
      setVerificationId(confirmation.verificationId);
      setOtpModalVisible(true);
      Alert.alert('OTP Sent', `An OTP has been sent to ${fullPhoneNumber}`);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
      await auth().signInWithCredential(credential);
      Alert.alert('Success', 'Phone number verified and logged in');
    } catch (error) {
      Alert.alert('Error', error.message || 'Invalid OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign up</Text>

      {/* Country Selection */}
      <TouchableOpacity
        style={styles.countryContainer}
        onPress={() => setModalVisible(true)}
      >
        <Image source={{ uri: selectedCountry.flag }} style={styles.countryIcon} />
        <Text style={styles.countryName}>{selectedCountry.name}</Text>
        <Image source={require('../images/drop.png')} style={styles.image} />
      </TouchableOpacity>

      {/* Phone Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity style={styles.getOtpButton} onPress={handleGetOtp}>
        <Text style={styles.getOtpButtonText}>Get OTP</Text>
      </TouchableOpacity>

      {/* OTP Modal */}
      <Modal
        transparent={true}
        visible={otpModalVisible}
        animationType="slide"
        onRequestClose={() => setOtpModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
            />
            <TouchableOpacity style={styles.getOtpButton} onPress={verifyOtp}>
              <Text style={styles.getOtpButtonText}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Country Selection Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Please Select Country</Text>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => selectCountry(item)}
                >
                  <Image source={{ uri: item.flag }} style={styles.countryIcon} />
                  <Text style={styles.countryName}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'fl',
    alignItems:'flex-start',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
  },
  countryIcon: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
 
  countryName: {
    fontSize: 16,
    marginRight: 10,
  },
  image: {
    width: 22, 
    height: 22, 
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  getOtpButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  getOtpButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#4285F4',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff5a5f',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Signup;




