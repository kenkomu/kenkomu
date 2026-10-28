import { useEffect, useState } from 'react';
import { client } from '../client';

const ACHIEVEMENTS_QUERY = `*[_type == "achievements"] | order(date desc) {
  _id, title, type, organizer, date, result, description, link, featured, image,
  "project": project->{ title, "slug": coalesce(slug.current, _id) }
}`;

// Shared between the home strip, the achievements page and project pages
let achievementsRequest;

const fetchAchievements = () => {
  if (!achievementsRequest) {
    achievementsRequest = client.fetch(ACHIEVEMENTS_QUERY).catch((err) => {
      achievementsRequest = undefined;
      throw err;
    });
  }
  return achievementsRequest;
};

const useAchievements = () => {
  const [state, setState] = useState({ achievements: [], loading: true, error: false });

  useEffect(() => {
    let active = true;
    fetchAchievements()
      .then((achievements) => active && setState({ achievements, loading: false, error: false }))
      .catch(() => active && setState({ achievements: [], loading: false, error: true }));
    return () => {
      active = false;
    };
  }, []);

  return state;
};

export default useAchievements;
