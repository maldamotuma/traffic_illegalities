import accountSlices from "./auth/accountSlices";
import chatSlice from "./chat/chatSlice";
import socketSlice from "./socket/socket";
import trackSlice from "./track/trackSlice";

const reducerIndex = {
    user: accountSlices,
    track: trackSlice,
    conversations: chatSlice,
    socket: socketSlice
}

export default reducerIndex;