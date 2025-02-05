import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Button, Image, Alert , ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Error from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

// import Login from './Login';
// import axios from 'axios';

// const Signup = ({ navigation }) => {
    const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [nameVerify,setNameVerify]=useState(false);
  const [emailVerify,setEmailVerify]=useState(false);
  const [passwordVerify,setPasswordVerify]=useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleName(e){
    const namevar=e.nativeEvent.text;
    setName(namevar);
    setNameVerify(false);
    if(namevar.length>1){
      setNameVerify(true);
    }
  }


  function handleEmail(e){
    const emailvar=e.nativeEvent.text;
    setEmail(emailvar);
    setEmailVerify(false);
    if(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{1,}$/.test(emailvar))
    {
      setEmail(emailvar);
      setEmailVerify(true);
    }
  }

  function handlePassword(e){
    const passwordVar =e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar))
    {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  }
function handleSubmit(){
  const userData={
    name:name,
    email,
    password,
  };
  if(nameVerify && emailVerify && passwordVerify)
  {
    axios.post("http://192.168.10.4:5001/register",userData)
    .then(res=>{
      console.log(res.data);
      if(res.data.status == "ok")
      {
        Alert.alert("Registered Successfull!");
        navigation.navigate("Login");
        setName('');
        setEmail('');
        setPassword('');

      }
      else
      {
        Alert.alert(JSON.stringify(res.data));
        setName('');
        setEmail('');
        setPassword('');
      }
    })
  .catch(e=>console.log(e));
  
  }
else
{
  Alert.alert("Fill mandatory details")

}  

}



  return (
    <View style={styles.container}>

    <View style={styles.topContainer}>
 
      {/* <Image
        source={require('../images1/logor.png')}
        style={styles.logo}
      /> */}
    </View>

    <View style={styles.bottomContainer}>
      <View style={styles.box}>
        <Text style={styles.subtitle}>Sign up</Text>

        <View style={styles.inputContainer}>
          <Icon name="person" size={30} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor={'gray'}
            onChange={e=>handleName(e)}
          />
          {name.length < 1 ? null :nameVerify?(
            <Feather name="check-circle" color="green" size={20}/>
          ):(
            <Error name="error" color="red" size={20}/>
          )}
        </View>

        {name.length < 1 ? null : nameVerify ? null :(
            <Text style={{
              marginLeft:20,
              color:'red',
            }}>
              Name should be more than 1 character
            </Text>
          )}

        <View style={styles.input}>
          {/* <Icon name="email" size={30} color="#000" style={styles.icon} /> */}
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={'gray'}
            onChange={e=>handleEmail(e)}
          />
         {email.length < 1 ? null :emailVerify?(
            <Feather name="check-circle" color="green" size={20}/>
          ):(
            <Error name="error" color="red" size={20}/>
          )}
        </View>

        {email.length < 1 ? null : emailVerify ? null :(
            <Text style={{
              marginLeft:20,
              color:'red',
            }}>
Email should be proper format              </Text>
          )}

<View style={styles.inputContainer}>
          {/* <Icon name="lock" size={30} color="#000" style={styles.icon} /> */}
          <TextInput
            style={styles.input}
            placeholder="Choose Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            placeholderTextColor={'gray'}
            onChange={e=>handlePassword(e)}
            
          />
          
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            {/* <Icon name={passwordVisible ? "visibility" : "visibility-off"} size={30} color="#000" />
             */}

{password.length < 1 ? null : !passwordVisible ?  (
            <Feather 
            name="eye-off" 
            // style={{marginRight:-10}}
            // color="green"
             size={20}
            color= {passwordVerify  ? "green" : "red"}
            />
          ):(
            <Feather name="eye" 
            // style={{marginRight:-10}}
            
            color= {passwordVerify  ? "green" : "red"}
            // color="red" 
            size={20}
            />
          )}
          </TouchableOpacity>
          
        </View>
        {password.length < 1 ? null : passwordVerify ? null :(
            <Text style={{
              marginLeft:20,
              color:'red',
            }}>
              password should be correct format
            </Text>
          )}
            
          
          
        {Object.values(errors).map((error, index) => (
          <Text key={index} style={styles.error}>
            {error}
          </Text>
        ))}

        <View style={styles.buttonContainer}>
          {/* <Button title="SignUp" 
          // onPress={handleSubmit} 
          /> */}

<TouchableOpacity style={styles.customButton} onPress={()=>handleSubmit()} >
            <Text style={styles.customButtonText} >SignUp</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
          <Text style={styles.footer1}>Already have an account?  <Text style={styles.footer1text} onPress={() => navigation.navigate('Login')}> Login</Text> </Text>
          </View>
                <TouchableOpacity style={styles.googleButton}>
                  <Image
                //   source={require('./android/app/src/images/google3.png')}
                source={require('../images/google3.png')}

                  style={styles.image}
                />
                  <Text style={styles.googleButtonText}>Sign in with Google</Text>
                </TouchableOpacity>
          
          {/* <TouchableOpacity style={styles.customButton}>
            <Text style={styles.customButtonText}         onPress={() => navigation.navigate('Login')}
            >Login</Text>
          </TouchableOpacity> */}
        </View>
        {/* <Button
      title="Go to Login"
      onPress={() => navigation.navigate('Login')}
    /> */}
        
        {/* <View style={styles.loginContainer}>
           <Text style={styles.loginText}>Or </Text>
          
        </View> */}

        {/* <View style={styles.screenContainer}>
          <TouchableOpacity style={styles.button1}>
            <View style={styles.container1}>
              <Image source={require('../images1/google.jpg')} style={styles.googleLogo} />
              <Text style={styles.text1}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
        </View> */}

        {/* <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.loginText, { color: '#4285F4' }]}>Login</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#d4e10e',
    backgroundColor: 'white',

  },
  topContainer: {
    flex: 1,
    //  backgroundColor: '#FFFFFF',
    // backgroundColor: '#d4e10e',
    // RGB(255, 255, 255),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:2,
  },
  bottomContainer: {
    flex: 3,
    paddingHorizontal: 12,
    paddingTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:20,
    margin:2,
    marginTop:5,
  },
  box: {
    width: '110%',
    height:'120%',
    backgroundColor: 'white',
    borderRadius: 40,
    paddingVertical: 25,
    paddingHorizontal: 20,
    shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5,
    // marginTop:5,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // textAlign: 'center',
    color: 'black',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginVertical: 2,
    paddingHorizontal:5,
    marginBottom:10
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 10,
    // marginBottom:'10px'
    
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 12,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 6,
  },
  screenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
   
  },
  // button1: {
  //   backgroundColor: '#FFFFFF',
  //   borderRadius: 4,
  //   paddingVertical: 7,
  //   paddingHorizontal: 5,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: '#4285F4',
  //   width: '100%',
  //   justifyContent: 'center',
  //   height:40,
  // },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  googleLogo: {
    width: 20,
    height: 20,
    textAlign: 'center',
  },
  text1: {
    fontSize: 16,
    color: '#4285F4',
    marginLeft: 4,
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom:10
  },
  loginText: {
    fontSize: 12,
    color: 'black',
  },

  customButton: {
  
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'gray',
    height:45,

  },
  customButtonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    
  },
  footer1text:{
  fontWeight:'700',
  color:"black"
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
  image: {
    width: 22, 
    height: 22, 
  },
});

export default Signup;