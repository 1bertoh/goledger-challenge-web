import { Input as NUInput } from '@nextui-org/input'

type Props = {
    onChange: (text:string) => any;
    value: string | number
    label: string
}

const Input = (props: Props) => {
    const {onChange, value, label} = props

    return (
        <NUInput
            className='border-none focus:ring-0 focus:border-transparent rounded-l-none'
            type="text"
            label={label}
            onChange={(e) => onChange(e.target.value)}
            value={String(value)}
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
    )
}

export default Input