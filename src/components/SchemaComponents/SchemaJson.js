import React, { Component } from 'react';

import './schemaJson.css';
import _ from 'underscore';
import { connect } from 'react-redux';
import mapping from './Mapping';
import SchemaItem from './SchemaItem';

class SchemaObjectComponent extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      _.isEqual(nextProps.data, this.props.data) &&
      _.isEqual(nextProps.prefix, this.props.prefix) &&
      _.isEqual(nextProps.open, this.props.open)
    ) {
      return false;
    }
    return true;
  }

  render() {
    const { name, data, prefix, showEdit, showAdv } = this.props;
    console.log("obj", data, prefix)
    return (
      <div className="object-style">
        <SchemaItem
            data={data}
            name={name}
            prefix={prefix}
            showEdit={showEdit}
            showAdv={showAdv}
        />
        {Object.keys(data.properties).map((name, index) => (
          <div key={index}>
            {mapping(name, data.properties[name], showEdit, showAdv, prefix)}
          </div>
        ))}
      </div>
    );
  }
}

export const SchemaObject = connect(state => ({
  open: state.schema.open
}))(SchemaObjectComponent);

export const SchemaJson = props => {
  const item = mapping(null, props.data, props.showEdit, props.showAdv, []);
  return <div className="schema-content">{item}</div>;
};
