import { Button as NUIButton } from "@nextui-org/react"

type Props = {
    type: "success" | "danger";
    text: string;
    callback: () => void
}

const Button = (props: Props) => {
    const { callback, text, type } = props

    return (
        <NUIButton
            onClick={callback}
            className="bg-[#34e059] backdrop-blur-sm shadow-sm bg-opacity-[1] border-[#00DD7D]"
        //    style={{boxShadow: "rgba(13, 230, 9, 1) 10px 10px 31px -3px"}}
        >
            {text}
        </NUIButton>
    )
}

export default Button