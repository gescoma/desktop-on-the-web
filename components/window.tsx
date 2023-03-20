import { Rnd } from "react-rnd";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};

export function Window({ windowOnTop, zIndex, children, closeWindow }: any) {
  return (
    <Rnd
      style={{ ...style, zIndex: zIndex * 10 }}
      default={{
        x: 0,
        y: 0,
        width: 320,
        height: 200
      }}
      onMouseDown={() => windowOnTop(zIndex)}
    >
      {children}
      <button onClick={() => closeWindow(zIndex)}>Close window</button>
    </Rnd>
  );
}
