import {EMPTY_OBJECT} from "./util/js-utils";

export const selectStatus = () => state => state.status || EMPTY_OBJECT;

export const selectStatusLoaded = () => state => !!state.statusLoaded;
