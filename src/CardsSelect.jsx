import { useState, useCallback, useMemo, memo, forwardRef } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { CCFormSelectCard } from "./ThemedComponents";

const FormCard = ({ card, isActive, onClick }) => {
  return (
    <CCFormSelectCard
      elevation={isActive ? 3 : 0}
      className={isActive ? "active" : ""}
      onClick={onClick}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3">
          {card.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {card.description}
        </Typography>
      </CardContent>
    </CCFormSelectCard>
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

  const { title, description, cards } = config;
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
      <Typography variant="h4">{title}</Typography>
      <p>{description}</p>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
          gap: 2,
        }}
      >
        {renderedCards}
      </Box>
    </Box>
  );
};

// todo: move this to Inputs.jsx?
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
