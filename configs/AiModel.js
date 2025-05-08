export const generateTripPlan = async (prompt) => {
  try {
    const response = await fetch(
      "https://us-central1-project-in-uit.cloudfunctions.net/api/generate", // 🔁 Thay đúng URL của bạn
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      return data.result;
    } else {
      throw new Error(data.error || "Unknown error from Gemini API");
    }
  } catch (error) {
    console.error("Error from generateTripPlan:", error);
    throw error;
  }
};
