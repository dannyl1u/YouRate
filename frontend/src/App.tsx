import React, { useState } from 'react';
import InputBox from './components/InputBox';
import NumberDisplay from './components/NumberDisplay';
import 'bootstrap/dist/css/bootstrap.css';



function App(): JSX.Element {
  const [number, setNumber] = useState<number | null>(null);

  const handleNumberReceived = (receivedNumber: number) => {
    console.log(receivedNumber);
    setNumber(receivedNumber);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <InputBox headerText="Enter below:" onNumberReceived={handleNumberReceived} />
      {number !== null && <NumberDisplay number={number} />}
    </div>

  );
}

export default App;
