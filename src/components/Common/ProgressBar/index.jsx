import React from 'react';

const ProgressBar = ({progress}) => {

  const containerStyles = {
    height: 4,
    width: '100%',
    backgroundColor: '#d3d8dc',
    borderRadius: 1
  }

  const fillerStyles = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: "#00a884",
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  return (
      <div style={containerStyles}>
        <div style={fillerStyles}/>
      </div>
  );
};

export default ProgressBar;