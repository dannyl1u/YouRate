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
        fetch(`http://127.0.0.1:5000/number?video_id=${encodeURIComponent(inputValue)}`)
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