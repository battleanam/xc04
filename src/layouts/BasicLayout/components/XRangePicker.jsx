import React, { Component } from 'react';
import { Radio, DatePicker } from 'antd';
import moment from 'moment';

import styles from './components.less';

const { RangePicker } = DatePicker;

class XRangePicker extends Component {

  constructor(props) {
    super(props);
    this.onMonthChange = this.onMonthChange.bind(this);
    const { value } = props;
    this.onMonthChange(value ? value[0] : moment());
  }

  onMonthChange(e) {
    const { onChange } = this.props;
    e.startOf('month');
    const start = e.format('YYYY-MM-DD');
    e.endOf('month');
    const end = e.format('YYYY-MM-DD');
    onChange([moment(start), moment(end)]);
  }

  render() {

    const { value, unit, unitChange, onChange } = this.props;

    return (
      <div className={styles.XRangePicker}>

        <Radio.Group
          className={styles.unitSelector}
          value={unit}
          onChange={unit => {
            unitChange(unit.target.value);
          }}
          size={'small'}
          buttonStyle="solid"
        >
          <Radio.Button value="month">按月</Radio.Button>
          <Radio.Button value="day">按日</Radio.Button>
        </Radio.Group>
        {
          unit === 'day' ?
            <RangePicker
              value={value}
              onChange={onChange}
              size={'small'}
              format={'YYYY年MM月DD日'}
              allowClear={false}
            /> :
            <DatePicker
              picker={unit}
              value={value[0]}
              onChange={this.onMonthChange}
              size={'small'}
              format={'YYYY年MM月'}
              allowClear={false}
            />
        }

      </div>
    );
  }
}

export default XRangePicker;
