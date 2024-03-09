import React from "react";

function DropDrownMenu() {
  return (
    <div className="fixed top-[4.5rem] left-0 w-full bg-white z-40 overflow-auto">
      <div className="p-4">
        <ul>
          <li>Submenu Item 1</li>
          <li>Submenu Item 2</li>
          <li>Submenu Item 3</li>
        </ul>
      </div>
    </div>
  );
}

export default DropDrownMenu;
