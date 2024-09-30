import { getEarthquakeDOM } from "../src/network";

const API_KEY = "apps-demo-key";

export async function GET(req) {
  const query = new URL(req.url);
  const params = query.searchParams;
  const apiKey = params.get("apiKey");
  const isDanger = params.get("isDanger");

  if (!apiKey || apiKey !== API_KEY) {
    return Response.json({ message: "unauthorized" });
  }

  const bmkgDOM = await getEarthquakeDOM();
  const earthquakes = Array.from(bmkgDOM.querySelectorAll("tr"));
  earthquakes.shift();

  let mappedEarthquakes = earthquakes.map((earthquake) => {
    const row = earthquake.querySelectorAll("td");
    return {
      time: row[1]?.innerHTML,
      latLng: row[2]?.innerHTML,
      magnitudo: Number(row[3]?.innerHTML),
      depth: row[4]?.innerHTML,
      mmi: row[5]?.querySelector("a")?.innerHTML,
      mmiWarnings: Array.from(row[5]?.querySelectorAll(".label-warning")).map(
        (warning) => warning?.innerHTML
      ),
      map: earthquake.querySelector("img").getAttribute("src"),
    };
  });
  
  if (isDanger && isDanger === "true") {
    mappedEarthquakes = mappedEarthquakes.filter(
      (earthquake) => earthquake.magnitudo >= 5
    );
  }

  return Response.json({ data: mappedEarthquakes });
}
