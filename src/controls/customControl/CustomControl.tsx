import { useEffect, useRef, useContext, ReactNode } from "react";
import Control, { Options } from "ol/control/Control";
import { MapContext } from "../../../olReact/MapProvider";
import { ControlPosition } from "../../../../types/control";

type Props = {
  control: ReactNode;
  controlContent?: ReactNode;
  controlPosition?: ControlPosition;
  controlContentPosition?: ControlPosition;
  showContent?: boolean;
};

const CustomControl = (props: Props) => {
  const {
    control,
    controlContent,
    controlPosition,
    controlContentPosition,
    showContent = false,
  } = props;
  const map = useContext(MapContext);
  const controlRef = useRef<HTMLDivElement>(null);
  const controlContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //control
    if (!(map && controlRef && controlRef.current)) return;
    const options: Options = {
      element: controlRef.current,
    };
    const control = new Control(options);
    map.addControl(control);

    return () => {
      map.removeControl(control);
    };
  }, [map]);

  useEffect(() => {
    //control content
    if (
      !(map && controlContent && controlContentRef && controlContentRef.current)
    )
      return;
    const contentOptions: Options = {
      element: controlContentRef.current,
    };
    const contentControl = new Control(contentOptions);
    map.addControl(contentControl);

    return () => {
      controlContent && map.removeControl(contentControl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return (
    <>
      <div
        ref={controlRef}
        style={{ position: "absolute", ...controlPosition }}
      >
        {control}
      </div>
      {controlContent && (
        <div
          ref={controlContentRef}
          className="map-custom-control-content"
          style={{ position: "absolute", ...controlContentPosition }}
        >
          {showContent && controlContent}
        </div>
      )}
    </>
  );
};

export default CustomControl;
