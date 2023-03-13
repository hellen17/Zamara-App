import { View, Text, StyleSheet } from 'react-native';

export default function DashboardScreen(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard Screen</Text>
            <View>
                <Text>Welcome Username...</Text>
                <Text>Your profile details are as below:</Text>
                <Text>List of details.... </Text>
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