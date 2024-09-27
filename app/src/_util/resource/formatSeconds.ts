export default function formatSeconds(seconds: number, includeOriginalSeconds?: boolean): string {
  // Calculate the hours, minutes, and seconds
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);
  const remainingSeconds: number = seconds % 60;

  let outputString = ''
  if(hours > 0) {
    outputString = `${outputString}${hours}h `;
  }
  if(minutes > 0) {
    outputString = `${outputString}${minutes}m `;
  }
  if(remainingSeconds > 0) {
    outputString = `${outputString}${remainingSeconds}s`;
  }
  return includeOriginalSeconds ? `${outputString} (${seconds}s)` : outputString
}