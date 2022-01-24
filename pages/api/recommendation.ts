import { NextApiRequest, NextApiResponse } from "next";
import querystring from "query-string";
import axios from "axios";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var refreshToken = req.query.refresh_token;

  var url: string = "https://accounts.spotify.com/api/token";
  var form: object = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };
  var headers: any = {
    Authorization:
      "Basic " +
      Buffer.from(client_id + ":" + client_secret).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  };

  await axios
    .post(url, querystring.stringify(form), {
      headers: headers,
    })
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      res.status(error.status).json(error.response.data);
    });
}
