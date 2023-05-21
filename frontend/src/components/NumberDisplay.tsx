interface NumberDisplayProps {
    number: number;
  }
  
  const NumberDisplay = ({ number }: NumberDisplayProps) => {
    return (
      <div>
        <h3>Usefulness rating (between -1 and 1) = {number.toFixed(3)}
        </h3>
      </div>
    );
  };
  
  export default NumberDisplay;