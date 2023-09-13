import React, { useEffect, useRef } from "react";
import "./codebase/webix/webix.css";
import "./codebase/diagram/diagram.css";

const base_data = [
	{ id: "n1", value: "Box n1", x: 800, y: 320 },
	{ id: "n2", value: "Box n2", x: 800, y: 500 },
	{ id: "n3", value: "Box n3", x: 1000, y: 500 },
	{ id: "n4", value: "Box n4", x: 800, y: 600 },
	{ id: "n5", value: "Box n5", x: 650, y: 800 },
	{ id: "n5x1", value: "Box n5x1", x: 400, y: 700 },
	{ id: "n5x2", value: "Box n5x2", x: 300, y: 770 },
	{ id: "n5x3", value: "Box n5x3", x: 180, y: 840 },
	{ id: "n5x4", value: "Box n5x4", x: 80, y: 900 },
	{ id: "n5x5", value: "Box n5x5", x: 0, y: 750 },
	{ id: "n5x6", value: "Box n5x6", x: 50, y: 600 },
	{ id: "n5x7", value: "Box n5x7", x: 120, y: 500 },
	{ id: "n5x8", value: "Box n5x8", x: 220, y: 680 },
	{ id: "n5x9", value: "Box n5x9", x: 400, y: 600 },
	{ id: "n6", value: "Box n6", x: 350, y: 500 },
	{ id: "n7", value: "Box n7", x: 150, y: 400 },
	{ id: "n8", value: "Box n8", x: 550, y: 350 },
	{ id: "n8x1", value: "Box n8x1", x: 600, y: 580 },
	{ id: "n8x2", value: "Box n8x2", x: 0, y: 0 },
	{ id: "n8x3", value: "Box n8x3", x: 100, y: 70 },
	{ id: "n8x4", value: "Box n8x4", x: 300, y: 70 },
	{ id: "n8x5", value: "Box n8x5", x: 900, y: 0 },
	{ id: "n8x6", value: "Box n8x6", x: 700, y: 200 },
	{ id: "n7x1", value: "Box n7x1", x: 50, y: 150 },
	{ id: "n7x2", value: "Box n7x2", x: 300, y: 300 },
	{ id: "n7x3", value: "Box n7x3", x: 400, y: 150 },
	{ id: "n7x4", value: "Box n7x4", x: 550, y: 220 },
];

const base_links = [
	{ source:"n1", target:"n2"},
	{ source:"n1", target:"n3"},
	{ source:"n1", target:"n4"},
	{ source:"n2", target:"n3"},
	{ source:"n3", target:"n4"},
	{ source:"n4", target:"n2"},
	{ source:"n4", target:"n5"},
	{ source:"n5x1", target:"n5"},
	{ source:"n5x1", target:"n5x2"},
	{ source:"n5x2", target:"n5x3"},
	{ source:"n5x2", target:"n5x8"},
	{ source:"n5x3", target:"n5x4"},
	{ source:"n5x4", target:"n5x5"},
	{ source:"n5x5", target:"n5x6"},
	{ source:"n5x6", target:"n5x7"},
	{ source:"n5x7", target:"n5x8"},
	{ source:"n5x8", target:"n5x9"},
	{ source:"n6", target:"n5x9"},
	{ source:"n6", target:"n7"},
	{ source:"n6", target:"n8"},
	{ source:"n7", target:"n8"},
	{ source:"n8x1", target:"n8"},
	{ source:"n8x1", target:"n1"},
	{ source:"n8x2", target:"n8x3"},
	{ source:"n8x3", target:"n8x4"},
	{ source:"n8x4", target:"n8x5"},
	{ source:"n8x5", target:"n8x6"},
	{ source:"n7", target:"n7x1"},
	{ source:"n7", target:"n7x2"},
	{ source:"n7x2", target:"n7x3"},
	{ source:"n7x2", target:"n7x4"},
	{ source:"n1", target:"n8x6"},
];

function Diagram() {
  const uiContainer = useRef(null);
  const uiRef = useRef(null);
  const resObserver = useRef(null);

  useEffect(() => {
    const container = uiContainer.current;
    webix.ready(() => {
    webix.CustomScroll.init();
      require("./codebase/diagram/diagram");
      uiRef.current =  webix.ui({
        view:"diagram-editor",
        data: base_data,
        links: base_links,
        container
      });
    });

    resObserver.current = new ResizeObserver(() => {
      if (uiRef.current) uiRef.current.adjust();
    });
    resObserver.current.observe(container);

    return () => {
      if (uiRef.current) {
        uiRef.current.destructor();
        uiRef.current = null;
      }
      resObserver.current.disconnect();
    };
  }, []);

  return <div ref={uiContainer} style={{ height: "100%" }}></div>;
}

export default Diagram;
