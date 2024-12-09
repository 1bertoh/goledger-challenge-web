import { Card as NUICard, CardBody as NUICardBody } from "@nextui-org/react"


type Props = {
    children: JSX.Element
}

const Card = (props: Props) => {
    const {children} = props
  return (
    <div>
        <NUICard className="border-none bg-[#754F34] backdrop-blur-sm shadow-sm bg-opacity-[0.17]">
            <NUICardBody>
                {children}
            </NUICardBody>
        </NUICard>
    </div>
  )
}

export default Card