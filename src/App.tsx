import React, { Suspense } from "react";
import * as Module from "./module";
import styled from "@emotion/styled";

const LoadingWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    font-size: 32px;
    font-weight: 900;
    height: 40px;
`;

const DotLoading = styled.div`
    display: flex;
    width: 70px;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding-top: 13px;

    & > div {
        width: 14px;
        height: 14px;
        background-color: #333;

        border-radius: 100%;
        display: inline-block;
        -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    & div:nth-of-type(1) {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }

    & div:nth-of-type(2) {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }

    @-webkit-keyframes sk-bouncedelay {
        0%,
        80%,
        100% {
            -webkit-transform: scale(0);
        }
        40% {
            -webkit-transform: scale(1);
        }
    }

    @keyframes sk-bouncedelay {
        0%,
        80%,
        100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        40% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
`;

const FallbackPage = () => {
    return (
        <LoadingWrapper style={{ display: "flex" }}>
            Wait for it
            <DotLoading>
                <div />
                <div />
                <div />
            </DotLoading>
        </LoadingWrapper>
    );
};

export const App = () => {
    return (
        <Suspense fallback={<FallbackPage />}>
            <Module.PostsWall />
        </Suspense>
    );
};
