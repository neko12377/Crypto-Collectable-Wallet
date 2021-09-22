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
    height: 80%;
    background-color: white;
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

const NameBlock = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescriptionBlock = styled.div`
  width: 90%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DetailPage = (props: {contract_address: string, token_id: string, handleDetailPageVisibility: Function}) => {
    const {collectionName, name, description, imgUrl} = useDetailGetting(props.contract_address, props.token_id)
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
            </Card>
        </StyledDetailPage>
    )
}