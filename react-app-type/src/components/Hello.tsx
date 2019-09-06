import React from 'react';

interface Props {
    count?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
}

const Hello = ({ count = 0, onIncrement, onDecrement }: Props) => {
    console.log(count);

    return (
        <div className="hello">
            <div className="greeting">
                Hello {count}
            </div>
            <div>
                <button onClick={onDecrement}>-</button>
                <button onClick={onIncrement}>+</button>
            </div>
        </div>
    );
}

export default Hello;