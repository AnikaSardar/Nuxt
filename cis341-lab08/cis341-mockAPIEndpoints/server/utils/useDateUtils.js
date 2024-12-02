export const useDateUtils = () => {
  const dateString = (date) => {
    try {
      return new Date(date).toDateString();
    } catch (err) {
      return err;
    }
  };

  return { dateString };
};
