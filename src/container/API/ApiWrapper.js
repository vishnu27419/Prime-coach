import axios from "axios";
import { Server } from "http";
import querystring from "querystring";

// ***live-Server***//
const BASE_URL = "http://prime-coach.co.uk/backend";

// ***local-Server    <---This is Not Working Yet ***//
// const BASE_URL = "https://prime-coach.co.uk/developers/backend";

export async function standardPostApi(
  endpoint,
  headers,
  params,
  pushLoginToUnauth = true,
  showErrorAlert = true
) {
  const TOKEN = await localStorage.getItem("access_token");
  const res = await axios.post(
    `${BASE_URL}/api/${endpoint}`,
    querystring.stringify({ ...params, AccessToken: TOKEN }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headers,
      },
    }
  );
  if (res.data.code === 401) {
    console.log("REMOVED ACCESS TOKEN !");
    window.location.href = "/loginsection/athlete/coach";
    localStorage.removeItem("access_token");
    localStorage.removeItem("access_role");
  }
  if (showErrorAlert && res.data.code !== 200 && res.data.message) {
    alert(res.data.message);
  }
  return res;
}

export async function standardPostApiJsonBased(
  endpoint,
  headers,
  params,
  pushLoginToUnauth = true,
  showErrorAlert = true,
  config
) {
  const TOKEN = await localStorage.getItem("access_token");

  const res = await axios.post(
    `${BASE_URL}/api/${endpoint}`,
    // querystring.stringify({ ...params, AccessToken: TOKEN }),{}
    params,
    config,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
    }
  );
  if (res.data.code === 401) {
    console.log("REMOVED ACCESS TOKEN !");
    window.location.href = "/loginsection/athlete/coach";
    localStorage.removeItem("access_token");
    localStorage.removeItem("access_role");
    localStorage.removeItem("primeCoachStore");
  }
  if (showErrorAlert && res.data.code !== 200 && res.data.message) {
    alert(res.data.message);
  }
  return res;
}
