import { getCookie } from "../../utils/constants";
import { API_BASE_URL } from "../../utils/constants";
export const getUserInfo = async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getCookie("access_token")}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    const res = await fetch(
      `${API_BASE_URL}/api/user/user-info`,
      requestOptions
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
