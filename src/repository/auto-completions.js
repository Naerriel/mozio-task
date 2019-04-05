const LOCATIONS_KEY = 'LOCATIONS_KEY';

export const saveLocation = location => {
  const locations = getLocations();
  if (!locations.includes(location)) {
    locations.push(location);
    localStorage.setItem(LOCATIONS_KEY, JSON.stringify(locations));
  }
};

export const getLocations = () => {
  const locations = localStorage.getItem(LOCATIONS_KEY);
  if (locations && locations !== 'undefined') {
    return JSON.parse(locations);
  } else {
    return [];
  }
};
