interface ProgressBarProps {
    score: number;
}

import ProgressBar from 'react-bootstrap/ProgressBar'
const StackedExample = ({ score }: ProgressBarProps) => {

    const percentage = (score + 1) * 50;
    console.log(score)
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