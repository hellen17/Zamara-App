import { useState } from 'react';
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import MenuScreen from '../components/Menu';
import themeColor from '../constants';

export default function LoginScreen(){
    const navigation = useNavigation()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)


    const handleLogin = async () => {
        try{
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            const data = await response.json()
            console.log('data', data)
            if(data.token){
                setLoggedIn(true)
                alert('Login Successful')
                console.log(data.username)
                // Navigate to the dashboard screen
                navigation.navigate('Home', {
                    username: data.username,
                    firstname: data.firstName,
                    lastname: data.lastName, 
                    email: data.email, 
                    phone: data.phone, 
                    gender: data.gender,
                    image: data.image
                
                })
            

            }
            else{
                alert('Login Failed')
                console.log(data)
            }

        }
        catch(err){
            console.log(err)
            alert('An error occurred during login');
        }

    }

    const handleLogout = () => {
        setLoggedIn(false)
        setUsername('')
        setPassword('')
    }

    return (
        <>
        <View style={styles.container}>
            <Image source={require("../assets/zamara-logo.png")} style={{width: 100, height: 20}} />
            <Text style={styles.title}>Login to your account</Text>
            <TextInput 
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.textInput}         
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}   
                style={styles.textInput}     
            />
            <View style={styles.loginButton}>
            <Button title="Login" onPress={handleLogin} color={themeColor.primary} />
            </View>

        </View>

        </>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `${themeColor.secondary}`
    },
    title:{
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 20,
        color: '#fff',

    },
    textInput: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        color: '#fff',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        marginBottom: 10,
    },
    loginButton: {
        width: '80%',
        marginTop: 20,
        borderRadius: 5,
    }

})