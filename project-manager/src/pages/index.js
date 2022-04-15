import React, {useState} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import HeroSection from '../components/HeroSection'
import InfoSection from '../components/InfoSection'
import SignupSection from '../components/SignupSection'
import { homeObj1, homeObj2 } from '../components/InfoSection/Data'
import { homeObj3 } from '../components/SignupSection/data'
import Services from '../components/Services'
import Footer from '../components/Footer'

const Home = () => {
    const [isOpen, setisOpen] = useState(false);

    const toggle = () => {
        setisOpen(!isOpen);
    }

    return (
        <>
          <SideBar isOpen={isOpen} toggle={toggle}/>
          <NavBar toggle={toggle}/>
          <HeroSection />
          <InfoSection {...homeObj1}/>
          <InfoSection {...homeObj2}/>
          <Services />
          <SignupSection {...homeObj3}/>
          <Footer />
        </>
    )
}

export default Home
