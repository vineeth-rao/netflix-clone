import Navbar from "../../components/Navbar"

function HomeScreen() {
  return (
    <div className="relative h-screen text-white">
       <Navbar/>
       <img src="/extraction.jpg" alt="Hero img" className="absolute top-0 w-full h-full object-cover -z-50" />
       <div className="absolute top-0 w-full h-full bg-gradient-to-b from-black/80 via-black/40 to-black/0 -z-40" aria-hidden="true"/>
    </div>
  )
}

export default HomeScreen