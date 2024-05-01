import { Map } from 'ol';
import { PropsWithChildren, createContext } from 'react';

type Props = PropsWithChildren<{
    map: Map
}>

export const MapContext = createContext<Map | null>(null);

const MapProvider = (props: Props) => {
    const { map, children } = props
    return (
        <MapContext.Provider value={map}>
            {children}
        </MapContext.Provider>
    )
}

export default MapProvider