import React, { useState } from 'react';

const About: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <>
            <div className="count-view">{count}</div>
            <button onClick={() => setCount(count - 1)}>onIncrement</button>
            <button onClick={() => setCount(count + 1)}>onDecrement</button>
        </>
    );
}

export default About;