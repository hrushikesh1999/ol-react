import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{}>

const Controls = ({ children }: Props) => {
    return (
        <>{children}</>
    )
}

export default Controls