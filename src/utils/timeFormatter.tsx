export default (time: Date) => {
  const timeDifference = new Date().getTime() - new Date(time).getTime();

  if (timeDifference < 60 * 1000) {
    return 'Just Now';
  } else if (timeDifference < 60 * 60 * 1000) {
    const td = Math.trunc(timeDifference / 1000 / 60);
    return `${Math.trunc(td)} minute${td > 1 ? 's' : ''} ago`;
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    const td = Math.trunc(timeDifference / 1000 / 60 / 60);
    return `${Math.trunc(td)} hour${td > 1 ? 's' : ''} ago`
  } else if (timeDifference < 30 * 24 * 60 * 60 * 1000) {
    const td = Math.trunc(timeDifference / 1000 / 60 / 60 / 24);
    return `${Math.trunc(td)} day${td > 1 ? 's' : ''} ago`
  } else if (timeDifference < 12 * 30 * 24 * 60 * 60 * 1000) {
    const td = Math.trunc(timeDifference / 1000 / 60 / 60 / 24 / 30);
    return `${Math.trunc(td)} month${td > 1 ? 's' : ''} ago`
  } else {
    const td = Math.trunc(timeDifference / 1000 / 60 / 60 / 24 / 30 / 12);
    return `${Math.trunc(td)} year${td > 1 ? 's' : ''} ago`
  }
}