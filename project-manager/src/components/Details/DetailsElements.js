import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    height: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
    background: linear-gradient(180deg, rgba(1, 147, 86, 1) 0%, rgba(10, 201, 122, 1) 100%);
`

export const FormWrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 400px) {
        height: 80%;
    }
`

export const Icon = styled(Link)`
    margin-left: 32px;
    margin-top: 32px;
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    font-size: 32px;

    @media screen and (max-width: 480px) {
        margin-top: 8px;
        margin-left: 16px;
    }
`

export const FormContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 480px) {
        padding: 10px;
    }
`

export const Form = styled.div`
    background: #010101;
    width: 80%;
    height: 90%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 80px 32px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

    @media screen and (max-width: 400px) {
        padding: 32px 32px;
    }
`

export const FormH1 = styled.h1`
    margin-bottom: 60px;
    color: #fff;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
`

export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #fff;
`

export const FormInput = styled.input`
    padding: 16px 16px;
    margin-bottom: 32px;
    border: none;
    border-radius: 4px;
`

export const FormButton = styled.button`
    background: #01bf71;
    padding: 16px 0;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
`

export const Text = styled.h4`
    text-align: center;
    color: #fff;
    font-size: 14px;
    margin-right: 10px;
`

export const Text2 = styled.h4`
    text-align: center;
    color: #01bf71;
    font-size: 14px;
`

export const Spacer = styled.div`
    margin-top: 50px;
`

export const SmallSpacer = styled.div`
    margin-top: 20px;
`

export const Divi = styled.div`
    display: flex;
    border: solid #01bf71 2px;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 10px;
    align-items: center;
    margin-top: 5px;
    width: 90%;
`

export const Row = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`

export const TextSection = styled.div`
    display: flex;
    flex-direction: row;
`

export const Accounts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`