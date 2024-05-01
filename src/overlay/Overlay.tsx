import { useState, useContext, useEffect, useRef, PropsWithChildren, CSSProperties } from 'react';
import { MapContext } from '../MapProvider';
import olOverlay, { Positioning } from 'ol/Overlay'
import { Coordinate } from 'ol/coordinate';

type Props = PropsWithChildren<{
    id?: string,
    offset?: number[],
    position?: Coordinate,
    positioning?: Positioning,
    stopEvent?: boolean,
    insertFirst?: boolean,
    style?: CSSProperties,
}>

const Overlay = (props: Props) => {
    const { children, id, offset, position, positioning, stopEvent, insertFirst, style } = props
    const ref = useRef<HTMLDivElement>(null)
    const map = useContext(MapContext);
    const [overlay] = useState(new olOverlay({
        id: id,
        offset: offset,
        position: position,
        positioning: positioning,
        stopEvent: stopEvent,
        insertFirst: insertFirst,
    }));

    useEffect(() => {
        if (!ref.current) return;
        overlay.setElement(ref.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current])

    useEffect(() => {
        if (!map) return;
        map.addOverlay(overlay)

        return () => {
            map.removeOverlay(overlay)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map])

    useEffect(() => {
        if (!offset) return;
        overlay.setOffset(offset);
    }, [overlay, offset]);

    useEffect(() => {
        if (!position) return;
        overlay.setPosition(position)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position])

    return (
        <div ref={ref} style={{ ...style }}>
            {children}
        </div>
    )
}

export default Overlay