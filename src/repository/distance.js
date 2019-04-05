import { randomNumber, simpleHash } from '../utils/utils';

const getDistanceFromGoogleApi = (fromLocation, toLocation) => {
  // I didn't want to connect my credit card to this project, so here is my mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        Math.floor(
          randomNumber(simpleHash(fromLocation) + simpleHash(toLocation)) * 1000
        ) + 'km'
      );
    }, Math.random() * 1000 + 500);
  });
};

export const getDistance = (fromLocation, toLocation) => {
  return new Promise(resolve => {
    const cachedDistance = getDistanceFromCache(fromLocation, toLocation);
    if (cachedDistance) {
      resolve(cachedDistance);
    }
    getDistanceFromGoogleApi(fromLocation, toLocation).then(distance => {
      cacheDistance(fromLocation, toLocation, distance);
      resolve(distance);
    });
  });
};

const getCacheKey = (fromLocation, toLocation) => {
  return `distance-${fromLocation}-${toLocation}`;
};

const cacheDistance = (fromLocation, toLocation, distance) => {
  localStorage.setItem(getCacheKey(fromLocation, toLocation), distance);
};

const getDistanceFromCache = (fromLocation, toLocation) => {
  return localStorage.getItem(getCacheKey(fromLocation, toLocation));
};
