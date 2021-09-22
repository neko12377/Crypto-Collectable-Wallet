import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    PostContentInterface,
    useDataGetting
} from "../../hooks/useDataGetting";
import styled from "@emotion/styled";
import { useDetailGetting } from "../../hooks/useDetailGetting";
import { DetailPage } from "./DetailPage";

const Base = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  width: 50%;
  overflow-y: auto;
  height: 100%;
  max-height: 100%;
  flex-wrap: wrap;
  padding-top: 10px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 10px 10px 20px 10px;
  border-radius: 4px;
  width: 45%;
  height: 40%;
  box-shadow: #2e8484 0px 0px 2px;

  &:hover {
    background-color: rgba(203, 203, 203, 0.45);
  }
`;

const CardTitle = styled.h2`
  margin: 5px 0 10px 0;
  color: #2e2e2e;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CardImageBlock = styled.div`
    width: 90%;
    height: 80%;
    min-height: 80%;
    max-height: 80%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    margin-bottom: 10px;
    
    & img {
      height: 100%;
      min-height: 100%;
      max-height: 100%;
    }
`

const CardContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: #3e3e3e;
  width: 100%;
`;

const Hr = styled.hr`
  width: 100%;
  margin-bottom: 20px;
  margin-top: 30px;
  border-bottom: 1px solid #a3a0a0;
`;

const Loading = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 44%;
  background-color: rgba(151, 151, 151, 0.6);
  width: 150px;
  height: 80px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  & div {
    display: flex;
    position: relative;
    width: 80px;
    height: 70px;
  }

  & div div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: rgba(255, 255, 255, 0.73);
    animation: lds-facebook 1.2s infinite;
  }

  & div div:nth-of-type(1) {
    left: 8px;
    animation-delay: -0.24s;
  }

  & div div:nth-of-type(2) {
    left: 32px;
    animation-delay: -0.12s;
  }

  & div div:nth-of-type(3) {
    left: 56px;
    animation-delay: 0s;
  }

  @keyframes lds-facebook {
    0% {
      top: 16px;
      height: 44px;
    }
    25% {
      top: 8px;
      height: 64px;
    }
    50%,
    100% {
      top: 24px;
      height: 32px;
    }
  }
`;

interface BackToTopButtonProps {
    visibility: "flex" | "none";
}

const BackToTopButton = styled.a<BackToTopButtonProps>`
  position: absolute;
  bottom: 20px;
  right: 26.5%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(56, 99, 158, 0.66);
  display: ${(props) => props.visibility};
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background-color: rgb(177, 231, 253);
  }
`;

const NothingMoreBlock = styled.div`
  position: absolute;
  width: 40%;
  height: 30%;
  background-color: rgba(203, 203, 203, 0.34);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 2rem;
  top: 40%;
  border-radius: 8px;
`;

const InfiniteScroll = () => {
    const limit = useRef(20);
    const [offset, setOffset] = useState(0);
    const [urlPath, setUrlPath] = useState<string>(
        `https://api.opensea.io/api/v1/assets?order_direction=desc&limit=${limit.current}&owner=0x960DE9907A2e2f5363646d48D7FB675Cd2892e91&offset=${offset}`
    );
    
    const { assets, hasMore, isLoading, error } = useDataGetting(urlPath);
    const assetsArray = useMemo(() =>
            assets.length > 0 && !error
                ? assets.map((item: PostContentInterface) => {
                    const { id, token_id, asset_contract, image_preview_url, name } = item;
                    return {
                        id,
                        token_id,
                        address: asset_contract.address,
                        image_preview_url,
                        name
                    };
                })
                : [
                    {
                        id: "0",
                        token_id: "0",
                        address: "00000AAAAAAA",
                        name: "empty",
                        image_preview_url: undefined,
                    }
                ]
        , [assets, error]);
    const observer = useRef<null | IntersectionObserver>();
    const lastPostBlock = useCallback(
        (lastNode) => {
            observer.current && observer.current.disconnect();
            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        limit.current = limit.current <= 40 ? limit.current + 10 : limit.current < 50 ? 50 : 20;
                        assetsArray[0].id !== 0 && setUrlPath(
                            `https://api.opensea.io/api/v1/assets?order_direction=desc&limit=${limit.current}&owner=0x960DE9907A2e2f5363646d48D7FB675Cd2892e91&offset=${offset}`
                        );
                    }
                },
                { threshold: 0.8 }
            );
            lastNode && observer.current?.observe(lastNode);
        },
        [assetsArray, offset]
    );

    const [backToTopButtonVisibility, setBackToTopButtonVisibility] = useState<"flex" | "none">("none");
    const topObserver = useRef<null | IntersectionObserver>();
    const firstPostBlock = useCallback((firstNode) => {
        topObserver.current = new IntersectionObserver((entries) => {
            !entries[0].isIntersecting && setBackToTopButtonVisibility("flex");
            entries[0].isIntersecting && setBackToTopButtonVisibility("none");
        });
        topObserver.current?.observe(firstNode);
    }, []);

    const [showNoContentBlock, setShowNoContentBlock] =
        useState<boolean>(false);
    useEffect(() => {
        !hasMore && setShowNoContentBlock(true);
        !hasMore && setTimeout(() => setShowNoContentBlock(false), 3000);
    }, [hasMore]);


    const [isShowDetailPage, setIsShowDetailPage] = useState(false);
    const contract_address = useRef("");
    const token_id = useRef("");
    const handleCardClick = (address: string, tokenId: string) => {
        setIsShowDetailPage(true);
        contract_address.current = address;
        token_id.current = tokenId;
    }

    return (
        <Base>
            {isLoading && (
                <Loading>
                    <div>
                        <div />
                        <div />
                        <div />
                    </div>
                </Loading>
            )}
                {assetsArray.map((item, index: number) =>
                   assetsArray.length === index + 1 ? (
                        <Card key={`${item.name}_${item.id}`} ref={lastPostBlock} onClick={() => {handleCardClick(item.address, item.token_id)}}>
                            <CardImageBlock>
                                {item.image_preview_url && <img src={item.image_preview_url} />}
                            </CardImageBlock>
                            <CardTitle>{item.name}</CardTitle>
                        </Card>
                    ) : index === 0 ? (
                        <Card id="top" key={`${item.name}_${item.id}`} ref={firstPostBlock} onClick={() => {handleCardClick(item.address, item.token_id)}}>
                            <CardImageBlock>
                                {item.image_preview_url && <img src={item.image_preview_url} />}
                            </CardImageBlock>
                            <CardTitle>{item.name}</CardTitle>
                        </Card>
                    ) : (
                        <Card key={`${item.name}_${item.id}`} onClick={() => {handleCardClick(item.address, item.token_id)}}>
                            <CardImageBlock>
                                {item.image_preview_url && <img src={item.image_preview_url} />}
                            </CardImageBlock>
                            <CardTitle>{item.name}</CardTitle>
                        </Card>
                    )
                )}
            <BackToTopButton visibility={backToTopButtonVisibility} href="#top">
                TOP
            </BackToTopButton>
            {showNoContentBlock && (
                <NothingMoreBlock>抱歉，暫時沒有更多內容</NothingMoreBlock>
            )}
            {isShowDetailPage && <DetailPage contract_address={contract_address.current} token_id={token_id.current} handleDetailPageVisibility={setIsShowDetailPage}/>}
        </Base>
    );
};

export default InfiniteScroll;
