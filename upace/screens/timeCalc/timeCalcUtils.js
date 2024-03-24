import React from "react";
import { TimeSpan } from "timespan";

export const getNewTimeSplit = () => ({ split: new TimeSpan(), ref: React.createRef() });
export const initialValues = {
    mode: ["mm", "ss", "ds"],
    splits: [getNewTimeSplit()],
};
