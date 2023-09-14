import React, { useEffect, useRef, useState } from "react";
import * as webix from "./codebase/webix/webix";
const {$$} = webix

function Forma() {
  const uiContainer = useRef(null);
  const uiRef = useRef(null);
  const resObserver = useRef(null);
  const [status, setStatus] = useState(null)
  const [userData, setUserData] =  useState(null)

  useEffect(() => {
    const container = uiContainer.current;

    webix.ready(() => {
    webix.CustomScroll.init();
      uiRef.current =  webix.ui({
        view:"form", 
        id:"log_form",
        width:300,
        elements:[
            { view:"text", label:"Email", name:"email", value:'karen@mail.com'},
            { view:"text", type:"password", label:"Password", name:"password", value: 'karen123'},
            { margin:5, cols:[
                { view:"button", value:"Login" , css:"webix_primary", click: function(){
                  setStatus('Loggin succesfully')
                  setUserData($$('log_form').getValues())
                }},
                { view:"button", value:"Cancel", click: function(){
                  setStatus('Canceled')
                  setUserData(null)

                }}
            ]}
        ],
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
   
  }, [status]);

  return (
    <>
  <div ref={uiContainer} ></div>
  {
    status ? 
    <div>{status}</div>
    :
    <div></div>
  }
  {userData ?
   <>
   <div>login: {userData.email}</div>
   <div>password: {userData.password}</div>
   </>
:  
   <div></div>
}
  </>
  );
}


export default Forma
