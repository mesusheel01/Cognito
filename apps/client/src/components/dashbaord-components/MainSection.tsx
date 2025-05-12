import axios from "axios";
import { useEffect } from "react";
import { contentAtom } from "../../store/atoms/contentStore";
import { useRecoilState, useRecoilValue } from "recoil";
import { loadingAtom } from "../../store/atoms/loadingStore";
import { ContentGrid } from "../ContentGrid";
import { modelAtom } from "../../store/atoms/model";

const MainSection = () => {
  const [contentModel, setContentModel] = useRecoilState(contentAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const isModelOpen = useRecoilValue(modelAtom)

  const fetchContent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/v1/content", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.contents) {
        setContentModel(res.data.contents);
      }
    } catch (err)
    {
      console.error("Error fetching content:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [isModelOpen]);

  console.log(contentModel);

  return (
    <div className="translate-x-10">
      {loading ? (
        <div>Loading...</div>
      ) : contentModel.length ? (
        <ContentGrid contents={contentModel} />
      ) : (
        <div>No content found.</div>
      )}
    </div>
  );
}

export default MainSection;
