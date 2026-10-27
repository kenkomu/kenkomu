import { useEffect, useState } from 'react';
import { client } from '../client';

const WORKS_QUERY = `*[_type == "works"] | order(coalesce(featured, false) desc, coalesce(year, 0) desc, _createdAt desc) {
  _id, title, description, projectLink, codeLink, imgUrl, gallery, tags, stack, highlights,
  featured, year, role, client, status, "slug": slug.current
}`;

// Shared between the hero stats and the Work section so the page makes one request.
let worksRequest;

const fetchWorks = () => {
  if (!worksRequest) {
    worksRequest = client.fetch(WORKS_QUERY).catch((err) => {
      worksRequest = undefined;
      throw err;
    });
  }
  return worksRequest;
};

export const workSlug = (work) => work.slug || work._id;

const useWorks = () => {
  const [state, setState] = useState({ works: [], loading: true, error: false });

  useEffect(() => {
    let active = true;
    fetchWorks()
      .then((works) => active && setState({ works, loading: false, error: false }))
      .catch(() => active && setState({ works: [], loading: false, error: true }));
    return () => {
      active = false;
    };
  }, []);

  return state;
};

export default useWorks;
