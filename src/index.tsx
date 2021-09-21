import React from "react";
import ReactDom from "react-dom";
import { App } from "./App";
import { Global, css } from "@emotion/react";

ReactDom.render(
    <React.Fragment>
        <Global
            styles={css`
                * {
                    box-sizing: border-box;

                    ::-webkit-scrollbar {
                        width: 10px;
                        cursor: pointer !important;
                    }

                    ::-webkit-scrollbar-track {
                        box-shadow: inset 0 0 1px grey;
                        border-radius: 10px;
                    }

                    ::-webkit-scrollbar-thumb {
                        background: #b8b7b7;
                        border-radius: 10px;
                    }

                    ::-webkit-scrollbar-thumb:hover {
                        background: #686868;
                    }

                    scroll-behavior: smooth;
                }

                body {
                    padding: 0;
                    margin: 0;
                    height: 100vh;
                    overscroll-behavior-y: contain;
                    display: flex;
                    width: 100%;
                }

                #root {
                    display: flex;
                    width: 100%;
                    height: 100%;
                }
            `}
        />
        <App />
    </React.Fragment>,
    document.getElementById("root")
);
