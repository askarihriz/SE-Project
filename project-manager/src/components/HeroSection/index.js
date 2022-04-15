import React, { useState } from "react";
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  HeroBtn,
  ArrowForward,
  ArrowRight,
} from "./HeroElements";
import Video from "../../videos/Project Management.mp4";

const HeroSection = () => {
  const [isHover, setHover] = useState(false);

  const onHover = () => {
    setHover(!isHover);
  };

  return (
    <HeroContainer id="home">
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </HeroBg>
      <HeroContent>
        <HeroH1>Project Management Made Easy</HeroH1>
        <HeroP>
          Sign Up for an account today and enjoy hustle free semester
        </HeroP>
        <HeroBtnWrapper>
          <HeroBtn
            to="signup"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            duration={500}
            exact="true"
            smooth={true}
            spy={true}
            offset={-80}
          >
            Get Started {isHover ? <ArrowRight /> : <ArrowForward />}
          </HeroBtn>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
