interface NumberDisplayProps {
    number: number;
  }
  
  const NumberDisplay = ({ number }: NumberDisplayProps) => {
    return (
      <div>
        <h3>Score (-1 is bad, 1 is good): 
          <br/>
          {number}
        </h3>
      </div>
    );
  };
  
  export default NumberDisplay;