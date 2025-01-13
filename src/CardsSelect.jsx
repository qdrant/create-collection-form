import { useState, useCallback, useMemo, memo } from "react";
import Box from "@mui/material/Box";
import { FormCard } from "./Inputs.jsx";
import PropTypes from "prop-types";

const CardsSelect = ({ stepName, config, stepData, onApply }) => {
  const { title, description, cards } = config;
  const restoredValue = localStorage.getItem("formData")?.[stepName];
  const [selected, setSelected] = useState(stepData || restoredValue);

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
      <h1>{title}</h1>
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
