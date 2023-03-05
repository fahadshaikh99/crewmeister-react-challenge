import { Table, DatePicker, Tag, Space, Button } from 'antd';
import { handleExportToOutlook } from '../../utils';
import moment from 'moment';
const { RangePicker } = DatePicker;


export const listAbsencesColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '5%' // Set the width of the ID column to 10% of the table width
    },
    {
        title: 'Name',
        dataIndex: 'name',
        width: '15%'
    },
    {
        title: 'Absence',
        dataIndex: 'type',
        filters: [
            {
                text: 'sickness',
                value: 'sickness',
            },
            {
                text: 'vacation',
                value: 'vacation',
            },
        ],
        onFilter: (value, record) => record.type.indexOf(value) === 0,
        width: '15%',
    },
    {
        title: 'Period',
        dataIndex: 'period',
        width: '15%'
    },
    {
        title: 'Member note',
        dataIndex: 'memberNote',
        width: '15%'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        rowClassName: (record) => {
            return (
                <Tag color={'orange'} key={1}>
                    {record}
                </Tag>
            )
        },
        filters: [
            {
                text: 'Confirmed',
                value: 'Confirmed',
            },
            {
                text: 'Rejected',
                value: 'Rejected',
            },
            {
                text: 'Requested',
                value: 'Requested',
            },
        ],
        onFilter: (value, record) => record.status.indexOf(value) === 0,
        rowClassName: (record) => {
            return (
                <Tag color={'orange'} key={1}>
                    {record}
                </Tag>
            )
        },
        width: '15%'

    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Button onClick={() => handleExportToOutlook(record)}>Export to Outlook</Button>
        ),
        width: '15%'
    },
];

