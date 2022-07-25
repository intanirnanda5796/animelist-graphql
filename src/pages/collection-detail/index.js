import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, HeadingTitle, Modal } from "../../components";
import { AnimeContext } from "../../context";

const CollectionDetail = () => {
  const { state, dispatch } = useContext(AnimeContext);
  const params = useParams();
  const navigate = useNavigate();
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [id, setId] = useState(null);
  const data = state.data?.filter((val) => val.name === params.name);

  const handleRemoveAnime = (id) => {
    dispatch({ type: "REMOVE_COLLECTION_ITEM", payload: { name: params.name, collectionItem: { id  } } });
    setShowModalRemove(false);
  };

  const handleClickRemove = (id) => {
    setShowModalRemove(true);
    setId(id);
  };

  const handleCloseModal = () => {
    setShowModalRemove(false);
  }

  return (
    <>
    <div className="pt-10 pb-15 px-20 place-items-center space-y-5">
        <Breadcrumb otherPage="My Collection" />
        <div className="flex flex-row justify-between">
          <HeadingTitle title="My Anime Collection Detail" />
        </div>
      </div>
      <div className="pt-5 pb-20 px-20 grid grid-cols-1 lg:grid-cols-4 place-items-center space-y-5">
          {data.length > 0 &&
            data[0].collectionItem.map((val, i) => (
              <div
                className={`bg-gray-100 px-4 py-4 rounded-xl ${
                  i === 0 ? "mt-5" : ""
                }`} key={i}
              >
                <img
                  className="rounded-md w-44 h-60 md:w-52 md:h-72"
                  src={val.coverImage.large}
                  alt="img3"
                  onClick={() => navigate(`/anime-detail/${val.id}`)}
                />
                <h1 className="pt-2 text-lg font-poppins font-semibold text-gray-800 w-44">
                  {val.title.romaji.length > 17
                    ? val.title.romaji.slice(0, 17) + "..."
                    : val.title.romaji}
                </h1>
                <div className="pt-3 text-right">
                  <button
                    className="px-5 py-2 font-poppins rounded-md font-semibold text-sm bg-red-500 text-white right-0"
                    onClick={() => handleClickRemove(val.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
        </div>
      {
        showModalRemove && (
          <Modal modalTitle="Remove Anime From Collection" onClose={() => handleCloseModal()}>
            <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b space-x-2">
              <button
                className="text-white p-2 rounded-lg background-transparent font-bold uppercase px-5 text-xs md:text-sm bg-blue-700 focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleRemoveAnime(id)}
              >
                Delete Anime From Collection
              </button>
              <button
                className="text-white p-2 rounded-lg background-transparent font-bold uppercase px-5 text-xs md:text-sm bg-red-500 focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleCloseModal()}
              >
                Close
              </button>
            </div>
          </Modal>
        )
      }
    </>
  );
};

export default CollectionDetail;
