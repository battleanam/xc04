import React from 'react';
import cn from 'classnames';

import { Table } from 'antd';

import styles from './components.less';
import util from '@/styles/util.less';

const columns = [
  {
    title: '标注样式',
    dataIndex: 'style',
    key: 'style',
    render: (text, {color, weight = 1}) => (
      <div className={styles.previewBox} style={{borderColor: color, borderWidth: weight + 'px'}} />
    ),
  },
  {
    title: '害虫种类',
    dataIndex: 'bugName',
    key: 'bugName',
  },
  {
    title: '已标注数量',
    dataIndex: 'count',
    key: 'count',
  },
];

const PicAnalysis = ({ source }) => {
  return (
    <div className={cn(styles.PicAnalysis, util.customScrollBar)}>
      <Table
        columns={columns}
        dataSource={source}
        size={"small"}
        pagination={false}
        mouseEnterDelay={10}
      />
    </div>
  );
};

export default PicAnalysis;
