  // Formate datetime string
  export const convertDate = (dateStr: any) => {
    const date: any = new Date(dateStr);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });
  };