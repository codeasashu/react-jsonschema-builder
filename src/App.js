import * as React from 'react';
import autobind from 'autobind-decorator';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { getModel } from './store';
import JsonSchemaApp from './JsonSchemaApp.js'

@autobind
class JsonSchemaEditor extends React.Component {

  render() {
    let { config } = this.props;
    let model = getModel(config);
    let store = model.getStore();

    return (
        <Provider store={store} className="wrapper">
            <JsonSchemaApp Model={model} {...this.props} />
        </Provider>
    )
  }
}

JsonSchemaEditor.propTypes = {
  data: PropTypes.string,
  onChange: PropTypes.func,
  showEditor: PropTypes.bool
}

export default JsonSchemaEditor;
