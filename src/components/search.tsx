import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/react'
import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

const Search = (props: Props) => {
    const [name, setName] = useState("")
    
    return (
        <form className='container flex items-center' >
            <Button className='rounded-r-none border-none bg-[#754F34] backdrop-blur-sm shadow-xl bg-opacity-[0.17] py-6' >
                <SearchIcon/>
            </Button>
            <Input
                className='border-none focus:ring-0 focus:border-transparent rounded-l-none'
                type="text"
                readOnly
                onChange={(e) => setName(e.target.value)}
                value={name}
                classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        "hover:bg-[#754F34] rounded-l-none"
                    ],
                    innerWrapper: "bg-transparent rounded-l-none",
                    inputWrapper: [
                        'bg-opacity-[0.17] bg-[#754F34] group-data-[focus=true]:bg-opacity-[0.17] data-[hover=true]:bg-opacity-[0.17] ',
                        'group-data-[focus=true]:bg-[#754F34] data-[hover=true]:bg-[#754F34]',
                        'backdrop-blur-sm', 'shadow-lg',
                        "rounded-l-none"
                    ],
                    base: "data-[hover=true]:shadow-xl data-[focus=true]:shadow-xl rounded-l-none"
                }}
            />
        </form>
    )
}

export default Search