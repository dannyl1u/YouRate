import Plot from 'react-plotly.js';

interface RatioProps {
    ratioNegative: number;
    ratioPositive: number;
}

const RatioComponent = ({ ratioNegative, ratioPositive }: RatioProps) => {

    return (
        <div>
            <h3>+/- Ratio</h3>
            <div>☺ Positive Comments: {ratioPositive}</div>
            <div>☹️ Negative Comments : {ratioNegative}</div>
            <Plot data={[
                {type: 'bar', x: ['Positive', 'Negative'], y: [ratioPositive, ratioNegative]}
            ]} />
            </div>
    )

};

export default RatioComponent;