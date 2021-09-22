import React from "react";
import {useDetailGetting} from "../../hooks/useDetailGetting";
import styled from "@emotion/styled";

const StyledDetailPage = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(134, 134, 134, 0.38);
  top: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 30px;
`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    width: 50%;
    height: 90%;
    background-color: white;
    row-gap: 10px;
`;

const CollectionNameBlock = styled.h2`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10%;
    width: 90%;
`

const ImgBlock = styled.div`
    width: 90%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    & img {
      height: 100%;
    }
`;

const NameBlock = styled.h3`
  width: 90%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescriptionBlock = styled.div`
  width: 90%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

const PermaLinkButtonBlock = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PermaLinkButton = styled.button`
    width: 40%;
    height: 90%;
    box-shadow: 0 0 0;
    background-color: aqua;
    cursor: pointer;
    font-size: 14px;
`

export const DetailPage = (props: {contract_address: string, token_id: string, handleDetailPageVisibility: Function}) => {
    const {collectionName, name, description, imgUrl, permalink} = useDetailGetting(props.contract_address, props.token_id)
    return (
        <StyledDetailPage onClick={() => {props.handleDetailPageVisibility(false)}}>
            <Card>
                <CollectionNameBlock>
                    {collectionName}
                </CollectionNameBlock>
                <ImgBlock>
                    <img src={imgUrl} />
                </ImgBlock>
                <NameBlock>
                    {name}
                </NameBlock>
                <DescriptionBlock>
                    {description}
                </DescriptionBlock>
                <PermaLinkButtonBlock>
                    <PermaLinkButton onClick={() => {window.open(permalink)}}>
                        permalink
                    </PermaLinkButton>
                </PermaLinkButtonBlock>
            </Card>
        </StyledDetailPage>
    )
}