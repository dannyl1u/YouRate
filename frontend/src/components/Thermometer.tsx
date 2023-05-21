import { Chart } from 'react-google-charts';
import '../App.css'

interface ThermometerProps {
    score: number;
}

const Thermometer = ({ score }: ThermometerProps) => {
    // Define the data and options for the gauge chart
    const converted_score = ((score+1)/2) * 100;
    console.log(converted_score)
    const data = [
      ['Label', 'Value'],
      ['', converted_score],
    ];
  
    const options = {
      minorTicks: 5,
    };
  
    return (
<div className='thermometer'>
      <Chart
        chartType="Gauge"
        data={data}
        options={options}
      />
    </div>
     
    );
  };
  
  export default Thermometer;