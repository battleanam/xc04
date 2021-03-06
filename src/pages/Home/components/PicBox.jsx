import React, { Component } from 'react';
import { reduce } from 'lodash';
import { getMarks } from '../service';
import cn from 'classnames';

import { Card, message, Popover } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import styles from './components.less';
import util from '@/styles/util.less';
import PicAnalysis from '@/pages/Home/components/PicAnalysis';

function HasLabel() {
  return (
    <div className={styles.hasLabel}>
      <CheckOutlined/>
    </div>
  );
}

class PicBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imgLoading: true,
      img: null,
      tableLoading: true,
      tableSource: [],
    };

    const { src, filename, insectStyles } = props;
    this.loadPic(src);
    this.loadTableSource(filename, insectStyles);
  }

  loadPic(src) {
    const img = new Image();
    img.onload = () => {
      this.setState({ img, imgLoading: false });
    };
    img.src = src;
  }

  loadTableSource(filename, styles) {
    getMarks(filename).then(({ Code, data }) => {
      if (Code === 1000) {
        const { anno } = JSON.parse(data);
        const { shapes } = JSON.parse(anno);
        this.setState({
          shapes,
          tableSource: this.analysis(shapes, styles),
          tableLoading: false,
        });
      } else {
        this.setState({
          tableSource: [],
          tableLoading: false,
        });
      }
    }).catch(() => {
      this.setState({
        tableSource: [],
        tableLoading: false,
      });
    });
  }

  /**
   * 将图片上的标注框按虫种类别进行分类统计
   * @param shapes 标注框列表
   * @param styles 标注样式字典
   * @returns {unknown[]}
   */
  analysis(shapes, styles) {
    const obj = reduce(shapes, (result, shape) => {
      const { label } = shape;
      const count = result[label] ? result[label].count + 1 : 1;
      return {
        ...result,
        [label]: {
          ...shape,
          count,
          ...styles[label],
        },
      };
    }, {});
    return Reflect.ownKeys(obj).map(key => ({
      ...obj[key],
    }));
  }

  render() {
    const { src, filename, name, onClick } = this.props;
    const { imgLoading, tableSource } = this.state;
    return (
      <>
        <Popover
          placement={'rightTop'}
          content={<PicAnalysis source={tableSource}/>}
          overlayClassName={'noPadding'}
          mouseEnterDelay={.4}
        >
          <Card
            hoverable={true}
            className={styles.PicBox}
            onClick={() => {
              if (imgLoading) {
                message.info('正在加载图片，请稍候');
              } else {
                onClick();
              }
            }}
            loading={imgLoading}
            cover={
              !imgLoading &&
              <img
                src={src}
                alt={filename}
                style={{
                  width: 'calc(100% - 2px)',
                  marginLeft: '1px',
                }}
              />
            }
            bodyStyle={{ padding: 0 }}
          >
            <div className={cn(styles.analysis, util.customScrollBar, util.clearFix)}>
              <div className={styles.noData}>{name}</div>
            </div>
            {tableSource.length > 0 && <HasLabel/>}
          </Card>
        </Popover>
      </>
    );
  }
}

export default PicBox;
