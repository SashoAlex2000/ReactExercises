import React, { useCallback, useState } from 'react';

import './App.css';
import Button from './components/UI/Button/Button';
import Demo from './components/Demo/Demo';

function App() {

  // React re-renders only if state, props or context change
  // it all comes down to state eventually 
  // re-runs when state is changed, but renders only what is different to previous state
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  // useCallback makes React store the function and reuse the same function object
  // poits to same place in memory
  const toggleVisibility = useCallback(() => {
    // JS closes over tht const and stores it and uses the first value;
    // with useCallback it stores excatly the first iteration
    if (allowToggle) {
      setShowParagraph((previousState) => !previousState);
    }
  }, [
    setShowParagraph, // not necessary to be incuded, guaranteed by React
    allowToggle, // whenever toggle accessibility changes, recreate the func
  ]);
  
  const toggleAccessibilityHandler = () => {
    setAllowToggle(true)
  }

  // if the parent changes, it makes React rerun through all of its child components,
  // even if there isn't new state passed through props
  return (
    <div className="app">
      <h1>Hi there!</h1>
      <Demo show={showParagraph}/>

      <Button onClick={toggleAccessibilityHandler}>
        Allow toggling
      </Button>

      {/* the function is always different, compared props values, since those are reference values */}
      <Button onClick={toggleVisibility}>
          {showParagraph ? 'HIDE' : 'SHOW'}
      </Button>
    </div>
  );
}

export default App;
