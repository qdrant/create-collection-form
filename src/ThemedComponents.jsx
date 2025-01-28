import {
  Autocomplete,
  Button,
  FormControl,
  InputBase,
  InputLabel,
  styled,
} from "@mui/material";
import Card from "@mui/material/Card";

export const CCFormRoot = styled("div", {
  name: "MuiCreateCollectionForm",
  slot: "root",
})(() => ({
  // if needed, you can access the theme and ownerState here
  padding: "1rem",
}));

export const CCFormSelectCard = styled(Card, {
  name: "MuiCreateCollectionForm",
  slot: "selectCard",
})(() => ({
  // if needed, you can access the theme and ownerState here
  cursor: "pointer",
  "&.active": {
    cursor: "default",
  },
}));

export const CCFormCard = styled(Card, {
  name: "MuiCreateCollectionForm",
  slot: "card",
})(() => ({
  // if needed, you can access the theme and ownerState here
  // margin: "1rem",
}));

export const CCFormButton = styled(Button, {
  name: "MuiCreateCollectionForm",
  slot: "button",
})(() => ({
  // if needed, you can access the theme and ownerState here
  // margin: "1rem",
}));

export const CCFormControl = styled(FormControl, {
  name: "MuiCreateCollectionForm",
  slot: "formControl",
})(() => ({
  // if needed, you can access the theme and ownerState here
}));

export const CCFormInputBase = styled(InputBase, {
  name: "MuiCreateCollectionForm",
  slot: "input",
})(() => ({
  // if needed, you can access the theme and ownerState here
}));

export const CCFormLabel = styled(InputLabel, {
  name: "MuiCreateCollectionForm",
  slot: "label",
})(() => ({
  // if needed, you can access the theme and ownerState here
}));

export const CCFormAutoComplete = styled(Autocomplete, {
  name: "MuiCreateCollectionForm",
  slot: "autoComplete",
})(() => ({
  // if needed, you can access the theme and ownerState here
}));
