import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../config/axios";

export default function ViewProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const res = await api.get(`/viewProfile/${id}`);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>
    </div>
  );
}
