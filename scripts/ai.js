const API_KEY = "KEY";
const modelEndpoint =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";


const genAI = async () => {
  console.log(window.list);
  const size = window.list.length;
  const algos = [
    "Bubble Sort",
    "Selection Sort",
    "Insertion Sort",
    "Merge Sort",
    "Quick Sort",
  ];
  const prompt = `based on the given array: ${window.list} and its size: ${size} can you tell which sorting algorithm can perform more efficiently also tell its reason
    available sorting algorithms: ${algos},give the response in below format:
    name_of_suggested_sorting_algo$reason(must be in 10 words)`;

  const response = await fetch(`${modelEndpoint}?key=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  const result = await response.json();
  const recommendation = result.candidates[0].content.parts[0].text;

  const sugg = recommendation.split("$");
  const reason = sugg[1];
  const sortalgo = sugg[0];

  document.getElementById("response-algo").textContent = sortalgo;
  document.getElementById("response-reason").textContent = reason;
};
