import DenseVectorConfiguration from "./DenseVectorConfiguration.jsx";
import SparseVectorConfiguration from "./SparseVectorConfiguration.jsx";
import NumberWithSuggestions from "./NumberWithSuggestions.jsx";
import ButtonGroupWithInputs from "./ButtonGroupWithInputs.jsx";
import Repeatable from "./Repeatable.jsx";

import { Dropdown } from "./Inputs.jsx";
import { StringInput } from "./Inputs.jsx";
import { Checkbox } from "./Inputs.jsx";
import { NumberInput } from "./Inputs.jsx";

const compoments = {
  "dense-vector-configuration": DenseVectorConfiguration,
  "sparse-vector-configuration": SparseVectorConfiguration,
  "string-input": StringInput,
  "number-with-suggestions": NumberWithSuggestions,
  "button-group-with-inputs": ButtonGroupWithInputs,
  dropdown: Dropdown,
  checkbox: Checkbox,
  repeatable: Repeatable,
  number: NumberInput,
};

export default compoments;
