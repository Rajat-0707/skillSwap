import StartingPage from './startingPage'
import Navbar from './navbar'
import About from './about'
import ContactUs from './contactUs'
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