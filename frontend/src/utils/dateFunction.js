export function formatReleaseDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDate(dateInput, monthFormat = "short", format = "MM DD YYYY") {
  const date = new Date(dateInput);
  if (isNaN(date)) {
    throw new Error("Invalid date input");
  }

  const day = date.getDate();
  const month = getMonthName(date, monthFormat); // Get the month name in short or long format
  const year = date.getFullYear();

  // Optionally include time formatting if needed
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Construct the formatted date based on the format provided
  let formattedDate = format;

  formattedDate = formattedDate.replace("YYYY", year);
  formattedDate = formattedDate.replace("MM", month); // Replace month
  formattedDate = formattedDate.replace("DD", day.toString().padStart(2, "0"));

  // If the format includes time, add it
  if (
    formattedDate.includes("HH") ||
    formattedDate.includes("mm") ||
    formattedDate.includes("ss")
  ) {
    formattedDate = formattedDate.replace("HH", hours);
    formattedDate = formattedDate.replace("mm", minutes);
    formattedDate = formattedDate.replace("ss", seconds);
  }

  return formattedDate;
}

// Helper function to get the month name
function getMonthName(date, format = "short") {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: format === "short" ? "short" : "long",
  });
  return formatter.format(date);
}
