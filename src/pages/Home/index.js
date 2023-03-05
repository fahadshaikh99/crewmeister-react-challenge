import React, { useEffect, useState } from 'react';
import absences from '../../data/mock/absences.json';
import members from '../../data/mock/members.json';
import { Table, DatePicker } from 'antd';
import { listAbsencesColumns } from './listAbsencesColumns';
const { RangePicker } = DatePicker;

const Home = () => {

    const [listAbsences, setListAbsences] = useState([])
    const [dateFilter, setDateFilter] = useState([]);

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

    const handleDateFilterChange = (dates) => {
        setDateFilter(dates);
    };

    const filteredDataSource = listAbsences?.filter((event) => {
        if (!dateFilter?.length) {
            return true;
        }
        const [startDate, endDate] = dateFilter;
        return new Date(event?.startDate) >= startDate && new Date(event?.endDate) <= endDate;
    });

    return (
        <div>
            <div>Total number of absences: {listAbsences.length}</div>
            <RangePicker onChange={handleDateFilterChange} style={{ marginBottom: 16 }} />
            <Table columns={listAbsencesColumns} dataSource={filteredDataSource} rowKey="id" />
        </div>
    )
}

export default Home;