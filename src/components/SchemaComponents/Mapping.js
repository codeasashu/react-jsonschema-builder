import SchemaItem from './SchemaItem';
import {SchemaObject} from './SchemaJson';

const mapping = (name, data, showEdit, showAdv, prefix=[]) => {
    name = name ?? 'root';
    console.log('mapping', name, data);
    if(!data || !data.hasOwnProperty('type')) {
        console.log('no data')
        return null;
    }
    switch (data.type) {
        case 'array':
            return null;
        case 'object':
            let nameArray = name === 'root' ?  [].concat([], prefix, 'properties') : [].concat(prefix, name, 'properties');
            return <SchemaObject name={name} prefix={nameArray} data={data} showEdit={showEdit} showAdv={showAdv} />;
        case 'string':
            return <SchemaItem
                        data={data}
                        name={name}
                        prefix={['properties']}
                        showEdit={showEdit}
                        showAdv={showAdv}
                    />;
        default:
            return null;
    }
};

export default mapping;