import StartingPage from './startingPage.tsx'
import Navbar from './navbar.tsx'
import About from './about.tsx'
import ContactUs from './contactUs.tsx'
import Footer from './footer.tsx'

const Home = () => {
  return (
    <>
      <Navbar />
     <StartingPage /> 
        <About />
        <ContactUs />
        <Footer />
    </>
  )
}

export default Home