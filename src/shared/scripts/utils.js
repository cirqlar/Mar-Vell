export function imgString(img, size) {
  let path = `${img.path}/${size}.${img.extension}`;
  let url;
  if (URL) {
    url = new URL(path);
  } else {
    url = new window.URL(path);
  }
  url.protocol = "https:";
  return url.href;
}
