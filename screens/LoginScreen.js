import { useState } from 'react';
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import MenuScreen from '../components/Menu';

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
                    gender: data.gender
                   

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

    <MenuScreen loggedIn={loggedIn} handleLogout={handleLogout} />


    return (
        <>
        <View style={styles.container}>
            <Text style={styles.title}>Login Screen</Text>
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
            <Button title="Login" onPress={handleLogin} />

        </View>

        </>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textInput: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        marginBottom: 10,
    }

})