import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import JsonSchemaEditor from './App';

const initialDataObj = {"type": "object","properties": {"field_3": {
  "type": "string"}}}

const initialDataStr = {"type": "string"}

const test3 = {
  "type": "object",
  "properties": {
    "field_3": {
      "type": "object",
      "properties": {
        "field_1": {
          "type": "string"
        }
      },
      "required": [
        "field_1"
      ]
    }
  }
};

render(
  <div>
    <JsonSchemaEditor
      showEditor={true}
      isMock={false}
      data={JSON.stringify(initialDataObj)}
      onChange={e => {
        console.log('changeValue', e);
      }}
    />
  </div>,
  document.getElementById('root')
);
