import { useState, useEffect, useContext } from 'react'
import LayerTile from "ol/layer/Tile";
import { MapContext } from '../MapProvider';

type Props = {
    initialSource?: any;
    zIndex?: number;
    visible?: boolean;
    source?: any
}

const TileLayer = (props: Props) => {
    const { initialSource, zIndex = 0, visible, source } = props
    const map = useContext(MapContext);
    const [tileLayer] = useState<LayerTile<any>>(new LayerTile({ source: source ?? initialSource, zIndex, visible }))

    useEffect(() => {
        if (!map) return;

        map.addLayer(tileLayer);
        tileLayer.setZIndex(zIndex);

        return () => {
            if (map) {
                map.removeLayer(tileLayer);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map])

    // visible change handler
    useEffect(() => {
        if (visible !== undefined) tileLayer.setVisible(visible)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible])

    useEffect(() => {
        if (source) tileLayer.setSource(source)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [source])

    return null
}

export default TileLayer