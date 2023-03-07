import { Tag, Button } from 'antd';
import { handleExportToOutlook } from '../../utils';


export const listAbsencesColumns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        width: '5%',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        width: '10%'
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
        width: '10%'
    },
    {
        title: 'Member note',
        dataIndex: 'memberNote',
        width: '15%'
    },
    {
        title: 'Admitter note',
        dataIndex: 'admitterNote',
        width: '15%'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (record) => {
            let color = 'green'
            if (record == 'confirmed') color = 'green'
            else if (record == 'requested') color = 'blue'
            else if (record == 'rejected') color = 'red'
            else color = 'orange'
            return (
                <Tag color={color} key={1}>
                    {record.toUpperCase()}
                </Tag>
            )
        },
        filters: [
            {
                text: 'Confirmed',
                value: 'confirmed',
            },
            {
                text: 'Rejected',
                value: 'rejected',
            },
            {
                text: 'Requested',
                value: 'requested',
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

