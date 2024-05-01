import { useContext, useEffect, useState } from 'react'
import { MapContext } from '../MapProvider';
import olDraw, { DrawEvent, GeometryFunction, Options } from 'ol/interaction/Draw'
import Geometry, { Type } from 'ol/geom/Geometry';
import { StyleLike } from 'ol/style/Style';
import { Condition } from 'ol/events/condition';
import VectorSource from 'ol/source/Vector';
import BaseEvent from 'ol/events/Event';

type Props = {
    type: Type;
    style?: StyleLike;
    geometryFunction?: GeometryFunction;
    condition?: Condition;
    source?: VectorSource<Geometry>;
    active?: boolean;
    drawstart?: (e: DrawEvent) => void;
    drawend?: (e: BaseEvent | Event) => void
}

const Draw = (props: Props) => {
    const { type, style, geometryFunction, condition, source, active, drawend, drawstart } = props
    const map = useContext(MapContext);
    const [draw, setDraw] = useState<olDraw>();

    const getDraw = () => {
        const options: Options = { type, style, geometryFunction, condition, source }
        const draw = new olDraw(options);
        if (active !== undefined) draw.setActive(active);
        if (drawstart !== undefined) draw.on('drawstart', e => drawstart(e));
        if (drawend !== undefined) draw.on(['change:active', 'drawend'], e => drawend(e));
        return draw;
    }

    useEffect(() => {
        if (!map) return
        const draw = getDraw();
        setDraw(draw)
        return () => {
            map.removeInteraction(draw);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);

    useEffect(() => {
        if (!map) return
        if (draw !== undefined)
            map.removeInteraction(draw);
        const newDraw = getDraw();
        setDraw(newDraw)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, type, active]);

    useEffect(() => {
        if (!(draw && map)) return
        map.addInteraction(draw)
        return () => {
            map.removeInteraction(draw);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [draw])

    return null

}

export default Draw