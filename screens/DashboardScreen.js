import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image } from 'react-native';
import themeColor from '../constants';

export default function DashboardScreen({ route, navigation }){
    const { username, firstname, lastname, email, image, gender } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Dashboard</Text>
            <View>
                <View style={styles.welcomeContainer}>
                    <Image source={{uri: image }} style={styles.image} />
                    <View style={styles.welcomeText}>
                        <Text style={{color: '#fff'}}>Welcome</Text>
                        <Text style={styles.name}> {`${firstname} ${lastname}`}</Text>
                    </View>
                </View>
                <Text style={styles.subheading}>Your profile details are as below:</Text>
                <Text style={styles.data}>Age: {firstname}</Text>
                <Text style={styles.data}>Email: {email}</Text>
                <Text style={styles.data}>Gender: {gender}</Text>
             
            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'left',
        paddingTop: 30,
        paddingHorizontal: 30,
        backgroundColor: `${themeColor.secondary}`,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: `${themeColor.primary}`,
    },
    name: {
        fontWeight: 'bold',
        color: `${themeColor.primary}`,
        fontSize: 18,
    },
    welcomeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
    },
    welcomeText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'left',

    },
    subheading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
    },

    data: {
        fontSize: 16,
        marginBottom: 10,
        color: '#fff',
    }


})