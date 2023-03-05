import { Table, DatePicker, Tag, Space, Button } from 'antd';
import { handleExportToOutlook } from '../../utils';
import moment from 'moment';
const { RangePicker } = DatePicker;


export const listAbsencesColumns = [
    {
        title: 'Name',
        dataIndex: 'name',

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
    },
    {
        title: 'Period',
        dataIndex: 'period',
    },
    {
        title: 'Member note',
        dataIndex: 'memberNote',
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
        }

    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Button onClick={() => handleExportToOutlook(record)}>Export to Outlook</Button>
        ),
    },
];

