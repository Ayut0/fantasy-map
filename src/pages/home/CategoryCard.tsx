import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpRequest } from "../../Utils/httpRequest-hook";
import { useAppContext } from "../../context/AppContext";

export const CategoryCard: React.FC = () => {
  const [categories, setCategories] = useState<[]>([]);
  const { error, sendRequest, clearError } = useHttpRequest();
  const navigate = useNavigate();
  const { dispatch, state } = useAppContext();

  useEffect(() => {
    const getCategory = async () => {
      const response = await sendRequest("/api/categories", "GET");
      setCategories(response);
      console.log(response);
    };
    getCategory();
  }, []);

  const handleCategorySearch = async (categoryId: number) => {
    dispatch({ type: "searchCategory", payload: categoryId });
    navigate("/result");
  };

  return (
    <Grid container rowSpacing={6} columnSpacing={{ xs: 6, sm: 2, md: 3 }} direction={{xs: "column", md: "row"}} justifyContent={{ xs: "center", md:"flex-start" }} alignItems={{ xs: "center" }}>
      {categories.map((category: any) => {
        return (
          <Grid key={category.id} item md={3} xs={12}>
            <Card
              sx={{
                width: "250px",
                height: "250px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "#FAFAFA",
                },
              }}
              onClick={() => handleCategorySearch(category.id)}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", paddingBottom: "24px" }}>
                  <img src={category.picture} style={{ display: "block" }} />
                </Box>
                <Typography
                  variant="h4"
                  component="h5"
                  sx={{ textAlign: "center", fontSize:{xs: "24px", md: "32px"}, color: "#282010" }}
                >
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
