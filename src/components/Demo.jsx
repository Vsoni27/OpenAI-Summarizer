import { useState, useEffect } from "react";
import { copy, linkIcon } from "../assets/index";
import { useLazyGetSummaryQuery } from "../services/articleApi";
import Lottie from "lottie-react";
import loadinganimationData from "../assets/loading.json";
import erroranimationData from "../assets/error.json";

const Demo = () => {
  const [Article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]); // contains list of all articles that were searched
  console.log("allArticles", allArticles);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articleDatafromLocalStorage = JSON.parse(
      localStorage.getItem("ArticleHistory")
    );
    console.log(articleDatafromLocalStorage);
    if (articleDatafromLocalStorage) {
      setAllArticles(articleDatafromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: Article.url });
    if (data?.summary) {
      const newArticle = { ...Article, summary: data.summary };
      const updatedAllArticles = [...allArticles, newArticle];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles); //newArticle summary pushed to allArticles
      localStorage.setItem(
        "ArticleHistory",
        JSON.stringify(updatedAllArticles)
      );
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="w-4/5 mt-12 ">
      <form
        className="flex flex-row  bg-white p-2 border-grey border-2 rounded-md drop-shadow-lg h-14"
        onSubmit={handleSubmit}
      >
        <img src={linkIcon} className="ml-3 mr-3" />
        <input
          required
          type="url"
          placeholder="Enter a URL"
          value={Article.url}
          onChange={(e) => setArticle({ ...Article, url: e.target.value })}
          className="w-full rounded-md p-2"
        />
        <button
          type="submit"
          className="w-12 text-lg flex justify-center items-center border-grey border-2 rounded-md ml-2"
        >
          ↵
        </button>
      </form>
      {/* Browser History */}

      <div className="relative">
        <div className="flex flex-row-reverse border-grey mt-2">
          <button
            onClick={toggleDropdown}
            className="text-white font-bold py-2 px-4 rounded-3xl w-1/3 sm:w-1/6 orangebg_gradient"
          >
            History
          </button>
        </div>
        {isOpen && (
          <div className="flex flex-col border-grey mt-2">
            {allArticles.map((item, index) => (
              <div
                key={index}
                className="flex flex-row items-center mt-1 p-4 h-14 bg-white w-full rounded-md cursor-pointer"
                // onClick={()=>{alert("clicked")}}
                onClick={() => setArticle(item)}
              >
                <div className="copy_btn mr-3">
                  <img src={copy} alt="" className="h-5 w-5" />
                </div>
                <p className="text-indigo-600 truncate">{item.url}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Article Summary */}
      <div className="flex items-center justify-center p-2 mt-8">
        {isFetching ? (
          <div>
            <Lottie className="h-80" animationData={loadinganimationData} />
          </div>
        ) : error ? (
          <div>
            <Lottie className="h-80" animationData={erroranimationData} />
          </div>
        ) : (
          Article.summary && (
            <div>
              <h1 className="blue_gradient text-2xl font-bold">
                Article Summary{" "}
              </h1>
              <p className="summary_box mt-4">{Article.summary}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
