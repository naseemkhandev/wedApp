import { useState, useEffect } from "react";
import "./list.scss";
import ModalPlayList from "./ModalPlaylist";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { API } from "../../utils/URL";
import CustomPlaylists from "../../components/playlist/CustomPlaylist";
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import BASE_URL from "../../components/BASE_URL"
const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState([]);
  const [playlistDetails, setPlaylistdetails] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const loginId = localStorage.getItem("authId");
  const [getLists, setGetLists] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/auth/get-playlists?authId=${loginId}`
        );
        const data = response.data;
        setPlaylist(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [playlist]);

  // console.log(playlist);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // COPY FROM CHATBOT PART - START-------------------
  const searchSpotify = () => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track%2Cplaylist%2Calbum&limit=50`;
    const clientId = "11fd30880b5f44f8bde303ac14349ed8";
    const clientSecret = "23dd884fab5942d9828577dde559c984";

    const auth = btoa(`${clientId}:${clientSecret}`);
    const headers = {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    axios
      .post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: headers,
        }
      )
      .then((response) => {
        const accessToken = response.data.access_token;

        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setResults(response.data.playlists.items);
            // console.log(response.data.playlists.items);
          })
          .catch((error) => {
            console.error("Error fetching search results:", error);
          });
      })
      .catch((error) => {
        console.error("Error obtaining access token:", error);
      });
  };

  useEffect(() => {
    searchSpotify();
  }, [query]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const showSearchLists = query.trim() !== "";

  const selectSong = (playlist) => {
    setSelectedSongs([...selectedSongs, playlist]);
    setQuery("");
  };

  const removeSong = (songId) => {
    setSelectedSongs(selectedSongs.filter((song) => song.id !== songId));
  };

  const handleToAddPlaylist = (e) => {
    e.preventDefault();
    const playlistData = {
      authId: localStorage.getItem("authId"),
      inviteType: "your-invite-type",
      playlistName: playlistName,
      songs: selectedSongs.map((song) => {
        return {
          name: song?.name,
          externalUrl: song?.external_urls?.spotify,
        };
      }),
    };

    axios
      .post(`${API}/api/auth/suggest_playlist`, playlistData)
      .then((response) => {
        setSelectedSongs([]);
        setPlaylistName("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPath = localStorage.getItem("authId");
        const response = await axios.get(
          `${API}/api/auth/suggest_playlist?authId=${storedPath}`
        );
        const data = response.data;
        setPlaylistdetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [playlistDetails]);

  

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="newContainer ml-2 h-full">
          {/* COPY FROM CHATBOT PART - START------------------- */}
          <div className="w-[70%] px-3 mt-3 flex items-center gap-3 flex-col">
            <div className="w-full ">
              <form className="w-full relative">
                <h2 className="w-full mb-1 block">Suggest Song</h2>
                <input
                  className="rounded-sm p-[.4rem] w-full border"
                  type="search"
                  value={query}
                  onChange={handleQueryChange}
                  placeholder="Search for a playlist"
                />
                {/* SELECTED SONG */}
                <div className="grid gap-1 grid-cols-2">
                  {selectedSongs.map((song) => (
                    <div
                      key={song.id}
                      className="selectedSong border border-green-200 p-1 mt-2 rounded-3xl flex  items-center gap-2"
                    >
                      <CancelOutlinedIcon
                        className="active:scale-95 text-red-500 cursor-pointer"
                        onClick={() => removeSong(song.id)}
                      >
                        </CancelOutlinedIcon>
                      <p className="text-[13px] w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                        {song?.name}
                      </p>
                      <span className="hidden">
                        {song.external_urls.spotify}
                      </span>
                    </div>
                  ))}
                </div>
                {selectedSongs.length > 0 && (
                  <>
                    <h2 className="w-full py-1 block">Playlist Name</h2>
                    <input
                      className="rounded-sm p-[.4rem] w-full border"
                      type="text"
                      placeholder="Enter playlist name"
                      value={playlistName}
                      onChange={(e) => setPlaylistName(e.target.value)}
                    />
                  </>
                )}
                {selectedSongs.length > 0 && (
                  <div className="w-full flex mt-2 items-center justify-center">
                    <button
                      onClick={handleToAddPlaylist}
                      className="active:scale-95 text-center cursor-pointer p-[.35rem] px-2 text-white rounded-[3px] bg-green-500"
                    >
                      Add to playlist
                    </button>
                  </div>
                )}

                {/* SELECTED SONG */}
                {/* SEARCH LISTS */}
                {showSearchLists && (
                  <div className="searchLists w-full border border-gray-200 rounded-[4px] absolute z-[2] top-[70px] overflow-y-scroll bg-gray-50 h-[250px] p-1">
                    {results?.length > 0 ? (
                      <ul className="space-y-2">
                        {results.map((playlist) => (
                          <li
                            className="bg-white p-1 border border-white hover:border-gray-300 cursor-pointer rounded-md flex items-center gap-2 active:scale-95"
                            key={playlist?.id}
                            onClick={() => selectSong(playlist)}
                          >
                            <img
                              alt=""
                              className="rounded-md object-cover w-9 h-9"
                              src={playlist?.images[0]?.url}
                            />
                            <p className="text-[13px] w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                              {playlist?.name}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Search results not found.</p>
                    )}
                  </div>
                )}
                {/* SEARCH LISTS */}
              </form>
            </div>
          </div>
          {/* COPY FROM CHATBOT PART - END------------------- */}
          <div className="top ">
            <h3>PlayList</h3>
          </div>
          <div className="subList">
            <ModalPlayList isOpen={isModalOpen} onClose={handleCloseModal} />
            <span className="create-btn" onClick={handleOpenModal}>
              {" "}
              &nbsp;
              <AddCircleOutlineOutlinedIcon fontSize="25px" color="#6439ff" />
              <span>&nbsp; Create Playlist</span>
            </span>
          </div>

          <div className="imagecollection h-full">
            <div className="">
              <h4 className="heading-4">Spotify Playlists</h4>
              <Div className="">
                {playlist?.map((data) => {
                  return (
                    <div className="p-header" key={data._id}>
                      <Link
                        to={data.playListUrl}
                        target="_blank"
                        className=" p-btn"
                      >
                        <img
                          className="logo"
                          src="https://i.postimg.cc/gjsy7KPC/pngwing-com.png"
                          alt=""
                        />
                        <span>{data.playListName}</span>
                      </Link>
                    </div>
                  );
                })}
              </Div>

              {/* // COPY FROM CHATBOT PART - START------------------- */}
              <h2 className="w-full px-3 mt-6 block">Custom Playlists</h2>
              <div className="w-full relative flex items-center gap-3 flex-wrap content-center p-2 px-3">
                {playlistDetails?.data?.map((i) => (
                  <div
                    className=" listScroll relative rounded-md overflow-hidden overflow-y-auto border border-green-200 w-[250px] h-[200px]"
                    key={i._id}
                  >
                    <div
                      // to={`/playlists/${i._id}`}
                      className="sticky cursor-pointer w-[100%] flex items-center gap-3 bg-green-500 border border-green-200 rounded-[4px] text-white p-[.4rem] px-3"
                    >
                      <TocOutlinedIcon size={20} className="text-white" > </TocOutlinedIcon>
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {i.playlistName}
                      </span>
                    </div>
                    <div>
                      <CustomPlaylists uid={i._id} />
                    </div>
                  </div>
                ))}
              </div>

              {/* // COPY FROM CHATBOT PART - END------------------- */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;

const Div = styled.div`
  margin-top: 0px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 20px;

  .p-header {
    .p-btn {
      padding: 5px 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: #fff;
      cursor: pointer;
      border: 1px solid lightgray;
      border-radius: 5px;
      outline: none;

      &:hover {
        background-color: lightgray;
      }

      .logo {
        width: 20px;
      }
    }
  }
`;
