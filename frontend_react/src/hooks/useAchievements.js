import { useEffect, useState } from 'react';
import { client } from '../client';

const ACHIEVEMENTS_QUERY = `*[_type == "achievements"] | order(date desc) {
  _id, title, type, organizer, date, result, description, link, featured, image,
  "project": project->{ title, "slug": coalesce(slug.current, _id) }
}`;

// Shared between the home strip, the achievements page and project pages
let achievementsRequest;
// The resolved list. Pages mounted after the first load render with it straight away, which the
// cover-to-page view transition relies on (the new page has to exist when the browser snapshots it).
let achievementsCache;

const fetchAchievements = () => {
  if (!achievementsRequest) {
    achievementsRequest = client.fetch(ACHIEVEMENTS_QUERY)
      .then((result) => {
        achievementsCache = result;
        return result;
      })
      .catch((err) => {
        achievementsRequest = undefined;
        throw err;
      });
  }
  return achievementsRequest;
};

const useAchievements = () => {
  const [state, setState] = useState(() => (achievementsCache
    ? { achievements: achievementsCache, loading: false, error: false }
    : { achievements: [], loading: true, error: false }));

  useEffect(() => {
    if (achievementsCache) return undefined;
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
