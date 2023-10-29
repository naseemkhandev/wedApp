import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";


const Home = () => {
  

  return (
    <div className="home">
      <Sidebar />
    <div className="homeContainer">
        <Navbar />
      <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-4">
           <Widget type="images" />
           <Widget type="videos" />
           <Widget type="polls" />
           <Widget type="giftlist" />
           <Widget type="invitees" />
           <Widget type="playlist" />
       </div>
    </div>
    </div>
  );
};

export default Home;
