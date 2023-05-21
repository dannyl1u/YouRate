import React, { useState } from 'react';
import InputBox from './components/InputBox';
import NumberDisplay from './components/NumberDisplay';
import StackedExample from './components/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Thermometer from './components/Thermometer';

function App(): JSX.Element {
  const [number, setNumber] = useState<number | null>(null);

  const handleNumberReceived = (receivedNumber: number) => {
    console.log(receivedNumber);
    setNumber(receivedNumber);
  };

  return (
    <div className='appContainer'>
      <InputBox headerText="Enter a YouTube URL below:" onNumberReceived={handleNumberReceived} />
      <br/>
      {number !== null && <NumberDisplay number={number} />}
      <br/>
      {number !== null && <StackedExample score={number} />}
      <br/>
      <div className='thermometer'>
        {number !== null && <Thermometer score={number} />}
      </div>
    </div>
    
  );
}

export default App;
