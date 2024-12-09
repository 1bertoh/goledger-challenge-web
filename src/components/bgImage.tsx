import SVGGuy from '@/assets/guy'
import SVGTape from '@/assets/tape'
import { Music, Music2 } from 'lucide-react'
import { motion } from 'framer-motion';

const BgImage = () => {
    return (
        // <div className='fixed bottom-0 w-full '>
        <>
            <div className='fixed z-10' style={{ left: 5, bottom: 45 }}>
                <SVGTape />
            </div>
            <div className='fixed bottom-0 z-10' style={{ right: -70 }}>
                <div className='relative w-fit'>
                    <SVGGuy />
                    <motion.span
                        className='absolute'
                        style={{ left: 90, top: 40 }}
                        animate={{
                            y: [100, 0],
                            x:[0, 5, -5, 0],
                            opacity: [0, 2, 1, 0]
                        }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                    >
                        <Music size={50} />
                    </motion.span>
                    <motion.span
                        className="absolute"
                        style={{ top: 60, right: 90 }}
                        animate={{
                            y: [50, -20],
                            x:[0, -5, 5, 0],
                            opacity: [0, 2, 1, 0]
                        }}
                        transition={{
                            duration: 1, repeat: Infinity, ease: "linear", delay: 1, repeatDelay: 1
                        }}
                    >
                        <Music2 size={60} />

                    </motion.span>

                </div>
            </div>
        </>
        // </div>
    )
}

export default BgImage