import accountSlices from "./auth/accountSlices";
import trackSlice from "./track/trackSlice";

const reducerIndex = {
    user: accountSlices,
    track: trackSlice
}

export default reducerIndex;