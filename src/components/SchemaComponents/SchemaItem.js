import React, { PureComponent } from 'react';
import autobind from 'autobind-decorator';

import {
  Row,
  Col,
  Checkbox,
  message,
  Tooltip
} from 'antd';
import {
  PlusCircleOutlined, DeleteOutlined,
  SettingOutlined,
  CaretDownOutlined, CaretRightOutlined
} from '@ant-design/icons';

import mapping from './Mapping';
import FieldInput from './FieldInput'
import FieldSelector from './FieldSelector'

import _ from 'underscore';
import PropTypes from 'prop-types';
import { JSONPATH_JOIN_CHAR } from '../../utils.js';
import LocaleProvider from '../LocalProvider/index.js';

@autobind
class SchemaItem extends PureComponent {
    constructor(props, context) {
      super(props);
      this._tagPaddingLeftStyle = {};
      // this.num = 0
      this.Model = context.Model.schema;
    }
  
    componentWillMount() {
      const { prefix } = this.props;
      let length = prefix.filter(name => name !== 'properties').length;
      this.__tagPaddingLeftStyle = {
        paddingLeft: `${20 * (length + 1)}px`
      };
    }
  
    getPrefix() {
      let {prefix, name} = this.props;
      if(name === 'root') return [];
      return [].concat(prefix, name);
    }
  
    // 修改节点字段名
    handleChangeName = e => {
      const { data, prefix, name } = this.props;
      let value = e.target.value;
  
      if (data.properties[value] && typeof data.properties[value] === 'object') {
        return message.error(`The field "${value}" already exists.`);
      }
  
      this.Model.changeNameAction({ value, prefix, name });
    };
  
    // 修改备注信息
    handleChangeDesc = e => {
      let prefix = this.getPrefix();
      let key = [].concat(prefix, 'description');
      let value = e.target.value;
      this.Model.changeValueAction({ key, value });
    };
  
    // 修改mock 信息
    handleChangeMock = e => {
      let prefix = this.getPrefix();
      let key = [].concat(prefix, `mock`);
      let value = e ? { mock: e } : '';
      this.Model.changeValueAction({ key, value });
    };
  
    handleChangeTitle = e => {
      let prefix = this.getPrefix();
      let key = [].concat(prefix, `title`);
      let value = e.target.value;
      this.Model.changeValueAction({ key, value });
    }
  
    // 修改数据类型
    handleChangeType = e => {
      let prefix = this.getPrefix();
      let key = [].concat(prefix, 'type');
      this.Model.changeTypeAction({ key, value: e });
    };
  
    // 删除节点
    handleDeleteItem = () => {
      const { prefix, name } = this.props;
      let nameArray = this.getPrefix();
      this.Model.deleteItemAction({ key: nameArray });
      this.Model.enableRequireAction({ prefix, name, required: false });
    };
    /*
    展示备注编辑弹窗
    editorName: 弹窗名称 ['description', 'mock']
    type: 如果当前字段是object || array showEdit 不可用
    */
    handleShowEdit = (editorName, type) => {
      const { data, name, showEdit } = this.props;
  
      showEdit(this.getPrefix(), editorName, data.properties[name][editorName], type);
    };
  
    // 展示高级设置弹窗
    handleShowAdv = () => {
      const { data, name, showAdv } = this.props;
      showAdv(this.getPrefix(), data.properties[name]);
    };
  
    //  增加子节点
    handleAddField = () => {
      const { prefix, name } = this.props;
      this.Model.addFieldAction({ prefix, name });
    };
  
    // 控制三角形按钮
    handleClickIcon = () => {
      let prefix = this.getPrefix();
      // 数据存储在 properties.xxx.properties 下
      let keyArr = [].concat(prefix, 'properties');
      this.Model.setOpenValueAction({ key: keyArr });
    };
  
    // 修改是否必须
    handleEnableRequire = e => {
      const { prefix, name } = this.props;
      let required = e.target.checked;
      // this.enableRequire(this.props.prefix, this.props.name, e.target.checked);
      this.Model.enableRequireAction({ prefix, name, required });
    };

    handleAddChild = e => {
      // const { prefix } = this.props;
      let prefixArr = this.getPrefix();
      let key = [].concat(prefixArr, 'properties');
      this.Model.setOpenValueAction({ key, value: true });
      this.Model.addChildFieldAction({ key });
    }
  
    render() {
      let { name, data, showEdit, showAdv } = this.props;
      let showIcon = data.hasOwnProperty('properties');

      console.log('item', name, data)
      
      return (
        <div>
          <Row type="flex" justify="left" align="middle">
            <Col
              span={8}
              className="col-item name-item col-item-name"
              style={this.__tagPaddingLeftStyle}
            >
              <Row type="flex" justify="space-around" align="middle">
              <Col span={1} className="down-style-col">
                {data.type === 'object' && (
                  <span className="add-item" onClick={this.handleAddChild}>
                    <PlusCircleOutlined />
                  </span>
                )}
                </Col>
                <Col span={20}>
                  <FieldInput
                    onChange={this.handleChangeName}
                    value={name}
                  />
                </Col>
              </Row>
            </Col>
  
  
            <Col span={3} className="col-item col-item-type">
              <FieldSelector value={data} onChange={this.handleChangeType} />
            </Col>
  
            <Col span={this.context.isMock ? 2: 3}  className="col-item col-item-setting">
              <span className="adv-set">
                <Tooltip placement="top" title={LocaleProvider('required')}>
                  <Checkbox
                    onChange={this.handleEnableRequire}
                    checked={
                      _.isUndefined(data.required) ? false : data.required.indexOf(name) !== -1
                    }
                />
              </Tooltip>
              </span>
              <span className="adv-set" onClick={this.handleShowAdv}>
                <Tooltip placement="top" title={LocaleProvider('adv_setting')}>
                  <SettingOutlined />
                </Tooltip>
              </span>
              <span className="delete-item" onClick={this.handleDeleteItem}>
                <DeleteOutlined />
              </span>
              {data.type === 'object' && (
                <span className="delete-item" onClick={this.handleClickIcon}>
                  {showIcon ? (
                    <CaretDownOutlined />
                  ) : (
                    <CaretRightOutlined />
                  )}
                </span>
              )}
            </Col>
          </Row>
          {/* <div className="option-formStyle">{mapping(this.getPrefix(), data, showEdit, showAdv)}</div> */}
        </div>
      );
    }
}
  
SchemaItem.contextTypes = {
  getOpenValue: PropTypes.func,
  Model: PropTypes.object,
  isMock: PropTypes.bool
};

export default SchemaItem;