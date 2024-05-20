import styled from "styled-components";


export const WrapperContainerRight = styled.div`
width: 300px;
background:linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%);
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-radius: 0px 20px 20px 0px;
    gap: 4px
`
export const WrapperContainerLeft = styled.div`
flex: 1;
    padding: 40px 45px 24px;
    display: flex;
    flex-direction: column;

    & > *:not(:last-child) {
        margin-bottom: 5px; 
    }
`
export const WrapperTextLight = styled.span`
    color: rgb(13,92,182);
    font-size: 15px;
    cursor: pointer;
`
export const WrapperTextBlack = styled.span`
    color: rgb(0, 0 , 0);
    font-size: 15px
`
