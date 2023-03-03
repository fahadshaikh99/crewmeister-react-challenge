import React, { useEffect, useState } from 'react';
import absences from '../../data/mock/absences.json';
import members from '../../data/mock/members.json';
import { Table } from 'antd';
import { listAbsencesColumns } from './listAbsencesColumns';



const Home = () => {

    const [listAbsences, setListAbsences] = useState([])

    useEffect(() => {
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
            status: obj?.confirmedAt ? 'Confirmed' : obj?.rejectedAt ? 'Rejected' : 'Requested',
            period: `${obj?.startDate} to ${obj.endDate}`,
            ...obj
        }));
        return absenceList
    }

    return (
        <div>
            <Table columns={listAbsencesColumns} dataSource={listAbsences} rowKey="id" />
        </div>
    )
}

export default Home;