
import { Strings } from "../../constants";

const onLimpiar = () => ( {
    type: Strings.setDisabledLimpiar,
} );

const onCreate = () => ( {
    type: Strings.setDisabledCreate,
} );

const onEditar = () => ( {
    type: Strings.setDisabledEditar,
} );

const onAction = () => ( {
    type: Strings.setDisabledAction,
} );

export const disabledActions = {
    onLimpiar,
    onCreate,
    onEditar,
    onAction,
};
