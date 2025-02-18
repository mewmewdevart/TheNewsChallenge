import * as React from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface ProgressBarProps {
    icon?: string;
    label?: string;
    value: number;
    maxValue: number; 
  }

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#FFCE04",
    ...theme.applyStyles("dark", {
      backgroundColor: "#615A5A",
    }),
  },
}));

const ProgressBar: React.FC<ProgressBarProps> = ({
    label,
    icon,
    value,
    maxValue,
  }) => {
    const normalizedValue = Math.min(Math.max(value, 0), maxValue);
    const progressText = `${normalizedValue}/${maxValue}`; 
  
    return (
      <div className="border border-gray-100 w-full h-[80px] flex items-center gap-4 px-4 py-14">
        <img src={icon} alt={label} className="w-[73px]" />
        <div className="w-full">
          {label}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <BorderLinearProgress
                variant="determinate"
                value={(normalizedValue / maxValue) * 100}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {progressText} 
              </Typography>
            </Box>
          </Box>
        </div>
      </div>
    );
  };

export default ProgressBar;
