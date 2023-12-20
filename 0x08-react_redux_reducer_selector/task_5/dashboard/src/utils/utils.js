const getFullYear = () => {
  return (new Date().getFullYear());
}

const getFooterCopy = (isIndex) => {
  if (isIndex) {
    return "Holberton School";
  } else {
    return "Holberton School main dashboard";
  }
}

const getLatestNotification = () => {
  return "<strong>Urgent requirement</strong> - complete by EOD";
}

const utils = { getFullYear, getFooterCopy, getLatestNotification };

export default utils;
