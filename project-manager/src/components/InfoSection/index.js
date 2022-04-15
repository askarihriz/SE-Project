import React from 'react'
import { Img, ImgWrap, InfoContainer, InfoWrapper, InfoRow, Column2, Column1, TextWrapper, TopLine, Heading, Subtitle, BtnWrap, Btn } from './InfoElements'

const InfoSection = ({lightBg, Primary, id, imgStart, lightText, darkText, topLine, headline, description, buttonLabel, img, alt, whereto}) => {
    return (
        <InfoContainer LightBg={lightBg} id={id}>
            <InfoWrapper>
                <InfoRow ImgStart={imgStart}>
                    <Column1>
                        <TextWrapper>
                            <TopLine>{topLine}</TopLine>
                            <Heading lightText={lightText}>{headline}</Heading>
                            <Subtitle darkText={darkText}>{description}</Subtitle>
                            <BtnWrap>
                                <Btn to={whereto} Primary={Primary} duration={500} exact="true" smooth={true} spy={true} offset={-80}>{buttonLabel}</Btn>
                            </BtnWrap>
                        </TextWrapper>
                    </Column1>
                    <Column2>
                        <ImgWrap>
                            <Img src={img} alt={alt}></Img>
                        </ImgWrap>
                    </Column2>
                </InfoRow>
            </InfoWrapper>
        </InfoContainer>
    )
}

export default InfoSection
