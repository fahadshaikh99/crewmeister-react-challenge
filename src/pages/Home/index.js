import React, { useEffect, useState } from 'react';
import absences from '../../data/mock/absences.json';
import members from '../../data/mock/members.json';
import { Table, DatePicker, Spin, Typography } from 'antd';
import { listAbsencesColumns } from './listAbsencesColumns';
import './home.css'
import { createAbsencesListWithMembers, createMembersObjectByUserId } from './functions';
import { lang } from '../../languages';
const { Text } = Typography;
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

    const pagination = {
        showTotal: (total, range) => `${range[0]}-${range[1]} ${lang.of} ${total} ${lang.absences}`,
    };

    return (
        <Spin spinning={loading}>
            <div className='home-component'>
                <Text code>{lang.filter_by_date}</Text>
                <RangePicker
                    onChange={handleDateFilterChange}
                    style={{ marginBottom: "16px", marginTop: "4px" }}
                />
                <Table
                    pagination={pagination}
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