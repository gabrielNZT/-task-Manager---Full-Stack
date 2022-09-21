import { Button, Popconfirm, Table, Space, Input } from 'antd';
import { filter, EditableRow, EditableCell } from './utils/index.js'
import React, { useEffect, useState, useRef, useReducer } from 'react';
import AppBar from '../../dashboard/appbar/index.js'
import { deleteUser, getUsers, updateUser } from '../../service/requests.js'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import RegisterModal from './modal/index.js';
import { reducer } from './reducer.js';
import { useNavigate } from 'react-router-dom';
import Notify from '../../dashboard/modal/notification/error.js';

const UserList = () => {
  const [state, dispatch] = useReducer(reducer, { users: [] });
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const searchInput = useRef(null);

  let navigate = useNavigate()

  function GoToHome() {
    navigate('../', { replace: true });
    Notify('INVALIDE_ROUTE')
  }

  useEffect(() => {
    getUsers(tableParams).then(response => {
      dispatch({ type: 'FETCH_DATA', payload: response.data.users })
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: response.data.totalCount, // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      })
    })
      .catch(() => GoToHome())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(tableParams)]);


  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const handleDelete = (record) => deleteUser(record.id).then(dispatch({ type: 'DELETE_USER', payload: record }));

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
    setSearchedColumn('')
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const defaultColumns = [
    {
      title: 'Username',
      dataIndex: 'username',
      width: '30%',
      editable: true,
      ...getColumnSearchProps('username'),
      sorter: (a, b) => a.username.localeCompare(b.username),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Role',
      dataIndex: 'adm',
      render: (adm) => `${adm ? 'admin' : 'user'}`,
      filters: [
        {
          text: 'Admin',
          value: "admin",
        },
        {
          text: 'User',
          value: "user",
        },
      ],
      onFilter: (value, record) => filter(value, record),
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: true,
      ...getColumnSearchProps('email'),
      sorter: (a, b) => a.username.localeCompare(b.username),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'DELETAR',
      render: (_, record) =>
        state.users.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
            <a href='/users' style={{ color: 'red' }}>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleSave = (row) => updateUser(row).then(dispatch({ type: 'UPDATE_USER', payload: row }));

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <AppBar />
      <Table
        components={components}
        rowKey={(record) => record.id}
        rowClassName={() => 'editable-row'}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        bordered
        dataSource={state.users}
        columns={columns}
      />
      <RegisterModal dispatch={dispatch} />
    </div>
  );
};

export default UserList;