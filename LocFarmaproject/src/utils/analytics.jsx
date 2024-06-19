import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-1SYLGSF4WH');
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};