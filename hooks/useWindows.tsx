import { useState } from "react";

const windowsList = [
  {
    id: 1,
    name: "app 1",
    zIndex: 2
  },
  {
    id: 2,
    name: "app 2",
    zIndex: 1
  },
  {
    id: 3,
    name: "app 3",
    zIndex: 3
  }
];

export function useWindows() {
  const [windows, setWindows] = useState(windowsList);

  const windowOnTop = (index:number) => {
    if (index === windows.length) return;
    let newOrderWindows = windows.map((item) => {
      if (item.zIndex < index) return item;
      if (item.zIndex === index) {
        item.zIndex = windows.length;
        return item;
      }
      return { ...item, zIndex: item.zIndex - 1 };
    });
    setWindows(newOrderWindows);
  };

  const addWindow = () => {
    const newWindows = [
      ...windows,
      {
        id: windows.length + 1,
        name: `app ${windows.length + 1}`,
        zIndex: windows.length + 1
      }
    ];
    setWindows(newWindows);
  };

  const closeWindow = (index:number) => {
    console.log("closeWindow" + index);
    setWindows(
      windows.filter((item) => {
        return item.zIndex === index;
      })
    );
  };

  return {
    windows,
    windowOnTop,
    addWindow,
    closeWindow
  };
}
