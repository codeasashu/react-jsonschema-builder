import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import JsonSchemaEditor from './App';

render(
  <div>
    <JsonSchemaEditor
      showEditor={true}
      isMock={false}
      data={''}
      onChange={e => {
        console.log('changeValue', e);
      }}
    />
  </div>,
  document.getElementById('root')
);
