import { Table, DatePicker, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
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
        }

    },
];

