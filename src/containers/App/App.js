import React from 'react';


const App = ({ children }) => {
  return (
    <div>
      <div className="container">
        {children}
      </div>
    </div>
  );
};

App.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default App;
