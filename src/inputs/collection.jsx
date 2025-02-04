import DenseVectorConfiguration from "./DenseVectorConfiguration.jsx";
import SparseVectorConfiguration from "./SparseVectorConfiguration.jsx";
import NumberWithSuggestions from "./NumberWithSuggestions.jsx";
import ButtonGroupWithInputs from "./ButtonGroupWithInputs.jsx";
import Repeatable from "./Repeatable.jsx";
import Group from "./Group.jsx";
import Details from "./Details.jsx";

import { Dropdown } from "./Inputs.jsx";
import { StringInput } from "./Inputs.jsx";
import { Checkbox } from "./Inputs.jsx";
import { NumberInput } from "./Inputs.jsx";

import SizeWrapper from "./SizeWrapper.jsx";
import Description from "./Description.jsx";

function wrapWithSize(component) {
  return function (params) {
    return SizeWrapper({ element: component, ...params });
  };
}

const compoments = {
  "dense-vector-configuration": DenseVectorConfiguration,
  "sparse-vector-configuration": SparseVectorConfiguration,
  "string-input": wrapWithSize(StringInput),
  "number-with-suggestions": wrapWithSize(NumberWithSuggestions),
  "button-group-with-inputs": ButtonGroupWithInputs,
  dropdown: wrapWithSize(Dropdown),
  checkbox: wrapWithSize(Checkbox),
  repeatable: Repeatable,
  number: wrapWithSize(NumberInput),
  group: Group,
  description: wrapWithSize(Description),
  details: Details,
};

export default compoments;
