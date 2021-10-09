
import { Strings } from "../../constants";

const setPagination = ( pagination ) => ( {
    type:    Strings.setPagination,
    payload: pagination,
} );

const removePagination = () => ( {
    type: Strings.removePagintion,
} );

export const paginationActions = {
    setPagination,
    removePagination,
};
