import { Machine, assign } from "xstate";
import Cookie from "universal-cookie";

const cookie = new Cookie();

const generateExpirationDate = (days) => {
  const date = new Date();
  const expertionTime = days * 24 * 60 * 60 * 1000;
  date.setTime(date.getTime() + expertionTime);
  return date;
};

const createRefreshTokenCookie = (refresh_token) => {
  const expiration = generateExpirationDate(30);
  const options = {
    expires: expiration,
    path: "/",
  };
  cookie.set("refresh_token", refresh_token, options);
};

const clearCookie = () => {
  cookie.remove("refresh_token");
};

const getCookie = () => {
  return cookie.get("refresh_token");
};

const fetchUser = async ({ username, password }) => {
  const res = await fetch("https://freddy.codesubmit.io/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const tokens = await res.json();
  createRefreshTokenCookie(tokens.refresh_token);
  return tokens;
};

const refreshYourToken = async () => {
  const refreshToken = getCookie();
  const res = await fetch("https://freddy.codesubmit.io/refresh", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return res.json();
};

export const authMachine = Machine(
  {
    id: "auth",
    initial: "refresh",
    context: {
      accessToken: "",
      refreshToken: "",
    },
    states: {
      login: {
        invoke: {
          id: "getUser",
          src: (context, event) => fetchUser(event.data),
          onDone: {
            actions: assign({
              accessToken: (context, event) => event.data.access_token,
              refreshToken: (context, event) => event.data.refresh_token,
            }),
          },
          onError: {
            target: "logout",
            actions: {
              error: (context, event) => console.log("error", event.data),
            },
          },
        },
        after: {
          900000: "refresh",
        },
        on: { LOGOUT: "logout" },
      },
      refresh: {
        after: {
          900000: "refresh",
        },
        always: [{ target: "logout", cond: "isRefreshExpired" }],
        invoke: {
          id: "getUser",
          src: (context, event) => refreshYourToken(),
          onDone: {
            actions: assign({
              accessToken: (context, event) => event.data.access_token,
            }),
          },
          onError: {
            target: "logout",
            actions: {
              error: (context, event) =>
                console.log("error on refresh", event.data),
            },
          },
        },
        on: { LOGOUT: "logout" },
      },
      logout: {
        entry: ["clearTokens"],
        on: { LOGIN: "login" },
      },
    },
  },
  {
    guards: {
      isRefreshExpired: (context, event) => {
        const isCookieAlive = getCookie();
        return isCookieAlive === undefined;
      },
    },
    actions: {
      clearTokens: assign((context) => {
        return {
          accessToken: "",
          refreshToken: "",
        };
      }),
    },
  }
);
