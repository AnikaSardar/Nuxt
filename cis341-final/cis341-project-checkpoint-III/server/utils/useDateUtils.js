export const useDateUtils = () => {
  // for changing date to string
  const dateString = (date) => {
    try {
      return new Date(date).toDateString();
    } catch (err) {
      return err;
    }
  };

  return { dateString };
};
