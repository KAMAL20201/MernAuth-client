import { useCallback, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess } from "./redux/user/userSlice";
import { API_BASE_URL, getCookie } from "../utils/constants";
import { setCookie } from "nookies";
import { getUserInfo } from "./services/user.service";
export default function Container({ children }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const getMyUserInfo = async () => {
    try {
      const userInfo = await getUserInfo();
      dispatch(signInSuccess(userInfo));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!currentUser) {
      const accessTokenCookie = getCookie("access_token");

      if (accessTokenCookie) {
        const decodedUserData = jwtDecode(accessTokenCookie);

        if (typeof decodedUserData === "object") {
          dispatch(signInStart());
          getMyUserInfo();
          return;
        }
      }
    }
  }, [currentUser]);

  const handleWindowLoad = useCallback(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response) => {
        const decoded = jwtDecode(response.credential);
        const { name, picture, email } = decoded;
        const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
          },
          body: JSON.stringify({
            name,
            email,
            photo: picture,
          }),
        });
        const data = await res.json();
        setCookie(null, "access_token", data.token, {
          path: "/",
          maxAge: 24 * 60 * 60, // 1 day
        });
        dispatch(signInSuccess(data));
      },
    });
    google.accounts.id.prompt();
  }, []);

  useEffect(() => {
    if (currentUser) return;

    const timer = setTimeout(() => {
      handleWindowLoad();
    }, 1100);

    return () => clearTimeout(timer);
  }, [currentUser, handleWindowLoad]);

  return <div className="flex w-full h-full">{children}</div>;
}
