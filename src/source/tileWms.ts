import { TileWMS } from 'ol/source';
import { ServerType } from 'ol/source/wms';

type Params = {
    url: string;
    params: { [x: string]: any };
    serverType?: ServerType;
    transition?: number;
}

function tileWms({ url, params, serverType, transition }: Params) {
    return new TileWMS({
        url,
        params,
        serverType,
        transition,
    });
}

export default tileWms;