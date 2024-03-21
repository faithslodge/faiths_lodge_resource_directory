import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

const handleError = (error) => {
  alert("Organizations GET request failed:", error);
};

// fetch org data from org router
function* fetchOrganizations() {
  try {
    const response = yield axios.get("/api/organization");
    yield put({ type: "SET_ORGANIZATIONS", payload: response.data });
  } catch (error) {
    handleError(error);
  }
}

function* createOrganizations(action) {
  try {
    const { organizationDetails, logoData } = action.payload;

    const formWithLogo = new FormData();
    formWithLogo.append("logo_to_upload", logoData);

    const logoPostRes = yield axios.post("/api/logo", formWithLogo);

    const logoId = logoPostRes.data.id;

    let logoIdObj = { logoId: logoId };
    yield axios.post("/api/organization", { organizationDetails: { ...organizationDetails, ...logoIdObj } });

    yield put({ type: "FETCH_ORGANIZATIONS" });

    // remove the logo data from the logo reducer
    yield put({ type: "RESET_LOGO_DATA" });
  } catch (error) {
    handleError(error);
  }
}

function* organizationsSaga() {
  yield takeLatest("FETCH_ORGANIZATIONS", fetchOrganizations);
  yield takeLatest("CREATE_ORGANIZATION", createOrganizations);
}

export default organizationsSaga;
