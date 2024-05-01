import { useRef, useEffect, useContext, PropsWithChildren } from "react"
import "./olMap.css";
import { Coordinate } from "ol/coordinate";
import { MapContext } from "../MapProvider";
import { MapBrowserEvent } from "ol";
import { unByKey } from "ol/Observable";

type Props = PropsWithChildren<{
	zoom?: number;
	center?: Coordinate;
	height?: string;
	onSingleClick?: (e: MapBrowserEvent<any>) => void;
}>

const OlMap = (props: Props) => {
	const { children, zoom, center, height = "80vh", onSingleClick } = props
	const mapRef = useRef<HTMLDivElement>(null);
	const map = useContext(MapContext);

	// on component mount
	useEffect(() => {
		if (!map) return;
		map.setTarget(mapRef.current as HTMLDivElement);

		return () => {
			map.setTarget(undefined)
		};
	}, [map]);

	// zoom change handler
	useEffect(() => {
		if (!map) return;

		if (zoom !== undefined) map.getView().setZoom(zoom); //TODO: needs to be updated
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [zoom]);

	// center change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setCenter(center)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [center])

	useEffect(() => {
		if (!(map && mapRef.current)) return
		const resizeObserver = new ResizeObserver(() => {
			map.updateSize()
		});
		resizeObserver.observe(mapRef.current)

		return () => {
			resizeObserver.disconnect()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!map) return
		const key = map.on("singleclick", function (e) {
			if (onSingleClick) {
				onSingleClick(e)
			}
		})

		return () => {
			unByKey(key)
		}
	}, [map, onSingleClick])

	return (
		<div ref={mapRef} className="ol-map" style={{ height }} >
			{children}
		</div>
	)
}

export default OlMap;