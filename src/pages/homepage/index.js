import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroller";
import { LIST_ANIME } from "../../graphql/queries";
import { Loader } from "../../components";
import Template from "../template";
import PageLoadError from "../errorload";

function Homepage() {
  const { loading, error, data, fetchMore } = useQuery(LIST_ANIME, {
    variables: { page: 1, perPage: 10 },
  });
  const navigate = useNavigate();

  if (loading) return <div className="grid h-screen place-items-center"><Loader /></div>;
  if (error) return <Template><PageLoadError/></Template>

  const handleLoadMore = () => {
    data?.Page.pageInfo.hasNextPage &&
      fetchMore({
        variables: {
          page: data?.Page.pageInfo.currentPage + 1,
          perPage: 10,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          fetchMoreResult.Page.media = [
            ...prevResult.Page.media,
            ...fetchMoreResult.Page.media,
          ];

          return fetchMoreResult;
        },
      });
  };

  const handleDetail = (data) => {
    navigate(`/anime-detail/${data.id}`);
  }

  return (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={handleLoadMore}
        hasMore={data?.Page.pageInfo.hasNextPage}
        loader={<Loader key={0} />}
      >
        <div className="pt-10 pb-20 px-20 grid grid-cols-1 lg:grid-cols-4 place-items-center space-y-5">
          {data?.Page.media.map((val, i) => (
            <div
              onClick={() => handleDetail(val)}
              className={`bg-gray-100 px-4 py-4 rounded-xl ${
                i === 0 ? "mt-5" : ""
              }`}
              key={i}
            >
              <img
                className="rounded-md w-64 h-96 md:w-52 md:h-72"
                src={val.coverImage.large}
                alt=""
              />
              <h1 className="pt-2 text-base font-poppins font-semibold text-gray-800 w-44">
                {val.title.romaji.slice(0, 17) + "..."}
              </h1>
              <h1 className="font-poppins font-medium text-gray-500 text-xs">
                {val.title.native.slice(0, 17) + "..."}
              </h1>
              <h1 className="pt-3 font-poppins font-semibold text-sm text-right">
                {`${new Intl.NumberFormat("id", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                }).format(val.popularity)} viewers`}
              </h1>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
export default Homepage;
