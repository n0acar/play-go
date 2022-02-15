import { NextApiRequest, NextApiResponse } from "next";
import querystring from "query-string";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.AUTH_CALLBACK_URI;
var scope = process.env.SPOTIFY_SCOPE;

const generateRandomAlphanumericString = (length: number) => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  var state = generateRandomAlphanumericString(16);

  //TODO: auth all the time to see user change
  res.status(200).send(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
}
