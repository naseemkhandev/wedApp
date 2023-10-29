import React, { useEffect, useState } from "react";
import TopNav from "../../components/TopNav/TopNav";
import { BsMusicNote, BsSpotify } from "react-icons/bs";
import { BiListUl } from "react-icons/bi";
import { API } from "../../utils/URL";
import axios from "axios";
import { Link } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";

const Playlist = () => {
  const [details, setDetails] = useState([]);
  const [playlistDetails, setPlaylistdetails] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const storedPath = localStorage.getItem("pathID");
        const response = await axios.get(
          `${API}/api/auth/get-playlists?authId=${storedPath}`
        );
        const data = response.data;
        if (isMounted) {
          setDetails(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const searchSpotify = () => {
    setLoading(true);
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
          })
          .finally(() => {
            setLoading(false);
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
      authId: localStorage.getItem("pathID"),
      inviteType: localStorage.getItem("type"),
      playlistName: playlistName,
      songs: selectedSongs.map((song) => {
        // console.log(song);
        return {
          name: song?.name,
          externalUrl: song?.external_urls?.spotify,
        };
      }),
    };

    // console.log(playlistData);

    axios
      .post(`${API}/api/auth/suggest_playlist`, playlistData)
      .then((response) => {
        // console.log(response.data);
        setSelectedSongs([]);
        setPlaylistName("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    let isMounted = true; 

    const fetchData = async () => {
      try {
        const storedPath = localStorage.getItem("pathID");
        const response = await axios.get(
          `${API}/api/auth/suggest_playlist?authId=${storedPath}`
        );
        const data = response.data;
        if (isMounted) {
          setPlaylistdetails(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false; 
    };
  }, [playlistDetails]);

  // console.log(playlistDetails);

  return (
    <TopNav routeLink={"/"} barTitle={"Playlists"}>
      <div className="w-full px-3 mt-3 flex items-center gap-3 flex-col">
        <div className="w-full ">
          <form className="w-full relative">
            <h2 className="w-full mb-1 block">Suggest Song</h2>
            <input
              className="rounded-sm w-[30%] p-[.4rem] sm:w-full "
              type="search"
              value={query}
              onChange={handleQueryChange}
              placeholder="Search for a playlist"
            />
            {/* SELECTED SONG */}
            <div className=" w-[30%] sm:w-full grid gap-1 grid-cols-3 sm:grid-cols-2">
              {selectedSongs.map((song) => (
                <div
                  key={song.id}
                  className="selectedSong border border-[#f2a559] p-1 mt-2 rounded-3xl flex  items-center gap-2"
                >
                  <RxCrossCircled
                    className="active:scale-95 text-red-500 cursor-pointer"
                    onClick={() => removeSong(song.id)}
                  />
                  <p className="text-[13px] w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                    {song?.name}
                  </p>
                  <span className="hidden">{song.external_urls.spotify}</span>
                </div>
              ))}
            </div>
            {selectedSongs.length > 0 && (
              <>
                <h2 className="w-full py-1 block">Playlist Name</h2>
                <input
                  className="rounded-sm p-[.4rem] w-[30%] sm:w-full "
                  type="text"
                  placeholder="Enter playlist name"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                />
              </>
            )}
            {selectedSongs.length > 0 && (
              <div className="w-[30%] sm:w-full flex mt-2 items-center justify-center">
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
              <div className="searchLists w-[30%] sm:w-full border border-gray-200 rounded-[4px] absolute top-[70px] overflow-y-scroll bg-gray-50 h-[250px] p-1">
                {results?.length > 0 ? (
                  <ul className="space-y-2">
                    {loading ? (
                      <p>Loading...</p> // Render loading state while fetching results
                    ) : (
                      results.map((playlist) => (
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
                      ))
                    )}
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

      <h2 className="w-full px-3 mt-6 block">Spotify Playlists</h2>
      <div className="w-full grid grid-cols-5 sm:grid-cols-2 place-items-center content-center p-2 px-3 gap-3 overflow-y-scroll">
        {details?.map((i) => (
          <Link
            key={i._id}
            target="_blank"
            to={i.playListUrl}
            className="active:scale-95 cursor-pointer w-[95%] flex items-center gap-3 border border-[#f2a559] rounded-[4px] hover:bg-[#f2a559] p-[.4rem] px-3"
          >
            <BsSpotify size={20} className="text-green-500" />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {i.playListName}
            </span>
          </Link>
        ))}
      </div>
      <h2 className="w-full px-3 mt-6 block">Custom Playlists</h2>
      <div className="w-full grid grid-cols-5 sm:grid-cols-2 place-items-center content-center p-2 px-3 gap-3 overflow-y-scroll">
        {playlistDetails?.data?.map((i) => (
          <Link
            to={`/playlists/${i._id}`}
            key={i._id}
            className="active:scale-95 cursor-pointer w-[95%] flex items-center gap-2 border border-[#f2a559] rounded-[4px] hover:bg-[#f2a559] p-[.4rem] px-3"
          >
            <span className=" min-w-[20px]">
              <BiListUl size={20} className="text-green-500" />
            </span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {i.playlistName}
            </span>
          </Link>
        ))}
      </div>
    </TopNav>
  );
};

export default Playlist;
