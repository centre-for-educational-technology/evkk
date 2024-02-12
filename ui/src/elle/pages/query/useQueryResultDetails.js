import { useState } from "react";
import { loadFetch } from "../../service/LoadFetch";

export default function useQueryResultDetails(id) {
  const [modalOpen, setModalOpen] = useState(false);
  const [metadata, setMetadata] = useState({
    title: "",
    korpus: "",
    tekstityyp: "",
    tekstikeel: "",
    keeletase: "",
    abivahendid: "",
    aasta: "",
    vanus: "",
    sugu: "",
    haridus: "",
    emakeel: "",
    riik: "",
  });
  const [text, setText] = useState("");

  const previewText = (id) => {
    console.log(id);
    loadFetch("/api/texts/kysitekstimetainfo?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        let tempMetaData = metadata;
        result.forEach((param) => {
          tempMetaData = {
            ...tempMetaData,
            [param.property_name]: param.property_value,
          };
        });
        setMetadata(tempMetaData);
      });

    loadFetch("/api/texts/kysitekst?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((result) => {
        console.log(result);
        setText(result);
      });

    setModalOpen(true);
  };

  return { previewText, metadata, text, modalOpen, setModalOpen };
}
