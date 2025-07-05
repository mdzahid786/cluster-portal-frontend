import { useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import ClusterCard from "./ClusterCard";
import "../App.css";
export default function Dashboard() {
  const { http, getUser } = AuthUser();
  const [clusters, setClusters] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser(getUser());
    fetchUserDetails();
  }, []);
  const fetchUserDetails = () => {
    http.get("/clusters/").then((res) => {
      setClusters(res.data);
    });
  };

  const handleUpdate = async (id, servers) => {
    setLoading(true);
    try {
      await http.put(`/cluster/${id}`, { id, servers });
      const res = await http.get("/clusters/");
      setClusters(res.data);
    } catch (err) {
      console.error("Failed to update cluster:", err);
    } finally {
      setLoading(false);
    }
  };

  function renderElement() {
    if (clusters && !loading) {
      return (
        <div className="clusters-grid">
          {clusters.map((cluster) => (
            <ClusterCard
              key={cluster.id}
              cluster={cluster}
              isAdmin={user.Role === "admin"}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      );
    } else {
      return <div>Loading....</div>;
    }
  }
  return <div>{renderElement()}</div>;
}
