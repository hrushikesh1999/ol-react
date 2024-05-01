import { useContext, useEffect, useState } from "react"
import olModify, { ModifyEvent } from 'ol/interaction/Modify'
import { MapContext } from "../MapProvider";
import { Collection, Feature } from "ol";
import { Geometry } from "ol/geom";

type Props = {
    features: Collection<Feature<Geometry>>;
    onModifyEnd: (e: ModifyEvent) => void;
}

const Modify = (props: Props) => {
    const { features, onModifyEnd } = props
    const [interaction, setInteraction] = useState<olModify>()
    const map = useContext(MapContext);

    useEffect(() => {
        const interaction = new olModify({
            features
        });
        setInteraction(interaction)
    }, [features])

    useEffect(() => {
        interaction?.on('modifyend', (e) => {
            if (onModifyEnd) onModifyEnd(e)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interaction])

    useEffect(() => {
        if (!(interaction && map)) return
        map.addInteraction(interaction)
        return () => {
            map.removeInteraction(interaction);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interaction])

    return null
}

export default Modify