import { Rnd } from "react-rnd";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};

export function Window({ onMouseDown, zIndex, children }:{onMouseDown:any, zIndex:Number, children:React.ReactNode}) {
  return (
    <Rnd
      style={{ ...style, zIndex: `${zIndex}` }}
      default={{
        x: 0,
        y: 0,
        width: 320,
        height: 200
      }}
      onMouseDown={() => onMouseDown(zIndex)}
    >
      {children}
    </Rnd>
  );
}