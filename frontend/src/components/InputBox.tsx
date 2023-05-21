import { ChangeEvent, useState } from 'react';

type trendDict = {
  date: string;
  score: number;
}

interface InputBoxProps {
    headerText: string;
    onNumberReceived: (number: number) => void;
    ratioPositive: (number: number) => void;
    ratioNegative: (number: number) => void; 
    trend_list: (list: trendDict[]) => void;
  }

  const InputBox = ({ headerText, onNumberReceived, ratioNegative, ratioPositive, trend_list }: InputBoxProps) => {
    const [inputValue, setInputValue] = useState('');
    // const [ratioPositive, setRatioPositive] = useState(0);
    // const [ratioNegative, setRatioNegative] = useState(0);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
      };

      const handleSubmit = () => {
        const isDevelopment = process.env.NODE_ENV === 'development';
        const baseURL = isDevelopment ? 'http://127.0.0.1:5000' : 'https://yourateapi.onrender.com';

        fetch(`${baseURL}/number?video_id=${encodeURIComponent(inputValue)}`)
          .then((response) => response.json())
          .then((data) => {
            onNumberReceived(data);
          })
          .catch((error) => {
            console.error(error);
          });

          fetch(`${baseURL}/ratio?video_id=${encodeURIComponent(inputValue)}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data.positive)
            ratioPositive(data.positive);
            ratioNegative(data.negative);
          })
          .catch((error) => {
            console.error(error);
          });


          fetch(`${baseURL}/trend?video_id=${encodeURIComponent(inputValue)}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            trend_list(data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
    
      return (
        <div>
          <h2>{headerText}</h2>
          <input  style={{ width: "500px" }}  type="text" onChange={handleChange} placeholder="e.g. https://www.youtube.com/watch?v=YHUv-oOMwRA&t=0s&ab_channel=REI" />
          <button onClick={handleSubmit}>Enter</button>
        </div>
      );
    };
    
    export default InputBox;    