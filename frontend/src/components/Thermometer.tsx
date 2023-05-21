import { Chart } from 'react-google-charts';

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
      width: 400,
      height: 120,
      redFrom: -1,
      redTo: -0.5,
      yellowFrom: -0.5,
      yellowTo: 0,
      greenFrom: 0,
      greenTo: 0.5,
      blueFrom: 0.5,
      blueTo: 1,
      minorTicks: 5,
    };
  
    return (
      <Chart
        chartType="Gauge"
        data={data}
        options={options}
        width="100%"
        height="100%"
        className='thermometer'
      />
    );
  };
  
  export default Thermometer;