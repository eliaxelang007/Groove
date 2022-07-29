import ControlOperation from "./control";
import MotionOperation from "./motion";

const Operation = { ...ControlOperation, ...MotionOperation };
type Operation = ControlOperation | MotionOperation;

export default Operation;