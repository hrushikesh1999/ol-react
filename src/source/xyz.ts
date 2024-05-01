import XYZ from "ol/source/XYZ";
import { AttributionLike } from "ol/source/Source";

type Params = {
    url?: string | undefined;
    attributions?: AttributionLike | undefined;
    maxZoom?: number | undefined
}

function xyz({ url, attributions, maxZoom }: Params) {
    return new XYZ({ url, attributions, maxZoom });
}

export default xyz;