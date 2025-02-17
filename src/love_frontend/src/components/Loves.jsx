import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { love_backend } from "declarations/love_backend";
import { useAuth } from "./auth";
const HomePage = () => {
  const router = useNavigate();
  const [data, setData] = useState([]);
  const { isAuthenticated, login, principal, logout } = useAuth();
  if (!isAuthenticated) {
    router("/");
  }
  useEffect(() => {
    love_backend.get_all_users().then((result) => {
      console.log(result, "results");
      setData(result);
    });
  }, []);
  console.log("data", data);
  return (
    <div className="h-full max-w-[1300px] mx-auto mt-3">
     
      <div className="h-[100vh]">
        {data.length == 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="font-bold">No users available</h1>
            <button>
              navigate to create profile to create your profile for others to
              see you
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 mt-4">
            {data.map((val, _index) => (
              <div className="" key={_index}>
                <div className="border p-3 rounded-md ">
                  <h1 className="">
                    name<span className="opacity-70 pl-3">{val.username}</span>
                  </h1>

                  <img
                    src={val?.image}
                    alt={val.username}
                    className="w-full h-[200px] rounded-md"
                  />
                  <p>
                    gender<span className="opacity-70 pl-3">{val.gender}</span>
                  </p>

                  <button
                    className="bg-blue-400 p-2 rounded-md"
                    onClick={() => router(`/aboutuser/${val.username}`)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
