import React from 'react';

const Container = ({className="", children}) => {
    return (
        <div className={`${className} mx-auto container`}>
            {children}
        </div>
    );
};

export default Container;