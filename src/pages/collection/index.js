import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimeContext, DarkLightContext } from "../../context";
import { Breadcrumb, HeadingTitle, Modal } from "../../components";

function Collection() {
  const { state, dispatch } = useContext(AnimeContext);
  const { theme } = useContext(DarkLightContext);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [nameCollectionRemove, setNameCollectionRemove] = useState("");
  const [nameCollection, setNameCollection] = useState("");
  const [changeNameCollection, setChangeNameCollection] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddCollection = (name) => {
    if (nameCollection === "") {
      setErrorMessage("Collection Name is required");
      setShowError(true);
    } else if (/[^a-zA-Z0-9/]/.test(nameCollection)) {
      setErrorMessage("Collection name must not have a special char");
      setShowError(true);
    } else if (
      state.data.filter((val) => val.name === nameCollection).length > 0
    ) {
      setErrorMessage("Collection name already exist");
      setShowError(true);
    } else {
      dispatch({
        type: "ADD_COLLECTION",
        payload: { name, collectionItem: [] },
      });
      setShowModalAdd(false);
      setNameCollection("");
      setErrorMessage("");
      setShowError(false);
      setShowModalSuccess(true);
    }
  };

  const handleCloseAddModal = () => {
    setShowModalAdd(false);
    setNameCollection("");
    setErrorMessage("");
    setShowError(false);
  };

  const handleClickRemove = (name) => {
    setShowModalRemove(true);
    setNameCollectionRemove(name);
  };

  const handleRemoveCollection = (name) => {
    dispatch({ type: "REMOVE_COLLECTION", payload: { name } });
    setShowModalRemove(false);
  };

  const handleCloseRemoveModal = () => {
    setShowModalRemove(false);
  };

  const handleClickEdit = (name) => {
    setShowModalEdit(true);
    setNameCollection(name);
  }

  const handleEditCollection = (name, changeName) => {
    if (changeNameCollection === "") {
      setErrorMessage("Collection Name is required");
      setShowError(true);
    }else if (/[^a-zA-Z0-9/]/.test(changeNameCollection)) {
      setErrorMessage("Collection name must not have a special char");
      setShowError(true);
    } else if (state.data.filter((val) => val.name === changeNameCollection).length > 0) {
      setErrorMessage("Collection name already exist");
      setShowError(true);
    } else {
      dispatch({ type: "EDIT_COLLECTION", payload: { name, changeName } });
      setShowModalEdit(false);
      setErrorMessage("");
      setShowError(false);
      setChangeNameCollection("");
    }
  }

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
  }

  const handleCloseModalSuccess = () => {
    setShowModalSuccess(false);
  };

  return (
    <>
      <div className="pt-10 pb-15 px-20 place-items-center space-y-5">
        <Breadcrumb otherPage="My Collection" />
        <div className="flex flex-row justify-between">
          <HeadingTitle title="My Anime Collection" />
          <button
            className={`text-white p-2 rounded-lg background-transparent font-bold uppercase px-5 text-xs md:text-sm ${
              location.pathname === "/collection" && theme
                ? "bg-gray-700"
                : "bg-blue-700"
            } focus:outline-none ease-linear transition-all duration-150`}
            type="button"
            onClick={() => setShowModalAdd(true)}
          >
            Add Collection
          </button>
        </div>
      </div>
      {state.data?.length === 0 ? (
        <h1 className="pt-48 text-center font-poppins font-bold text-lg">
          You have no anime collection yet, add anime to collection first !
        </h1>
      ) : (
        <div className="pt-10 pb-20 px-20 grid grid-cols-1 lg:grid-cols-4 place-items-center space-y-5">
          {state.data?.map((val, i) => (
            <div
              className={`bg-gray-100 px-4 py-4 rounded-xl ${
                i === 0 ? "mt-5" : ""
              }`}
              key={i}
            >
              <img
                className="rounded-md w-44 h-60 md:w-52 md:h-72"
                src={
                  val.collectionItem.length > 0
                    ? val.collectionItem[0].coverImage.large
                    : "https://fakeimg.pl/200x350/?text=No Image"
                }
                alt="img3"
                onClick={() => navigate(`/collection-detail/${val.name}`)}
              />
              <h1 className="pt-2 text-lg font-poppins font-semibold text-gray-800 w-44">
                {val.name.length > 17
                  ? val.name.slice(0, 17) + "..."
                  : val.name}
              </h1>
              <div className="flex items-center pt-3 space-x-6">
              <button
                  className="px-5 py-2 font-poppins rounded-md font-semibold text-sm bg-blue-500 text-white"
                  onClick={() => handleClickEdit(val.name)}
                >
                  Edit
                </button>
                <button
                  className="px-5 py-2 font-poppins rounded-md font-semibold text-sm bg-red-500 text-white"
                  onClick={() => handleClickRemove(val.name)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModalAdd && (
        <Modal
          modalTitle="Add Collection"
          onClose={() => handleCloseAddModal()}
        >
          <input
            className="w-80 px-4 py-2 border-2 rounded-lg border-gray-400 font-poppins outline-none focus:border-blue-400 text-xs md:text-base"
            type="text"
            placeholder="Collection Name..."
            onChange={(e) => setNameCollection(e.target.value)}
            value={nameCollection}
          />
          {showError && (
            <p className="text-red-500 font-poppins text-xs md:text-sm font-normal">
              {errorMessage}
            </p>
          )}
          <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b space-x-2">
            <button
              className="text-white p-2 rounded-lg background-transparent font-bold uppercase px-5 text-xs md:text-sm bg-blue-700 focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => handleAddCollection(nameCollection)}
            >
              Add Collection
            </button>
            <button
              className="text-white p-2 rounded-lg background-transparent font-bold uppercase px-5 text-xs md:text-sm bg-red-500 focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => handleCloseAddModal()}
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {showModalRemove && (
        <Modal
          modalTitle="Remove Collection"
          onClose={() => handleCloseRemoveModal()}
        >
          <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b space-x-2">
            <button
              className="text-white p-2 rounded-lg background-transparent font-bold uppercase px-5 text-xs md:text-sm bg-blue-700 focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => handleRemoveCollection(nameCollectionRemove)}
            >
              Delete Collection
            </button>
            <button
              className="text-white p-2 rounded-lg background-transparent font-bold uppercase px-5 text-xs md:text-sm bg-red-500 focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => handleCloseRemoveModal()}
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {showModalSuccess && (
        <>
          <Modal
            modalTitle="You have added new collection successfully"
            onClose={() => handleCloseModalSuccess()}
          >
            <button
              className="text-white p-2 rounded-lg background-transparent font-bold uppercase px-5 text-xs md:text-sm bg-blue-500 focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => handleCloseModalSuccess()}
            >
              OK
            </button>
          </Modal>
        </>
      )}

      {showModalEdit && (
        <Modal
          modalTitle="Edit Collection"
          onClose={() => handleCloseModalEdit()}
        >
          <input
            className="w-80 px-4 py-2 border-2 rounded-lg border-gray-400 font-poppins outline-none focus:border-blue-400 text-xs md:text-base"
            type="text"
            placeholder="Collection Name..."
            onChange={(e) => setChangeNameCollection(e.target.value)}
            value={changeNameCollection}
          />
          {showError && (
            <p className="text-red-500 font-poppins text-xs md:text-sm font-normal">
              {errorMessage}
            </p>
          )}
          <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b space-x-2">
            <button
              className="text-white p-2 rounded-lg background-transparent font-bold uppercase px-5 text-xs md:text-sm bg-blue-700 focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => handleEditCollection(nameCollection, changeNameCollection)}
            >
              Edit Collection
            </button>
            <button
              className="text-white p-2 rounded-lg background-transparent font-bold uppercase px-5 text-xs md:text-sm bg-red-500 focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => handleCloseModalEdit()}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
export default Collection;
