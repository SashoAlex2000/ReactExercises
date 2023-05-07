import React from 'react';


const Demo = (props) => {
  return <p> {props.show ? 'This is conditional' : ''} </p>
};

// memo makes Demo re-exucute from upper chains, only if its props changed
// so with show={false} it will not be re-evaluated
// also will children will be spared for re-execution
// but also has performance cost - React has to keep old props and compare them
// 'cuts' off an entire branch
export default React.memo(Demo);
