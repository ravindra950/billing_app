// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   FlatList,
//   Modal,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const countries = [
//   { name: 'India', code: '+91', flag: 'https://flagcdn.com/w320/in.png' },
//   { name: 'United States', code: '+1', flag: 'https://flagcdn.com/w320/us.png' },
//   { name: 'United Kingdom', code: '+44', flag: 'https://flagcdn.com/w320/gb.png' },
//   { name: 'Canada', code: '+1', flag: 'https://flagcdn.com/w320/ca.png' },
// ];

// const Signup = () => {
//   const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default country
//   const [modalVisible, setModalVisible] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const selectCountry = (country) => {
//     setSelectedCountry(country);
//     setModalVisible(false);
//   };

//   const handleGetOtp = () => {
//     console.log(`Selected Country: ${selectedCountry.name}, Phone: ${phoneNumber}`);
//     // Add OTP handling logic here
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Sign up</Text>

//       {/* Country Selection */}
//       <TouchableOpacity
//         style={styles.countryContainer}
//         onPress={() => setModalVisible(true)}
//       >
//         <Image source={{ uri: selectedCountry.flag }} style={styles.countryIcon} />
//         <Text style={styles.countryName}>{selectedCountry.name}</Text>
//         <Image
//         source={require('./android/app/src/images/drop.png')}
//         style={styles.image}
//       />
//       </TouchableOpacity>


//       {/* Phone Number Input */}
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your phone number"
//         keyboardType="phone-pad"
//         value={`${selectedCountry.code} ${phoneNumber}`}
//         onChangeText={(text) => {
//           const number = text.replace(selectedCountry.code, '').trim();
//           setPhoneNumber(number);
//         }}
//       />

//       <TouchableOpacity style={styles.getOtpButton} onPress={handleGetOtp}>
//         <Text style={styles.getOtpButtonText}>Get OTP</Text>
//       </TouchableOpacity>

//       {/* OR Separator */}
//       <View style={styles.orContainer}>
//         <View style={styles.line} />
//         <Text style={styles.orText}>OR</Text>
//         <View style={styles.line} />
//       </View>

     
      // <TouchableOpacity style={styles.googleButton}>
      //   <Image
      //   source={require('./android/app/src/images/google3.png')}
      //   style={styles.image}
      // />
      //   <Text style={styles.googleButtonText}>Sign in with Google</Text>
      // </TouchableOpacity>

//       {/* Country Selection Modal */}
//       <Modal
//         transparent={true}
//         visible={modalVisible}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Please Select Country</Text>
//             <FlatList
//               data={countries}
//               keyExtractor={(item) => item.code}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.countryItem}
//                   onPress={() => selectCountry(item)}
//                 >
//                   <Image source={{ uri: item.flag }} style={styles.countryIcon} />
//                   <Text style={styles.countryName}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//             {/* <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity> */}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     // alignItems: 'fl',
//     alignItems:'flex-start',
//     padding: 20,
//     backgroundColor: '#ffffff',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#333',
//   },
//   countryContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
  
//     backgroundColor: 'white',
//     padding: 15,
//     borderRadius: 5,
//   },
//   countryIcon: {
//     width: 30,
//     height: 20,
//     marginRight: 10,
//   },
 
//   countryName: {
//     fontSize: 16,
//     marginRight: 10,
//   },
//   image: {
//     width: 22, 
//     height: 22, 
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   getOtpButton: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#FF0000',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   getOtpButtonText: {
//     fontSize: 16,
//     color: '#ffffff',
//     fontWeight: 'bold',
//   },
//   orContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     marginVertical: 20,
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#ccc',
//   },
//   orText: {
//     marginHorizontal: 10,
//     fontSize: 16,
//     color: '#333',
//   },
//   googleButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//     height: 50,
//     backgroundColor: '#f5f5f5',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//   },
//   googleButtonText: {
//     fontSize: 16,
//     color: '#4285F4',
//     marginLeft: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   countryItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   closeButton: {
//     marginTop: 20,
//     backgroundColor: '#ff5a5f',
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default Signup;







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





import PhoneSignIn from './android/app/src/Components/Phone'