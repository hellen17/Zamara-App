import { useState, useEffect } from 'react';

import { View, Text, TextInput, Button, StyleSheet, Modal} from 'react-native';

export default function StaffForm(props) {

    const [staffNumber, setStaffNumber] = useState('');
    const [staffName, setStaffName] = useState('');
    const [staffEmail, setStaffEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');

    const { staffData, isEdit, onCancel } = props;

    useEffect(() => {
        if (staffData !== null) {
            setStaffNumber(staffData.staffNumber)
            setStaffName(staffData.staffName)
            setStaffEmail(staffData.staffEmail)
            setDepartment(staffData.department)
            setSalary(staffData.salary)
        } else {
            setStaffNumber('')
            setStaffName('')
            setStaffEmail('')
            setDepartment('')
            setSalary('')
        }
    }, [staffData])

    const handleSaveData = () => {
        const data = { staffNumber, staffName, staffEmail, department, salary }
        const method = isEdit ? 'PUT' : 'POST'
        const url = isEdit ? `https://crudcrud.com/api/b4f9a8cf475148d39e193d92812c4338/zamara-test/${staffData._id}` : 'https://crudcrud.com/api/b4f9a8cf475148d39e193d92812c4338/zamara'
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(() => {
                setStaffNumber('')
                setStaffName('')
                setStaffEmail('')
                setDepartment('')
                setSalary('')
                onCancel()

                //send email notification
                if (isEdit) {
                    sendEmailNotification('Profile Notification #Edited', `Greeting ${staffData.staffName}, we are glad to inform you that your staff profile has been updated.`);
                } else {
                    sendEmailNotification('Profile Notification #Created', `Greeting ${staffName}, we are glad to inform you that your staff profile has been created.`);
                }
            })
            //close modal
            .catch(error => console.log(error))

    };

    
    const sendEmailNotification = (subject, body) => {
        const emailData = {
        sender: 'admin@zamara.co.ke',
        recipients: [staffEmail],
        subject: subject,
        text: body
        }
        
        fetch('https://api.smtpbucket.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization '           
        },
        body: JSON.stringify(emailData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => console.log('Email notification sent:', data))
        .catch(error => {
            console.log('Error sending email',error);
            throw error;
        })
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>{ isEdit ? 'Update Staff Form' : 'Add New Staff'}</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Enter your Staff Number" style={styles.textInput} value={staffNumber} onChangeText={setStaffNumber} />
                    <TextInput placeholder="Enter your name" style={styles.textInput} value={staffName} onChangeText={setStaffName} />
                    <TextInput placeholder="Enter your email address" style={styles.textInput} value={staffEmail} onChangeText={setStaffEmail} />
                    <TextInput placeholder="Enter your department" style={styles.textInput} value={department} onChangeText={setDepartment} />
                    <TextInput placeholder="Enter your salary" style={styles.textInput} value={salary} onChangeText={setSalary} />
                    <View style={styles.button}>
                        <Button title={isEdit ? 'Save' : 'Submit'} color="#43AE37" onPress={handleSaveData} />
                        <Button title="Cancel" color="#E60023" onPress={props.onCancel} />
                    </View>
                 
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        paddingTop: '8rem',
    },
    inputContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        marginBottom: 20,  
    },
    textInput: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
    formContainer: {
        flex: 1,
    }

})
