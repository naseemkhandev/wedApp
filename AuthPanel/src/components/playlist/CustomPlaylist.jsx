import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link} from "react-router-dom";
import { API } from "../../utils/URL";
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import BASE_URL from './../BASE_URL';
const CustomPlaylists = ({ uid }) => {
  const [getLists, setGetLists] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/auth/suggest_playlist/${uid}`
        );
        const data = response.data;
        // console.log(data);
        setGetLists(data?.details);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [uid]);

  // console.log(getLists);
  return (
    <>
      <div className="w-full px-3 mt-3 flex items-center gap-3 flex-col">
        <div className=" w-full grid gap-1 grid-cols-1 overflow-y-auto">
          {getLists.songs?.map((i) => (
            <Link
              to={i.externalUrl}
              target="_blank"
              className="moving-text-container bg-white px-[6px] py-2 border border-gray-300 cursor-pointer rounded-md flex items-center gap-2 hover:bg-gray-50 active:scale-95"
              key={i?._id}
            >
              <MusicNoteOutlinedIcon size={18} className="text-green-500" ></MusicNoteOutlinedIcon>

              <p className=" moving-text text-[13px] w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                {i?.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomPlaylists;
