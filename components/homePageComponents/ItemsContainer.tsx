import { Alert, Box, CircularProgress, Grid, Typography } from "@mui/material";
import { Item } from "@prisma/client";
import { truncateSync } from "fs";
import React from "react";
import { useGetItems } from "../../hooks/useGetItems";
import { useGetMediaQueryMatches } from "../../hooks/useGetMediaQueryMatches";
import EachItem from "./EachItem";

interface Error {
  name: string;
  message: string;
  stack?: string;
}

interface Error {
  status?: number;
  info?: string;
}

interface ContainerType {
  categoryName: string;
  categoryId: number;
  items: Item[];
  isLoading: boolean;
  isError: Error;
}

const ItemsContainer = ({
  categoryName,
  isLoading,
  isError,
  items,
}: ContainerType) => {
  // hook for media query:
  const { isMedium, isSmall, isSmallest } = useGetMediaQueryMatches();
  return (
    <Box sx={{ padding: isSmall ? "0 2em" : "0 4em", marginBottom: "2rem" }}>
      <Typography sx={{ marginBottom: "20px" }} variant="body1">
        {categoryName}
      </Typography>
      <Grid container spacing={2}>
        {isLoading ? (
          <Grid item>
            <CircularProgress sx={{ marginLeft: "4rem" }} color="secondary" />
          </Grid>
        ) : isError || items.length === 0 ? (
          <Grid item>
            <Alert severity="error">
              No items Available under this category. Try adding item of your
              preference.
            </Alert>
          </Grid>
        ) : (
          <>
            {items.map((el: Item) => (
              <Grid key={el.id} item>
                <EachItem item={el} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ItemsContainer;
