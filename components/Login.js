import { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/useAuthentication';
export default function Login() {
  const {signIn} = useContext(AuthContext)
  const URL_IMAGEN_LOGO = "https://res.cloudinary.com/dabyqnijl/image/upload/v1729831966/agpocw2m8hcwpe8xufey.png"
  const LOGO_COSAI = "https://res.cloudinary.com/dabyqnijl/image/upload/v1730248449/et35vyu58u7ipt0um69z.png"

  const [DNI, setDNI] = useState('');
  const handleLogin=async()=>{
    await signIn(String(DNI));

  }
  return (
    <View style={styles.container}>
      <Image source={{uri: URL_IMAGEN_LOGO}} style={{width:360, height:80}} />
      <View style={styles.container_form}>
        <Text style={styles.title}>
          Iniciar Sesión
        </Text>
        <TextInput
          style={styles.input}

          placeholder='DNI'
          value={DNI}
          onChangeText={setDNI}
          keyboardType='numeric'
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Inicia Sesión</Text>
        </TouchableOpacity>
      </View>
      <Image
        style={{marginTop :50}}
        source={{
          uri : LOGO_COSAI
        }}
        width={300}
        height={80}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_form: {
    borderColor : "#E6E6E6",
    borderWidth:1,
    borderRadius : 10,
    padding : 20,
    display:"flex",
    flexDirection : "column",
    justifyContent:'center',
    alignItems:'center',
    marginVertical : 30,
    width:"90%",
   
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '100%',
    backgroundColor: '#1a73e8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
