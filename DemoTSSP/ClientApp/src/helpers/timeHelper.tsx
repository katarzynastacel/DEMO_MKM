export const getTimeFromDate = () => {
  let date = new Date();

  let hour: any = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  let min: any = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  let sec: any = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  return hour + ":" + min + ":" + sec;
};
