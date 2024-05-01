import { useContext, useEffect } from "react"
import olSelect, { SelectEvent } from 'ol/interaction/Select'
import { MapContext } from "../MapProvider";

type Props = {
    onFeatureSelect?: (e: SelectEvent) => void
    interaction: olSelect;

}

const Select = (props: Props) => {
    const { onFeatureSelect, interaction } = props
    const map = useContext(MapContext);

    useEffect(() => {
        interaction?.on('select', (e) => {
            if (onFeatureSelect) onFeatureSelect(e)
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

export default Select