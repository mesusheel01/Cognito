import axios from "axios";
import { useEffect } from "react";
import { contentAtom } from "../../store/atoms/contentStore";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../store/atoms/loadingStore";
import { errorAtom } from "../../store/atoms/errorAtom";
import { ContentGrid } from "../ContentGrid";

const MainSection = () => {
  const [contentModel, setContentModel] = useRecoilState(contentAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [error, setError] = useRecoilState(errorAtom);

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
    } catch (err) {
      setError(err);
      console.error("Error fetching content:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  console.log(contentModel);

  return (
    <div>
      {
        loading ? <div>Loading...</div>
        : <div>
            {
                contentModel.length && <div>
                    {
                        contentModel.map(content => (
                            <ContentGrid content={content} />
                        ))
                    }
                </div>
            }
        </div>
      }
    </div>
  );
};

export default MainSection;
