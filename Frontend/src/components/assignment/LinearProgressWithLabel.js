import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            backgroundColor: '#dde6ed', // Background color
            '& .MuiLinearProgress-bar': {
              backgroundColor: props.color, // Dynamic bar color
            },
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired, // Add prop type for color
};

export default function LinearWithValueLabel() {
  const [progress, setProgress] = React.useState(10);
  const [color, setColor] = React.useState('#526d82'); // Default bar color
  const targetProgress = 70; // Target progress percentage

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= targetProgress) {
          setColor('#3a4f61'); // Change color at target
          clearInterval(timer); // Stop progress
          return prevProgress; // Maintain progress
        }
        return prevProgress + 10; // Increment progress
      });
    }, 800);

    return () => {
      clearInterval(timer); // Cleanup interval
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} color={color} />
    </Box>
  );
}
