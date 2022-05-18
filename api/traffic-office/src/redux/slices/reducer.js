import accountSlices from "./auth/accountSlices";
import chatSlice from "./chat/chatSlice";
import driverslice from "./driver/driverslice";
import socketSlice from "./socket/socket";
import trackSlice from "./track/trackSlice";

const reducerIndex = {
    user: accountSlices,
    track: trackSlice,
    conversations: chatSlice,
    socket: socketSlice,
    driver: driverslice
}

export default reducerIndex;