const toDaysMinutesSeconds = (totalSeconds) => {
    //takes the time in seconds from the API and returns a string in a more understandable format
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const days = Math.floor(totalSeconds / (3600 * 24));
  
    const secondsStr = `${seconds}s`;
    const minutesStr = `${minutes}m`;
    const hoursStr = `${hours}h`;
    const daysStr = `${days}d`;
  
    return `${days ? daysStr : ''} ${hours ? hoursStr : ''} ${minutes ? minutesStr : ''} ${secondsStr}`;
}

export default toDaysMinutesSeconds;
  