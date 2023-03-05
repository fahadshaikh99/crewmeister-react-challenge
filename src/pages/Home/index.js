import React, { useEffect, useState } from 'react';
import absences from '../../data/mock/absences.json';
import members from '../../data/mock/members.json';
import { Table, DatePicker, Spin } from 'antd';
import { listAbsencesColumns } from './listAbsencesColumns';
import './home.css'
const { RangePicker } = DatePicker;

const Home = () => {

    const [listAbsences, setListAbsences] = useState([])
    const [dateFilter, setDateFilter] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // convert members array into object 
        const membersObject = createMembersObjectByUserId()
        // create a combine list of absences with members
        const listAbsencesWithMembers = createAbsencesListWithMembers(membersObject)
        setListAbsences(listAbsencesWithMembers)
        setLoading(false)
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
            status: obj?.confirmedAt ? 'confirmed' : obj?.rejectedAt ? 'rejected' : 'requested',
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
        <Spin spinning={loading}>
            <div className='my-component'>


                <h1>
                    Total number of absences: {listAbsences.length}
                </h1>
                <RangePicker
                    onChange={handleDateFilterChange}
                    style={{ marginBottom: "16px" }}
                />
                <Table
                    columns={listAbsencesColumns}
                    dataSource={filteredDataSource}
                    rowKey="id"
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        width: "100%",
                    }}
                />

            </div>
        </Spin>
    )
}

export default Home;