interface ProgressBarProps {
    score: number;
}

import ProgressBar from 'react-bootstrap/ProgressBar'
const StackedExample = ({ score }: ProgressBarProps) => {

    const min_value = -0.5;
    const max_value = 1;

    const scaled_value = (((score - min_value) / (max_value - min_value)) * 2) - 1

    const percentage = (scaled_value + 1) * 50;
    console.log(percentage);
    const percentageScrewed = (percentage*0.9);
    return (
        <ProgressBar>
        <ProgressBar striped variant="success" now={percentage} key={1} />
        {/* <ProgressBar variant="warning" now={100-percentage} key={2} /> */}
        <ProgressBar striped variant="danger" now={100-percentage} key={3} />
        </ProgressBar>
    );
}

export default StackedExample;