import {queryStore} from "../store/QueryStore";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Wordlist() {

  const navigate = useNavigate();

  useEffect(() => {
    if (!queryStore.getState()) {
      navigate(-1);
    }
  }, [navigate]);

  return (
    <></>
  );
}
