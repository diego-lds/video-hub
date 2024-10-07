export const secondsToMinutes = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};
export const formatDateString = (dateString: string): string => {
  const dateFormatted = new Intl.DateTimeFormat("pt-BR").format(
    new Date(dateString)
  );

  return dateFormatted;
};
