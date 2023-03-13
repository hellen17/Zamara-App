import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';

export default function DashboardScreen({ route, navigation }){
    const { username, firstname, lastname, email, gender } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard Screen</Text>
            <View>
                <Text>Welcome {`${firstname} ${lastname}`} </Text>
                <Text>Your profile details are as below:</Text>
                <Text>List of details.... </Text>
                <Text>Age: {firstname}</Text>
                <Text>Email: {email}</Text>
                <Text>Gender: {gender}</Text>
             
            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    }

})