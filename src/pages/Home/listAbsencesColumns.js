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
        title: 'period',
        dataIndex: 'period',
        key: 'period',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <RangePicker
                    value={selectedKeys}
                    onChange={(dates) => setSelectedKeys(dates)}
                    onOk={confirm}
                    onClear={() => {
                        setSelectedKeys([]);
                        clearFilters();
                    }}
                />
                <Space>
                    <button onClick={() => confirm()}>Filter</button>
                    <button onClick={() => clearFilters()}>Reset</button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <Tag color={filtered ? 'blue' : 'default'} style={{ marginRight: 0 }}>
                Filter
            </Tag>
        ),
        onFilter: (value, record) => {

            const [startDate, endDate] = record;
            return new Date(record?.startDate) >= startDate && new Date(record?.endDate) <= endDate;

        },
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
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Button onClick={() => handleExportToOutlook(record)}>Export to Outlook</Button>
        ),
    },
];

