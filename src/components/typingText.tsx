import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

type TProps = {
    text: string;
    typingSpeed: number
    className?: React.HTMLAttributes<HTMLSpanElement>['className']
    doneCallBack?: () => void
}

const TypingText = (props: TProps) => {
    const { text, className, typingSpeed, doneCallBack } = props
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            if (index < text.length - 1) {
                setDisplayedText((prev) => {
                    return prev + text[index]
                });
                index = index + 1;
            } else {
                clearInterval(interval);
                doneCallBack && doneCallBack()
            }
        }, typingSpeed);
        
        return () => clearInterval(interval);
    }, [text, typingSpeed]);
    
    useEffect(() => {

    }, [displayedText])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <span className={className}>
                <span>{displayedText}</span>
                <motion.span
                    // className={`animate-pulse`}
                    animate={{opacity: [0, 1]}}
                    transition={{duration: 1, repeat: Infinity,  type: "spring"}}
                >|</motion.span>
            </span>
        </motion.div>
    );
};

export default TypingText