import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import TopNav from "../../components/TopNav/TopNav";
import { API } from "../../utils/URL";
import { BsMusicNote, BsPlayFill } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";

const CustomPlaylists = () => {
  const { id } = useParams();
  const [getLists, setGetLists] = useState([]);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);

  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/api/auth/suggest_playlist/${id}`
        );
        const data = response.data;
        if (isMounted) {
          setGetLists(data?.details);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

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

  const playListId = location.pathname.split("/")[2];

  const handleToAddPlaylist = (e) => {
    e.preventDefault();
    const playlistData = {
      songs: selectedSongs.map((song) => {
        // console.log(song);
        return {
          name: song?.name,
          externalUrl: song?.external_urls?.spotify,
        };
      }),
    };

    axios
      .post(`${API}/api/auth/add-more-songs/${playListId}`, playlistData)
      .then((response) => {
        setSelectedSongs([]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <TopNav routeLink={"/playlists"} barTitle={getLists.playlistName}>
      <div className="w-full px-3 mt-3 flex items-center gap-3 flex-col">
        <div className="w-full px-3 mt-3 flex items-center gap-3 flex-col">
          {/* ------------SPOTIFY SEARCH-------------------------- */}
          <div className="w-full  ">
            <form className="w-full relative">
              <h2 className="w-full mb-1 block">Add More Song</h2>
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
                <div className="w-[30%] sm:w-full flex mt-2 items-center ">
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

          {/* ------------SPOTIFY SEARCH-------------------------- */}
          <div className="w-full grid grid-cols-5 sm:grid-cols-2 place-items-center content-center p-2 px-3 gap-3">
            {getLists.songs?.map((i) => (
              <Link
                to={i.externalUrl}
                target="_blank"
                className="active:scale-95 cursor-pointer w-[95%] flex items-center gap-3 border border-[#f2a559] rounded-[4px] hover:bg-[#f2a559] p-[.4rem] px-3"
                key={i?._id}
              >
                <BsMusicNote size={18} className="text-green-500" />

                <p className=" moving-text text-[13px] w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                  {i?.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </TopNav>
  );
};

export default CustomPlaylists;
