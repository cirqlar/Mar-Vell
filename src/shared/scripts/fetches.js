
function getUrl(relative) {
  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = `http://localhost:${process.env.REACT_APP_API_PORT}`;
  } else {
    baseUrl = window.location.origin;
  }

  let url;

  if (URL) {
    url = new URL(`/api${relative}`, baseUrl);
  } else {
    url = new window.URL(`/api${relative}`, baseUrl);
  }

  return url;
}

export async function fetchAllComics(comics, titleStartsWith, sortBy, direction, offset) {
  let url = getUrl("/characters/1010338/comics");

  if (titleStartsWith) {
    url.searchParams.set('titleStartsWith', titleStartsWith);
  }
  if (offset) {
    url.searchParams.set('offset', offset);
  }
  if (sortBy && sortBy !== "none") {
    let value = direction === "up" ? sortBy : "-" + sortBy;
    url.searchParams.set('orderBy', value);
  }

  let result = await fetch(url);
  let data = await result.json();

  console.log("dataList", data);
  return data;
}

export async function fetchComic(comic, id) {
  let url = getUrl(`/comics/${id}`);

  let results = await fetch(url);
  let result = await results.json();

  if (result.code !== 200) throw new Error(result);
  console.log("dataItem", result.data.results[0]);
  return result.data.results[0];
}