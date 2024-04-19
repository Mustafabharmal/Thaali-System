import React, { useState, useEffect, useContext } from "react";

const AuthContext = React.createContext({
  token: "",
  email: "",
  name: "",
  role: "",
  communityid: "",
  thaaliuser: "",
  headcount: "",
  phoneno: "",
  address: "",
  userid: "",
  isLoggedIn: false,
  login: (
    token,
    expirationTime,
    email,
    id,
    name,
    role,
    communityid,
    thaaliuser,
    headcount,
    phoneno,
    address
  ) => { },
  logout: () => { },
  updateUser: (userData) => { },
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token") || "";
  const initialEmail = localStorage.getItem("email") || "";
  const initialName = localStorage.getItem("name") || "";
  const initialRole = localStorage.getItem("role") || "";
  const initialCommunityId = localStorage.getItem("communityid") || "";
  const initialThaaliUser = localStorage.getItem("thaaliuser") || "";
  const initialHeadCount = localStorage.getItem("headcount") || "";
  const initialPhoneNo = localStorage.getItem("phoneno") || "";
  const initialAddress = localStorage.getItem("address") || "";
  const initialUserId = localStorage.getItem("userid") || "";

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState(initialName);
  const [role, setRole] = useState(initialRole);
  const [communityid, setCommunityId] = useState(initialCommunityId);
  const [thaaliuser, setThaaliUser] = useState(initialThaaliUser);
  const [headcount, setHeadCount] = useState(initialHeadCount);
  const [phoneno, setPhoneNo] = useState(initialPhoneNo);
  const [address, setAddress] = useState(initialAddress);
  const [userid, setUserId] = useState(initialUserId);

  const userIsLoggedIn = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("name");
    const storedRole = localStorage.getItem("role");
    const storedCommunityId = localStorage.getItem("communityid");
    const storedThaaliUser = localStorage.getItem("thaaliuser");
    const storedHeadCount = localStorage.getItem("headcount");
    const storedPhoneNo = localStorage.getItem("phoneno");
    const storedAddress = localStorage.getItem("address");
    const storedUserId = localStorage.getItem("userid");

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedName) {
      setName(storedName);
    }
    if (storedRole) {
      setRole(storedRole);
    }
    if (storedCommunityId) {
      setCommunityId(storedCommunityId);
    }
    if (storedThaaliUser) {
      setThaaliUser(storedThaaliUser);
    }
    if (storedHeadCount) {
      setHeadCount(storedHeadCount);
    }
    if (storedPhoneNo) {
      setPhoneNo(storedPhoneNo);
    }
    if (storedAddress) {
      setAddress(storedAddress);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const logoutHandler = () => {
    setToken("");
    setEmail("");
    setName("");
    setRole("");
    setCommunityId("");
    setThaaliUser("");
    setHeadCount("");
    setPhoneNo("");
    setAddress("");
    setUserId("");
    localStorage.clear();
  };

  const loginHandler = (
    token,
    expirationTime,
    email,
    id,
    name,
    role,
    communityid,
    thaaliuser,
    headcount,
    phoneno,
    address
  ) => {
    setToken(token);
    setEmail(email);
    setName(name);
    setRole(role);
    setCommunityId(communityid);
    setThaaliUser(thaaliuser);
    setHeadCount(headcount);
    setPhoneNo(phoneno);
    setAddress(address);
    setUserId(id);
    localStorage.setItem("token", token);
    localStorage.setItem("userid", id);
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
    localStorage.setItem("role", role);
    localStorage.setItem("communityid", communityid);
    localStorage.setItem("thaaliuser", thaaliuser);
    localStorage.setItem("headcount", headcount);
    localStorage.setItem("phoneno", phoneno);
    localStorage.setItem("address", address);

    const remainingTime = calculateRemainingTime(expirationTime);
    setTimeout(logoutHandler, remainingTime);
    console.log(
      "LoginHandler: ",
      id,
      token,
      email,
      name,
      role,
      communityid,
      thaaliuser,
      headcount,
      phoneno,
      address
    );
  };

  const updateUserHandler = (userData) => {
    // Update user data in the context
    // setToken(userData.token);
    setEmail(userData.email);
    setName(userData.name);
    setRole(userData.role);
    setCommunityId(userData.communityid);
    setThaaliUser(userData.thaaliuser);
    setHeadCount(userData.headcount);
    setPhoneNo(userData.phoneno);
    setAddress(userData.address);
    setUserId(userData.userid);
    // localStorage.setItem("token", userData.token);
    localStorage.setItem("userid", userData.userid);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("name", userData.name);
    localStorage.setItem("role", userData.role);
    localStorage.setItem("communityid", userData.communityid);
    localStorage.setItem("thaaliuser", userData.thaaliuser);
    localStorage.setItem("headcount", userData.headcount);
    localStorage.setItem("phoneno", userData.phoneno);
    localStorage.setItem("address", userData.address);
  };

  const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjustedExpirationTime = new Date(expirationTime).getTime();

    return adjustedExpirationTime - currentTime;
  };

  const contextValue = {
    token: token,
    email: email,
    name: name,
    role: role,
    communityid: communityid,
    thaaliuser: thaaliuser,
    headcount: headcount,
    phoneno: phoneno,
    address: address,
    userid: userid,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    updateUser: updateUserHandler, 
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
