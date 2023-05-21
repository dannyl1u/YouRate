import { ChangeEvent, useState } from 'react';
import SearchBar from './base/SearchBar';

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
    
        <div className="custom" style={{ outline: "none", display: "flex", justifyContent: "center", position: "absolute", top: "0", right: "0", left: "0" }}>
            <div className="row no-gutters mt-3 align-items-center">
                <div className="col col-md-50">
                    <input 
                        className="form-control border-secondary rounded-pill mr-1 pr-5"
                        type="search"
                        value="search"
                        id="example-search-input2"
                        style={{ outline: "none", width: "35rem" }}
                    />
                </div>
                    <div className="custom">
                        <button className="btn btn-outline-light text-dark border-0 rounded-pill ml-n5" type="button">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
            </div>
        </div>
          
        
      );
     };
    
    export default InputBox;