enum ControlOperation {
    control_forever,
    control_repeat,
    control_if,
    control_if_else,
    control_stop,
    control_wait,
    control_wait_until,
    control_repeat_until,
    control_start_as_clone,
    control_create_clone_of_menu,
    control_create_clone_of,
    control_delete_this_clone,
}

export default ControlOperation;