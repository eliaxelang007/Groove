import ProcedureOperation from "./procedure";
import ControlOperation from "./control";
import SensingOperation from "./sensing";
import MotionOperation from "./motion";
import SoundOperation from "./sound";
import EventOperation from "./event";
import LooksOperation from "./looks";
import DataOperation from "./data";

const ScratchOperation = {
    ...ControlOperation,
    ...DataOperation,
    ...EventOperation,
    ...LooksOperation,
    ...MotionOperation,
    ...OperatorOperation,
    ...ProcedureOperation,
    ...SensingOperation,
    ...SoundOperation
};

type ScratchOperation =
    ControlOperation |
    DataOperation |
    EventOperation |
    LooksOperation |
    MotionOperation |
    OperatorOperation |
    ProcedureOperation |
    SensingOperation |
    SoundOperation;

export default ScratchOperation;