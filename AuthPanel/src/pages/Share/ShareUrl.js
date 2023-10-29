import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const ShareUrl = () => {
  const loginId = localStorage.getItem("authId");
  console.log(loginId);


  var closeURL = `https://wedding-chatbot-blush.vercel.app/file/close/a/${loginId}`;
  var generalURL = `https://wedding-chatbot-blush.vercel.app/file/general/a/${loginId}`;

  const copyToClipboardClose = () => {
    navigator.clipboard.writeText(closeURL);
    alert("Close URL copied to clipboard!");
  };
  const copyToClipboardGeneral = () => {
    navigator.clipboard.writeText(generalURL);
    alert("General URL copied to clipboard!");
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="newContainer">
          <div className="top flex flex-col">
            <h3>Share Invite URL</h3>
            <div className=" flex items-center gap-3 p-2 w-full">
              <button
                className="rounded-[4px] p-2 px-4 text-white bg-blue-400"
                onClick={copyToClipboardClose}
              >
                Close Share Link
              </button>
              <button
                className="rounded-[4px] p-2 px-4 text-white bg-green-400"
                onClick={copyToClipboardGeneral}
              >
                General Share Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareUrl;
