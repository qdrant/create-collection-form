import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { previewOutput } from './prepareOutput.js';
import { CCFormCard, CCFormSidebar } from './ThemedComponents.jsx';
import { Box, Typography } from '@mui/material';

const Sidebar = ({formData, path, handleOutput}) => {
  const [outputData, setOutputData] = useState(null);

  useEffect(() => {
    if (formData) {
      // todo: should we show output if there is no function to process it?
      if (handleOutput && typeof handleOutput === "function") {
        setOutputData(handleOutput(previewOutput(formData, path)));
      }
    }
  }, [path, formData, handleOutput]);

  return (
      <CCFormSidebar>
        <CCFormCard>
          <Box>
            <Typography variant="subtitle1" sx={{fontWeight: "600"}}>
              Request:
            </Typography>
            <Box>
              {outputData ? (
                outputData
              ) : (
                <Typography
                  variant="body2"
                  sx={{ marginTop: "8px", fontStyle: "italic" }}
                >
                  No data to preview
                </Typography>
              )}
            </Box>
          </Box>
        </CCFormCard>
      </CCFormSidebar>
  );
}

// prop types
Sidebar.propTypes = {
  formData: PropTypes.object.isRequired,
  path: PropTypes.array.isRequired,
  handleOutput: PropTypes.func,
}

export default Sidebar;
