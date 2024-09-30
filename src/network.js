import { JSDOM } from "jsdom";

const BMKG_URL = "https://www.bmkg.go.id/gempabumi-dirasakan.html";

export async function getEarthquakeDOM() {
  try {
    const request = await fetch(BMKG_URL);
    const bmkgHTML = await request.text();
    const bmkg = new JSDOM(bmkgHTML);
    return bmkg.window.document;
  } catch (error) {
    return null;
  }
}
