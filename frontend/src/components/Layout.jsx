import { memo, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useGetMeQuery } from "../services/Service";
import { useDispatch } from "react-redux";
import { updateCompanyInfo } from "../store/reducers/companyDataReducer";
import Navbar from "./Navbar";

export default memo(function Layout({ children }) {
  const { data, isLoading, isSuccess } = useGetMeQuery("", {
    pollingInterval: 5000,
  });
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token == null) {
      navigate("/lending");
    }
  }, [token]);
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        updateCompanyInfo({
          name: data?.name,
          img: data?.logo,
          email: data?.email,
          username: data?.username,
        })
      );
    }
  }, [data]);
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="w-full pl-60">
        <Navbar />
        <div className="h-full min-h-[100vh] bg-light pt-16">
          <Outlet context={[isLoading]} />
          {children}
        </div>
      </div>
    </div>
  );
});
