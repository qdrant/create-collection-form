import React from 'react';
import PropTypes from 'prop-types';


const Description = ({ config, stepData, onChange }) => {

    // todo: add labelId and id
    return (
        <>
            {config.description}
        </>
    );
};

// props validation
Description.propTypes = {
    config: PropTypes.shape({
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    stepData: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};


export default Description;
