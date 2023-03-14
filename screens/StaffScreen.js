import { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import StaffForm from '../components/StaffForm'
import themeColor from '../constants'

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
    // useEffect(() => {
    //     fetch('https://crudcrud.com/api/b4f9a8cf475148d39e193d92812c4338/zamara')
    //         .then(response => response.json())
    //         .then(data => setStaffData(data))
    //         .catch(error => console.log(error))
    // }, [])

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
        <View style={styles.container}>
            <View style={styles.addStaffButton}>
              <Button title="Add Staff" color="#43AE37" onPress={handleAddStaff} />
            </View>
            <StaffForm 
                visible={showForm} 
                onCancel={handleCancel}
                staffData={selectedStaff}
                isEdit={selectedStaff !== null}                
            />

            <View>
                {/* {staffData.map((staff, index) => ( */}
                    <>
                    {/* <View key={index}> */}
                        <View style={styles.staffCard}>
                            <Text>Staff Number: 1</Text>
                            <Text>Name: Jane</Text>
                            <Text>Email: jane@gmail.com</Text>
                            <Text>Department: Finance</Text>
                            <Text>Salary: 500000</Text>
                            <View style={styles.button}>
                                <Button title="Update" onPress={() => handleUpdate(staff._id)} />
                                <Button title="Delete" color='#E60023' onPress={() => {handleDelete(staff._id)}} />
                            </View>
                        </View>
                        <View style={styles.staffCard}>
                            <Text>Staff Number: 1</Text>
                            <Text>Name: Jane</Text>
                            <Text>Email: jane@gmail.com</Text>
                            <Text>Department: Finance</Text>
                            <Text>Salary: 500000</Text>
                            <View style={styles.button}>
                                <Button title="Update" onPress={() => handleUpdate(staff._id)} />
                                <Button title="Delete" color='#E60023' onPress={() => {handleDelete(staff._id)}} />
                            </View>
                        </View>
                    {/* </View> */}
              
                    </>
                {/* ))} */}
               
            </View>
          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: `${themeColor.secondary}`,
    },

    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginLeft: 100,
        paddingTop: 20,

    },
    staffCard: {
        marginVertical: 10,
        padding: 20,
        margin: 10,
        borderColor: `${themeColor.primary}`,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    addStaffButton: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f5f5f5',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    }

})