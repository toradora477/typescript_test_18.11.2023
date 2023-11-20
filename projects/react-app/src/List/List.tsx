import React, { useState } from 'react';

import { Button, Flex, Space, Upload, message, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const List = () => {
  const [tableData, setTableData] = useState<any[]>([]);

  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const handleFileChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setTableData(jsonData);
      };

      reader.readAsBinaryString(info.file.originFileObj);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }; //* збереження даних

  const columns = Object.keys(tableData[0] || {}).map((key) => ({
    title: key,
    dataIndex: key,
    key,
  }));

  return (
    <Space>
      <Flex gap="middle" align="start" vertical>
        <Button type="primary">Primary Button</Button>

        <Upload customRequest={dummyRequest} onChange={handleFileChange} accept=".xlsx, .xls" showUploadList={false}>
          <Button icon={<UploadOutlined />}>Upload File</Button>
        </Upload>
        <Table dataSource={tableData} columns={columns} />
      </Flex>
    </Space>
  );
};

export default List;
