import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import querystring from "query-string";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.AUTH_CALLBACK_URI;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    var url: string = "https://accounts.spotify.com/api/token";
    var form: object = {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    };
    var headers: any = {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    };

    axios
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
}
