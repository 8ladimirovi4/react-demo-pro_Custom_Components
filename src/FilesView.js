// example of custom component with Webix UI inside
// this one is a static view, not linked to the React data store

import React, { Component } from "react";
import ReactDOM from "react-dom";

import './codebase/webix/webix.css';
import "./codebase/filemanager/filemanager.css";

class FilesView extends Component {
	constructor(props) {
		super(props);
		this.uiContainer = React.createRef();
	}

	render() {
		return <div ref={this.uiContainer} style={{ height: "100%" }}></div>;
	}

	componentDidMount() {
		
    const container = ReactDOM.findDOMNode(this.uiContainer.current);

		webix.ready(() => {
			require("./codebase/filemanager/filemanager");

			this.ui = webix.ui({
				view: "filemanager",
				url: "https://docs.webix.com/filemanager-backend/",
				container,
			});
		});

		this.resObserver = new ResizeObserver(() => {
			if (this.ui) this.ui.adjust();
		});
		this.resObserver.observe(container);
	}

	componentWillUnmount() {
		if (this.ui) {
			this.ui.destructor();
			this.ui = null;
		}
		this.resObserver.disconnect();
	}

	shouldComponentUpdate() {
		// as component is not linked to the in-app data model, there is no need in updates
		return false;
	}
}

export default FilesView;
