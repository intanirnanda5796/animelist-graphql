import { useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { DETAIL_ANIME } from "../../graphql/queries";
import { AnimeContext, DarkLightContext } from "../../context";
import {
  Breadcrumb,
  Label,
  HeadingTitle,
  Image,
  Loader,
  Modal,
} from "../../components";
import Template from "../template";
import PageLoadError from "../errorload";

const AnimeDetail = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const params = useParams();
  const location = useLocation();
  const { state, dispatch } = useContext(AnimeContext);
  const { theme } = useContext(DarkLightContext);
  const [names, setNames] = useState("");
  const [checkedBox, setCheckedBox] = useState({});
  const [showError, setShowError] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const { loading, error, data } = useQuery(DETAIL_ANIME, {
    variables: {
      id: params.id,
    },
  });

  if (loading) return <div className="grid h-screen place-items-center"><Loader /></div>;
  if (error) return <Template><PageLoadError/></Template>

  const handleAddCollection = (data) => {
    if (state.data.length <= 0) {
      if (names === "") {
        setShowErrorMessage("Collection Name is Required");
        setShowError(true);
      } else if (/[^a-zA-Z0-9/]/.test(names)) {
        setShowErrorMessage("Collection Name must not have a special char");
        setShowError(true);
      } else if (state.data.filter((val) => val.name === names).length > 0) {
        setShowErrorMessage("Collection Name is already exist");
        setShowError(true);
      } else {
        dispatch({
          type: "ADD_COLLECTION",
          payload: { name: names, collectionItem: [] },
        });
        dispatch({
          type: "ADD_COLLECTION_ITEM",
          payload: { name: names, collectionItem: data },
        });
        setShowModalAdd(false);
        setShowModalSuccess(true);
      }
    } else {
      if (Object.keys(checkedBox).length === 0 ||
      Object.values(checkedBox).every((val) => val === false)) {
        setShowErrorMessage("Collection Name is Required");
        setShowError(true);
      } else {
        state.data?.forEach((val, i) => {
          if (checkedBox[val.name] === true) {
            dispatch({
              type: "ADD_COLLECTION_ITEM",
              payload: { name: val.name, collectionItem: data },
            });
          }
        });
        setShowModalAdd(false);
        setShowModalSuccess(true);
      }
    }
  };

  const handleChangeCheckbox = (e) => {
    setCheckedBox({
      ...checkedBox,
      [e.target.name]: e.target.checked,
    });
  };

  const handleCloseModal = () => {
    setShowModalAdd(false);
    setShowErrorMessage("");
    setShowError(false);
    setCheckedBox({});
  }

  const handleCloseModalSuccess = () => {
    setShowModalSuccess(false);
  }

  return (
    <>
      <div className="pt-10 pb-20 px-20 place-items-center">
        <Breadcrumb otherPage="Anime Detail" />
        <HeadingTitle
          title={
            data?.Media.title.english === null
              ? "This anime doesnt have english title"
              : data?.Media.title.english
          }
        />
        <div className="pt-5 flex flex-col">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <Image src={data?.Media.coverImage.large} />
            <div className="flex flex-col space-y-1">
              <div className="flex flex-row justify-between">
                <h1 className="text-lg md:text-2xl font-poppins font-semibold text-gray-800">
                  {data?.Media.title.english === null
                    ? " This anime doesnt have english title"
                    : data?.Media.title.english}
                </h1>

                <button
                  className={`text-white p-2 rounded-lg background-transparent font-bold uppercase px-5 text-xs md:text-sm ${location.pathname.includes('/anime-detail') && theme ? 'bg-gray-700' : 'bg-blue-700'} focus:outline-none ease-linear transition-all duration-150`}
                  type="button"
                  onClick={() => state.data?.map(val => val.collectionItem).flat().some(value => value.id === Number(params.id)) ? false : setShowModalAdd(true)}
                >
                  {state.data?.map(val => val.collectionItem).flat().some(value => value.id === Number(params.id)) ? 'Added to Collection' : "Add to Collection"}
                </button>
              </div>

              <div className="flex flex-col md:flex-row space-y-1 md:space-x-5 md:place-items-center">
                <h1 className="font-poppins font-medium text-gray-800 text-sm md:text-lg">
                  {data?.Media.title.romaji}
                </h1>
                <h1 className="font-poppins font-medium text-gray-600 text-sm md:text-lg">
                  {data?.Media.title.native}
                </h1>
              </div>

              <h1 className="pt-1 md:pt-3 font-poppins font-semibold text-sm md:text-lg">
                Description :
              </h1>
              <p
                className="font-poppins font-medium text-xs md:text-sm text-gray-600"
                dangerouslySetInnerHTML={{ __html: data?.Media.description }}
              />
              <div className="flex flex-row space-x-10 md:space-x-14">
                <div>
                  <h1 className="pt-1 md:t-2 font-poppins font-semibold text-sm md:text-lg">
                    Start Date
                  </h1>
                  <p className="font-poppins font-medium text-xs md:text-sm text-gray-600">
                    {`${data?.Media.startDate.year} - ${
                      data?.Media.startDate.month < 10
                        ? `0${data?.Media.startDate.month}`
                        : data?.Media.startDate.month
                    } - ${data?.Media.startDate.day}`}
                  </p>
                </div>

                <div>
                  <h1 className="pt-1 md:pt-2 font-poppins font-semibold text-sm md:text-lg">
                    End Date
                  </h1>
                  <p className="font-poppins font-medium text-xs md:text-sm text-gray-600">
                    {`${data?.Media.endDate.year} - ${
                      data?.Media.endDate.month < 10
                        ? `0${data?.Media.endDate.month}`
                        : data?.Media.endDate.month
                    } - ${data?.Media.endDate.day}`}
                  </p>
                </div>
              </div>

              <h1 className="pt-1 md:pt-2 font-poppins font-semibold text-sm md:text-lg">
                Status :
              </h1>
              <label className="bg-green-600 w-max px-3 py-1 rounded-2xl font-poppins font-semibold text-xs md:text-sm text-white text-center">
                {data?.Media.status}
              </label>
            </div>
          </div>
          <div className="pt-2">
            <h1 className="pt-2 md:pt-3 font-poppins font-semibold text-sm md:text-lg">
              Related Tags :
            </h1>
            <div className="relative max-w-[800px]">
              <div className="flex flex-wrap pt-2 place-items-center space-y-2 space-x-1 left-0">
                {data?.Media.tags.map((val, i) => (
                  <Label key={i} labelKey={i} labelName={val.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModalSuccess && (
        <>
          <Modal
            modalTitle="You have added anime to collection successfully"
            onClose={() => handleCloseModalSuccess()}
          >
             <button
                className="text-white p-2 rounded-lg background-transparent font-bold uppercase px-5 text-xs md:text-sm bg-blue-500 focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleCloseModalSuccess()}>
                OK
              </button>
          </Modal>
        </>
      )}
      
      {showModalAdd && (
        <>
          <Modal
            modalTitle="Add To Collection"
            onClose={() => handleCloseModal()}
          >
            {state.data.length <= 0 ? (
              <>
                <h1 className="font-poppins font-medium text-sm md:text-base">
                  Type a name and add to my collection
                </h1>
                <input
                  className="w-80 px-4 py-2 border-2 rounded-lg border-gray-400 font-poppins outline-none focus:border-blue-400 text-xs md:text-base"
                  type="text"
                  placeholder="Anime Nickname..."
                  onChange={(e) => setNames(e.target.value)}
                  value={names}
                />
                {showError && (
                  <p className="text-red-500 font-poppins text-xs md:text-sm font-normal">
                    {showErrorMessage}
                  </p>
                )}
              </>
            ) : (
              <>
                {state.data?.map((val, i) => (
                  <label key={i}>
                    <label className="font-poppins text-base">
                      <input
                        className="mr-2 place-items-center"
                        type="checkbox"
                        name={val.name}
                        checked={
                          checkedBox[val.name] === undefined
                            ? false
                            : checkedBox[val.name]
                        }
                        value={
                          checkedBox[val.name] === undefined
                            ? ""
                            : checkedBox[val.name]
                        }
                        onChange={(e) => handleChangeCheckbox(e)}
                      />
                    </label>
                    {val.name}
                  </label>
                ))}
                {showError && (
                  <p className="text-red-500 font-poppins text-xs md:text-sm font-normal">
                    {showErrorMessage}
                  </p>
                )}
              </>
            )}
            <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b space-x-2">
              <button
                className="text-white p-2 rounded-lg background-transparent font-bold uppercase px-5 text-xs md:text-sm bg-blue-700 focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleAddCollection(data?.Media)}
              >
                Add to Collection
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
        </>
      )}
    </>
  );
};

export default AnimeDetail;
