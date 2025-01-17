import DenseVectorConfiguration from "./DenseVectorConfiguration.jsx";
import SparseVectorConfiguration from "./SparseVectorConfiguration.jsx";
import NumberWithSuggestions from "./NumberWithSuggestions.jsx";
import Repeatable from "./Repeatable.jsx";

import { Dropdown } from "./Inputs.jsx";
import { StringInput } from "./Inputs.jsx";
import { Checkbox } from "./Inputs.jsx";

const compoments = {
    "dense-vector-configuration": DenseVectorConfiguration,
    "sparse-vector-configuration": SparseVectorConfiguration,
    "string-input": StringInput,
    "number-with-suggestions": NumberWithSuggestions,
    "dropdown": Dropdown,
    "checkbox": Checkbox,
    "repeatable": Repeatable,
};

export default compoments;