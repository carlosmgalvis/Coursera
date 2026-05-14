import Header from "./components/Header.tsx"
import LandingSection from "./components/LandingSection.tsx"
import ProjectsSection from "./components/ProjectsSection.tsx"
import ContactMeSection from "./components/ContactMeSection.tsx"
import Footer from "./components/Footer.tsx"
import Alert from "./components/Alert.tsx"
import './App.css'

function App() {
  return (

        <main>
          <Header />
          <LandingSection />
          <ProjectsSection />
          <ContactMeSection />
          <Footer />
          <Alert />
        </main>
  )
}

export default App
