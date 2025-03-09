import { Box, CircularProgress, Typography } from "@mui/material";
import ms from "ms";
import { useGetSitesQuery } from "../../app/features/sites/sitesApiSlice";
import SiteMap from "../../components/sites/SiteMap";

const Sites = () => {
  const { data, isError, isLoading, isSuccess } = useGetSitesQuery("LIST", {
    pollingInterval: ms("24h"),
    // refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  // console.log("sites:", data?.sites);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Typography color="error">Une erreur est survenue.</Typography>;
  }

  if (isSuccess && data?.sites) {
    return (
      <Box
      // sx={{ justifyContent: "flex-end" }}
      >
        {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }} mb={2}>
          <SiteSelection />
        </Box> */}

        {/* <Typography variant="h6">Available Sites</Typography>
        {data.sites.map((site, index) => (
          <Typography key={index}>{site.site_name}</Typography>
        ))} */}
        <SiteMap
          sites={Object.values(data.sites.entities)}
          markerColor="blue"
          markerSize={[30, 30]}
        />
      </Box>
    );
  }

  return null; // Return nothing if no data is available
};

export default Sites;
