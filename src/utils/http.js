const getDetailsFromAPI = async (url) => {
  const init = {
    method: "GET",
    body: null,
  };

  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error("Fail to fetch data");
  }

  const data = await response.json();
  return data;
};

export { getDetailsFromAPI };
