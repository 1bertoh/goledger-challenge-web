import BgImage from "./components/bgImage"
import Navbar from "./components/navbar"
import Routes from "./routes"

function App() {
  return (
    <>
      <div className="relative z-30">
        <Navbar/>
        <Routes/>
      </div>
      <BgImage/>
    </>
  )
}

export default App
