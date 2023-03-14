import { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import StaffForm from '../components/StaffForm'

export default function StaffScreen() {
    const [showForm, setShowForm] = useState(false)
    const [staffData, setStaffData] = useState([])
    const [selectedStaff, setSelectedStaff] = useState(null)

    const handleAddStaff = () => {
        setShowForm(true)
        setSelectedStaff(null)
    }

    const handleCancel = () => {
        setShowForm(false)
        setSelectedStaff(null)
    }


    // Fetch staff data from the API
    useEffect(() => {
        fetch('https://crudcrud.com/api/b4f9a8cf475148d39e193d92812c4338/zamara')
            .then(response => response.json())
            .then(data => setStaffData(data))
            .catch(error => console.log(error))
    }, [])

    // update staff data
    const handleUpdate = (id) => {
        const selected = staffData.find((staff) => staff._id === id)
        setSelectedStaff(selected)
        setShowForm(true)
    }

    // delete staff data
    const handleDelete = (id) => {
        // call the API to delete the staff data with the given id
        fetch(`https://crudcrud.com/api/b4f9a8cf475148d39e193d92812c4338/zamara/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                // remove the staff data from the state
                const updatedStaffData = staffData.filter(staff => staff._id !== id)
                setStaffData(updatedStaffData)
            })
            .catch(error => console.log(error))
    }

    

    return (
        <View>
            <Button title="Add Staff" color="#43AE37" onPress={handleAddStaff} />
            <StaffForm 
                visible={showForm} 
                onCancel={handleCancel}
                staffData={selectedStaff}
                isEdit={selectedStaff !== null}                
            />

            <View>
                <Text>List of Staff </Text>
                {staffData.map((staff, index) => (
                    <>
                    <View key={index}>
                        <Text>Staff Number: {staff.staffNumber}</Text>
                        <Text>Name: {staff.staffName}</Text>
                        <Text>Email: {staff.staffEmail}</Text>
                        <Text>Department: {staff.department}</Text>
                        <Text>Salary: {staff.salary}</Text>
                    </View>
                    <View style={styles.button}>
                     <Button title="Update" onPress={() => handleUpdate(staff._id)} />
                     <Button title="Delete" color='red' onPress={() => {handleDelete(staff._id)}} />
                    </View>
                    </>
                ))}
               
            </View>
          
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginLeft: 100
    }
})