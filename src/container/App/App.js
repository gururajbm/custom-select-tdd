
import React from "react";

import CustomSelect from './../../component/customSelect/customSelect';

const App = () => {

    const selectOptions = [
        {'label': 'testuser', 'value': '100'},
        {'label': 'abcd', 'value': '200'},
        {'label': 'xyz', 'value': '300'}
    ];
    return (
        <div>
            <CustomSelect
                options={selectOptions}
            ></CustomSelect>
        </div>
    );
};

export default App;
  
  