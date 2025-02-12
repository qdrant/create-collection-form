import { memo, useCallback, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { createSvgIcon, Divider, Grid2, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { CCFormSelectCard, CCFormTitle } from "./ThemedComponents";
import defaultColors from "./theme/default-colors.js";

const FormCard = ({ card, isActive, onClick }) => {
  const CardIcon =
    card.icon &&
    createSvgIcon(
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={card.icon.path}
        fill={defaultColors["neutral-50"]}
      />,
      "CardIcon",
    );

  return (
    <Grid2 size={{ xs: 12, md: card.size || 3 }} display="flex">
      <CCFormSelectCard
        elevation={1}
        className={isActive ? "active" : ""}
        onClick={onClick}
      >
        <CardContent sx={{ display: "flex" }}>
          {card.icon && (
            <CardIcon
              sx={{
                width: "1rem",
                height: "1rem",
                mb: 2,
                mr: 2,
                mt: 0.5,
              }}
            />
          )}
          <Box sx={{ flex: 1 }}>
            <Typography className={"CCFormSelectCard-Title"} mb={2}>
              {card.title}
            </Typography>
            <Typography variant="body2">{card["short-description"]}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {card.description}
            </Typography>
          </Box>
        </CardContent>
      </CCFormSelectCard>
    </Grid2>
  );
};

// props validation
FormCard.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const CardsSelect = ({ stepName, config, stepData, onApply }) => {
  // todo: fix chosen card for the third step
  // if it has active card, show next step too

  const { title, description, cards, gap } = config;
  const [selected, setSelected] = useState(stepData);

  const handleSelect = useCallback(
    (cardData) => {
      setSelected(cardData.name);
      onApply(stepName, cardData.name, cardData["on-select"]["continue-step"]);
    },
    [onApply, stepName],
  );

  const renderedCards = useMemo(
    () =>
      cards?.map((card) => (
        <MemoizedFormCard
          isActive={card.name === selected}
          key={card.title} // Assuming card.title is unique
          card={card}
          onClick={() => handleSelect(card)}
        />
      )),
    [cards, selected, handleSelect],
  );

  return (
    <Box>
      <CCFormTitle variant="h6" sx={{ mb: 2 }}>
        {title}
      </CCFormTitle>
      <p>{description}</p>
      <Grid2 container spacing={gap || 2} alignItems={"stretch"}>
        {renderedCards}
      </Grid2>
    </Box>
  );
};

const MemoizedFormCard = memo(FormCard);

// props validation
CardsSelect.propTypes = {
  stepName: PropTypes.string.isRequired,
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        "on-select": PropTypes.shape({
          "continue-step": PropTypes.string.isRequired,
        }).isRequired,
      }),
    ),
  }).isRequired,
  stepData: PropTypes.string,
  onApply: PropTypes.func.isRequired,
};

export default CardsSelect;
