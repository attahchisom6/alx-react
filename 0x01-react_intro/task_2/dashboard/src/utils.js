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
  return "<p><strong>Urgent requirement</strong> - complete by EOD</p>";
}

const utils = { getFullYear, getFooterCopy, getLatestNotification };

export default utils;
