import { NextApiRequest, NextApiResponse } from "next";
import querystring from "query-string";
import axios from "axios";

async function getTopTracks(accessToken: string) {
  var url: string = "https://api.spotify.com/v1/me/top/tracks";
  var params = { limit: 10, timeRange: "short_term" };
  var headers: any = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  await axios
    .get(querystring.stringifyUrl({ url: url, query: params }), {
      headers: headers,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var accessToken = req.query.access_token;
  var topItems = await getTopTracks(accessToken as string);
}
