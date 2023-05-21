type ButtonProps = {
    onClick: () => void;
    title: string;
};

export default function Button({ onClick, title }: ButtonProps) {
    return (
        <button className="button" onClick={onClick}>
            {title}
        </button>
    );
}