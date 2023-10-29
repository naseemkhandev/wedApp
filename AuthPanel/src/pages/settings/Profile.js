import "../new/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react"; // Import useEffect
import axios from "axios";
import BASE_URL from "../../components/BASE_URL";

const Profile = () => {
  const [authName, setUserName] = useState("");
  const [photo, setProfilePicture] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // State variable for tracking saving status

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true); // Set isSaving to true when saving begins

      const loginId = localStorage.getItem("authId");
      const formData = new FormData();
      formData.append("authName", authName);
      if (photo) {
        formData.append("photo", photo);
      }

      const response = await axios.put(
        `${BASE_URL}/api/auth/update-user/${loginId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // You may also need to include an authorization token in the headers for authentication
          },
        }
      );

      // After saving is complete, set isSaving back to false
      setIsSaving(false);

      // You can add code to show a success message to the user
    } catch (error) {
      console.error("Error updating profile", error);

      // After saving is complete (even in case of an error), set isSaving back to false
      setIsSaving(false);

      // You can add code to show an error message to the user
    }
  };

  useEffect(() => {
    // Clean up isSaving when the component unmounts
    return () => setIsSaving(false);
  }, []);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Profile Data</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <label htmlFor="authName">User name:</label>
              <input
                type="text"
                id="authName"
                value={authName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>

            <div class="form-group">
              <label htmlFor="photo">Profile picture:</label>
              <input
                type="file"
                id="photo"
                onChange={(event) => setProfilePicture(event.target.files[0])}
              />
            </div>

            <div>
              <div class="form-group">
                <button type="submit" className="btnSolid" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
