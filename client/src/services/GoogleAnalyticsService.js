import ReactGA from "react-ga4";

export const initializeAnalytics = () => {
  ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
};

export const trackPageView = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

export const trackEvent = ({
  category,
  action,
  label,
}) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};