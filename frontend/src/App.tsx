import { useState } from 'react';
import InputBox from './components/InputBox';
import NumberDisplay from './components/NumberDisplay';
import StackedExample from './components/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Thermometer from './components/Thermometer';
import RatioComponent from './components/Ratio';
import './App.css';
// import logo from './assets/Logo.png';

function App(): JSX.Element {
  const [number, setNumber] = useState<number | null>(null);
  const [ratioNegative, setRatioNegative] = useState<number | null>(null);
  const [ratioPositive, setRatioPositive] = useState<number | null>(null);  
  const [setTrendList] = useState<any | null>(null);

  const handleNumberReceived = (receivedNumber: number) => {
    console.log(receivedNumber);
    setNumber(receivedNumber);
  };

  const handleNegativeRatio = (receivedNumber: number) => {
    console.log(receivedNumber);
    setRatioNegative(receivedNumber);
  };

  const handlePositiveRatio = (receivedNumber: number) => {
    console.log(receivedNumber);
    setRatioPositive(receivedNumber);
  };

  const handleTrendList = (receivedList: any[]) => {
    console.log(receivedList);
    setTrendList(receivedList);
  };

  return (
    <div className='container'>
      <br/>
      {/* <img src={logo} alt="Logo" /> */}
      <InputBox headerText="Enter a YouTube URL below:" onNumberReceived={handleNumberReceived} ratioNegative={handleNegativeRatio} ratioPositive={handlePositiveRatio} trend_list={handleTrendList} />
      <br/> <br/>
      {number !== null && <NumberDisplay number={number} />}
      {number !== null && <StackedExample score={number} />}
      <br/>
      <br/>
      <div className='thermometer'>
       {number !== null && <Thermometer score={number} />}
      </div>
      <br/> <br/>
      <div>
        {ratioNegative !== null && ratioPositive !== null && <RatioComponent ratioNegative={ratioNegative} ratioPositive={ratioPositive}/>}
      </div>
    </div>
    
  );
}

export default App;
