import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ActionButton from "../../components/ActionButton";


const places:string[] = [
//   "Los Angels",
//   "San Diego",
//   "San Francisco",
//   "Santa Barbara",
//   "Sacramento",
//   "Santa Clara",
//   "Malibu",
//   "Long beach",
];

function getStyles(place: string, placeName: string[], theme: Theme) {
  return {
    fontWeight:
      placeName.indexOf(place) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CreateList: React.FC = () => {
  const theme = useTheme();
  const [placeName, setPlaceName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof placeName>) => {
    const {
      target: { value },
    } = event;
    setPlaceName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Stack sx={{ width: "100%", backgroundColor: "#F9F6F0", rowGap: "1.2rem" }}>
      <Typography component="h3" variant="h3" sx={{ color: "#232946" }}>
        Creating a new list
      </Typography>
      <FormControl
        fullWidth
        sx={{ rowGap: "1.2rem", textAlign: "initial", alignItems: "center" }}
      >
        <Box sx={{ width: "50%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
            autoFocus
            multiline
          />
        </Box>
        {places.length !== 0 && (
          <Fragment>
            <Select
              multiple
              displayEmpty
              value={placeName}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Your places</em>;
                }

                return selected.join(", ");
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ width: "50%", marginTop: "1rem" }}
            >
              <MenuItem disabled value="">
                <em>Your places</em>
                          </MenuItem>
                          {places.map((place:string) => (
                            <MenuItem
                              key={place}
                              value={place}
                              style={getStyles(place, placeName, theme)}
                            >
                              {place}
                            </MenuItem>
                          ))}
            </Select>
            <Typography variant="body1" sx={{ color: "#232946" }}>
              or
            </Typography>
          </Fragment>
        )}
        <Box
          sx={{
            backgroundColor: "#FDFDFB",
            width: "40%",
            textAlign: "center",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            rowGap: "24px",
          }}
        >
          <Typography
            component="h4"
            variant="h5"
            sx={{ color: "#232946", width: "40%" }}
          >
            Click the button below to add a new place
          </Typography>
          <ActionButton
            variant="outlined"
            sx={{ padding: ".7rem 1rem", width: "60%", fontSize: "1.1rem" }}
          >
            <Link to={""} style={{ textDecoration: "none", color: "#232946" }}>
              Add a new place
            </Link>
          </ActionButton>
        </Box>
        <ActionButton
          variant="outlined"
          sx={{
            mt: 3,
            mb: 2,
            pt: 2,
            pb: 2,
            fontSize: 20,
            backgroundColor: "#2CA58D",
            width: "10%",
            color: "#EEEEEE",
            "&:hover": {
              color: "#2CA58D",
            },
          }}
        >
          Create
        </ActionButton>
      </FormControl>
    </Stack>
  );
};

export default CreateList;
