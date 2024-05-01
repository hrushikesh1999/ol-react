import { Collection, Feature } from 'ol';
import FeatureFormat from 'ol/format/Feature';
import { Geometry } from 'ol/geom';
import { Vector as VectorSource } from 'ol/source';

type Params = {
    features?: Feature<Geometry>[] | Collection<Feature<Geometry>> | undefined
    url?: string;
    format?: FeatureFormat;
    wrapX?: boolean
}

function vector({ features, url, format, wrapX }: Params) {
    return new VectorSource({
        features,
        url,
        format,
        wrapX,
    });
}

export default vector;