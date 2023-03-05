import React, { useEffect, useState } from 'react';
import absences from '../../data/mock/absences.json';
import members from '../../data/mock/members.json';
import { Table, DatePicker, Spin } from 'antd';
import { listAbsencesColumns } from './listAbsencesColumns';
import './home.css'
import { createAbsencesListWithMembers, createMembersObjectByUserId } from './functions';
const { RangePicker } = DatePicker;

const Home = (props) => {

    const [listAbsences, setListAbsences] = useState([])
    const [dateFilter, setDateFilter] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // convert members array into object 
        const membersObject = createMembersObjectByUserId(members?.payload)
        // create a combine list of absences with members
        const listAbsencesWithMembers = createAbsencesListWithMembers(absences, membersObject)
        setListAbsences(listAbsencesWithMembers)
        setLoading(false)
    }, [])


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

    const tableStyle = {
        border: "1px solid #ccc",
        borderRadius: "8px",
        width: "100%",
    }

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
                    style={tableStyle}
                />
            </div>
        </Spin>
    )
}
export default Home;