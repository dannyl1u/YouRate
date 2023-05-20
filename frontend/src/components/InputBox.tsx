import { ChangeEvent, useState } from 'react';


interface InputBoxProps {
    headerText: string;
    onNumberReceived: (number: number) => void;
  }

  const InputBox = ({ headerText, onNumberReceived }: InputBoxProps) => {
    const [inputValue, setInputValue] = useState('');

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
      };
    
      return (
        <div>
          <h2>{headerText}</h2>
          <input type="text" onChange={handleChange} placeholder="Enter below" />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      );
    };
    
    export default InputBox;    