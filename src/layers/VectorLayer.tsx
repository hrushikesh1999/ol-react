import { useEffect, useContext, useState } from 'react'
import OLVectorLayer from "ol/layer/Vector";
import { StyleLike } from 'ol/style/Style';
import { MapContext } from '../MapProvider';
import { Extent } from 'ol/extent';

type Props = {
    source: any;
    style?: StyleLike | null | undefined;
    zIndex?: number;
    onceChange?: (extent: Extent) => void;
    properties?: { [x: string]: any }
}

const VectorLayer = (props: Props) => {
    const { source, style, zIndex = 0, onceChange, properties } = props
    const map = useContext(MapContext);
    const [vectorLayer] = useState<OLVectorLayer<any>>(new OLVectorLayer({ source, style, properties }))

    useEffect(() => {
        if (!map) return;

        map.addLayer(vectorLayer);
        vectorLayer.setZIndex(zIndex);

        return () => {
            if (map) {
                map.removeLayer(vectorLayer);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map])

    useEffect(() => {
        if (source) vectorLayer.setSource(source)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [source])

    useEffect(() => {
        if (!(map && onceChange)) return;
        vectorLayer.getSource()?.once("change", function () {
            const extent = vectorLayer.getSource().getExtent()
            onceChange(extent)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, onceChange])

    return null
}

export default VectorLayer