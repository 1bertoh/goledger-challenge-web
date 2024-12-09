import TypingText from '@/components/typingText'
import { Input } from '@nextui-org/input'
import { useState } from 'react'
import { motion } from "framer-motion";
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { postUser } from '@/lib/utils';

const Login = () => {
  const [secondMessage, setSecondMessage] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [name, setName] = useState("")
  const route = useNavigate()

  const submitUserName= () => {
    const user = postUser(name)
    
    route('/artists')
  }

  return (
    <div className='h-[150vh] container'>
      <TypingText
        text="Beem-vindo a plataforma de stream Goledger!!"
        typingSpeed={100}
        className='font-extrabold text-6xl text-center block'
        doneCallBack={() => setSecondMessage(true)}
      />
      {
        secondMessage && (
          <div className='pt-20'>
            <TypingText
              text="Qual é o seu primeiro nome?"
              typingSpeed={100}
              className='font-extrabold text-3xl text-center block'
              doneCallBack={() => setShowInput(true)}
            />
          </div>
        )
      }
      {
        showInput && (
          <div
          >
            <motion.div
              className="pt-20" 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Input
                label="Nome"
                className='border-none focus:ring-0 focus:border-transparent'
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    "hover:bg-[#754F34]"
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    'bg-opacity-[0.17] bg-[#754F34] group-data-[focus=true]:bg-opacity-[0.17] data-[hover=true]:bg-opacity-[0.17]',
                    'group-data-[focus=true]:bg-[#754F34] data-[hover=true]:bg-[#754F34]',
                    'backdrop-blur-sm', 'shadow-lg',
                    'group-data-[focus=true]:shadow-sm'
                  ],
                  base: "data-[hover=true]:shadow-xl data-[focus=true]:shadow-xl"
                }}
              />
              <Button onClick={submitUserName}>Ok</Button>
            </motion.div>
          </div>
        )
      }
    </div>
  )
}

export default Login