import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import axios from "axios";
import { BackgroundGradient } from "../components/GradientBackground";

let cache = [];

function Home() {
  const events = [
    {
      name: "Hardware Hacking",
      link: "https://script.google.com/macros/s/AKfycbwb5rzgMzl0gVY4LfuyViUoBsouuAfBrZoF5ZdM9rqTWPJvnc_F_ogHr-5uhUepr_eU/exec",
    },
    {
      name: "Photography",
      link: "https://script.googleusercontent.com/macros/echo?user_content_key=-wgM5G-Zk6W4tfEAthwwaNxF7w0j-wq5qe08uvdfg1MfFGHILbVMAZL65_3SGBZ96JticO52JvoeJX6cRm3L6J4JOgwZ6SqZm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMcJtYF0Sp5XUf7OJfkq0nDX79tZPJlN85Grbl1OkGutOg_m0CSnhzT9tzy4Y_fW99qjWshmLSWXCrSWz6HoG4L_dOGax1gPMdz9Jw9Md8uu&lib=MlLivag4QydB6ISYGh3ViidkEWIrcXDKX",
    },
    {
      name: "Investigation",
      link: "https://script.google.com/macros/s/AKfycbxbea-EUm2__u1WhDlCRe8VHgARQ4lUQi6jl9b6DtzZQBiDiHzKxxpM_kx-jTF6CBWr/exec",
    },
    {
      name: "Debugging",
      link: "https://script.google.com/macros/s/AKfycbzvclGymNksa0nPtzEfYMm7PTEWdQvO_LrS5XCHOV1uyPP-pub5Wfsq451P0C29pm-d/exec",
    },
    {
      name: "BGMI",
      link: "https://script.google.com/macros/s/AKfycbzWG3VS0ZzHmVXEIebjDfOpyQhV11XuuaiHmrHd4K0ewKn1sf2Ox2gvBPS6VwoNb4I/exec",
    },
    {
      name: "FREE FIRE",
      link: "https://script.google.com/macros/s/AKfycbygY2UKUSITG_TTh6FHLjpKBtYFfFJqwZVa-wcb_1ZXteea3T8Iv-7u0RP2OFoGyF1l/exec",
    },
  ];

  const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cache.length) {
      setEventList(cache);
      setIsLoading(false);
      return;
    }

    const getData = async (name, link) => {
      try {
        const data = (await axios.get(link)).data.data;
        const eventObj = {
          title: name,
          count: data ? data.length : 0,
          reg: data ? data : [],
        };
        cache.push(eventObj);
        return eventObj;
      } catch (error) {
        console.log(error);
        return;
      }
    };
    (async () => {
      const promise = [];
      for (const index in events) {
        promise.push(getData(events[index].name, events[index].link));
      }
      const result = await Promise.all(promise);
      setEventList(result.filter((item) => item != undefined));
      setIsLoading(false);
    })();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <>
      <Navbar />
      <main className="px-10 flex justify-center mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {eventList.map((event) => (
            <BackgroundGradient>
              <EventCard
                title={event.title}
                count={event.count}
                reg={event.reg}
              />
            </BackgroundGradient>
          ))}
        </div>
      </main>
    </>
  );
}

export default Home;
