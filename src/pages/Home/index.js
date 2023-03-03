import React, { useEffect, useState } from 'react';
import absences from '../../data/mock/absences.json';
import members from '../../data/mock/members.json';



const Home = () => {

    const [listAbsences, setListAbsences] = useState([])

    useEffect(() => {
        console.log("List absences ", absences)
        console.log("List Members: ", members)

        // convert members array into object 
        const membersObject = createMembersObjectByUserId()
        // create a combine list of absences with members
        const listAbsencesWithMembers = createAbsencesListWithMembers(membersObject)
        setListAbsences(listAbsencesWithMembers)
    }, [])

    const createMembersObjectByUserId = () => {
        const userObject = members?.payload?.reduce((acc, curr) => {
            acc[curr.userId] = curr;
            return acc;
        }, {});
        return userObject
    }

    const createAbsencesListWithMembers = (membersObject) => {
        const absenceList = absences?.payload?.map(obj => ({
            name: membersObject[obj.userId]?.name,
            ...obj
        }));
        return absenceList
    }

    return (
        <div>
            Home
        </div>
    )
}

export default Home;