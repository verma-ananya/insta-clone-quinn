import moment from 'moment';

export const isEmpty = object => {
  if(object===[] || object==={}) return true;
  else return false;
}

export const isNil = object => {
  if(object===null) return true;
  else return false;
}

export const formatDate = (dateStr, n) => {
  return dateStr.slice(0,n);
}

export const beautifyDate = (dateStr) => {

  var date = moment(dateStr).utcOffset("+05:30").format("MMMM Do YYYY");
  return date;

}

export const postSortCompare = (a,b) => {
  if (a.timeInSeconds < b.timeInSeconds) return -1;
  else if (a.timeInSeconds > b.timeInSeconds) return 1;
  else return 0;
}

export default {
  isEmpty,
  isNil,
  formatDate,
  postSortCompare
};