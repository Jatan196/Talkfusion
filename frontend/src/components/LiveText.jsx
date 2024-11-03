import React, { useEffect, useState } from 'react';

const texts = ["Welcome to TalkFusionn", "Connect with friends", "Secure and Fast"];

const LiveText = () => {
    const [index, setIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handle = setInterval(() => {
            setDisplayedText(prev => {
                if (!isDeleting) {
                    const newText = texts[index].substring(0, prev.length + 1);
                    if (newText === texts[index]) { // means sentence is now completed,so start deleting it
                        setIsDeleting(true);
                    }
                    return newText;
                } else {
                    const newText = texts[index].substring(0, prev.length - 1);
                    if (newText === '') { // displayed text is now null,so stop deleting,and increment index count(next sentence)
                        setIsDeleting(false);
                        setIndex((index + 1) % texts.length);
                    }
                    return newText;
                }
            });
        }, 90);

        return () => clearInterval(handle);
    }, [index, isDeleting]);

    return (
        <h1 className="text-6xl font-bold text-center my-10 drop-shadow-2xl" >
            {displayedText}
            <span className="border-r-2 border-white animate-blink" />
        </h1>
    );
}

export default LiveText;
