import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{}>

const Layers = ({ children }: Props) => {
    return (
        <>{children}</>
    )
}

export default Layers