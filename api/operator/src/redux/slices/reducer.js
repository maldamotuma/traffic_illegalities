import usertrafficslicer from "./assignment/usertrafficslicer";
import accountSlices from "./auth/accountSlices";
import chatSlice from "./chat/chatSlice";
import socketSlice from "./socket/socket";
import trackSlice from "./track/trackSlice";

const reducerIndex = {
    user: accountSlices,
    track: trackSlice,
    conversations: chatSlice,
    socket: socketSlice,
    assignment: usertrafficslicer
}

export default reducerIndex;