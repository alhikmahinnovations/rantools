import { Box } from "@mui/material";
import ChainSites from "../../components/sites/ChainSites";



const ChainSitesPage = () => {
  return (
    <>
      {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }} mb={2}> */}
      <Box  mb={2}>
        <ChainSites />
      </Box>
    </>
  );
};

export default ChainSitesPage;
