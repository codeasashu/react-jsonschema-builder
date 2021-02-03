import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {Popover, Radio, Button} from 'antd';
import { SCHEMA_TYPE } from '../../utils.js';

export default class FieldSelector extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
  }

  handleChange = e =>{
    const { onChange } = this.props;
    console.log("lol", e.target.value)
    onChange(e.target.value);
  }

  getContent = () => {
      const { value } = this.props;
      return (
        <Radio.Group value={value.type} onChange={this.handleChange}>
        {SCHEMA_TYPE.map((item, index) => {
            return (
                <Radio.Button key={index} value={item}>{item}</Radio.Button>
            );
        })}
        </Radio.Group>
      );
  }


  render() {
    const template = this.getContent();
    const { value } = this.props;
    return (
        <Popover trigger="click" content={template} title="Select type">
            <Button type="link">{value.type}</Button>
        </Popover>
    )
  }
}
