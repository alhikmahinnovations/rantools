import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { cleanSitesInput } from "../../utils/strings";
import useNotification from "../notification/useNotification";

const ChainSites = () => {
  const [siteInput, setSiteInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  // const [copied, setCopied] = useState(false);
  const [bearerSite, setBearerSite] = useState<string | null>(null);
  const [selectedSites, setSelectedSites] = useState<string[]>([]);
  const [siteDateMap, setSiteDateMap] = useState<Map<string, string>>(
    new Map()
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    const { sites, dates } = cleanSitesInput(siteInput, dateInput);
    updateSiteDateMap(sites, dates);
  }, [siteInput, dateInput]);

  const handleSiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSiteInput(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateInput(event.target.value);
  };

  const updateSiteDateMap = (sites: string[], dates: string[]) => {
    const map = new Map<string, string>();
    const lastDate = dates[dates.length - 1];

    if (dates.length === 1) {
      // Assign the same date to all sites if only one date is given
      sites.forEach((site) => map.set(site, dates[0]));
    } else {
      // Map each site to its corresponding date
      sites.forEach((site, index) => {
        const date = dates[index] || lastDate; // Use the last date for remaining sites
        map.set(site, date);
      });
    }
    setSiteDateMap(map);
  };

  const handleCopy = () => {
    const formattedChain = getFormattedChain();
    if (formattedChain) {
      navigator.clipboard.writeText(formattedChain).then(() => {
        // setCopied(true);
        showNotification("Chaîne copiée avec succès !", "success");
        // setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleSetBearer = (site: string) => {
    setBearerSite(site);
  };

  const handleSelectSite = (site: string) => {
    setSelectedSites((prev) =>
      prev.includes(site) ? prev.filter((s) => s !== site) : [...prev, site]
    );
    // Auto-select corresponding date when selecting a site
    if (!siteDateMap.has(site)) return; // If site doesn't have a date, do nothing
    const date = siteDateMap.get(site);
    setSelectedDate(date || null);
  };

  const handleSelectAll = () => {
    if (selectedSites.length === sites.length) {
      // Deselect all if all are selected
      setSelectedSites([]);
    } else {
      // Select all if not all are selected
      setSelectedSites(sites);
    }
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  const getFormattedChain = () => {
    if (!bearerSite || selectedSites.length === 0) return "";

    // Get the date for the bearer site
    const bearerSiteDate = siteDateMap.get(bearerSite);

    // Separate bearer site from others
    const orderedSites = selectedSites.slice();

    // Sort the selected sites: put bearer site first, followed by its extensions
    const chainText = orderedSites
      .filter((site) => site !== bearerSite && !site.endsWith("_EXT")) // All main sites except bearer
      .map((site) => {
        const extensionSite = site + "_EXT";
        if (selectedSites.includes(extensionSite)) {
          return site + "/" + extensionSite;
        }
        return site;
      })
      .join("/");

    // Only count main sites for the number of sites
    // const mainSites = selectedSites.filter((site) => !site.endsWith("_EXT"));
    // const siteCount = mainSites.length;

    // First line: just the bearer site date (if available)
    const firstLine = bearerSiteDate ? `${bearerSiteDate}` : "";

    // Create the final chain text with the correct format
    let formattedChain = `${firstLine}\n${bearerSite}`;

    // If the extension of the bearer site is selected, add it to the chain
    const bearerExtension = bearerSite + "_EXT";
    if (selectedSites.includes(bearerExtension)) {
      formattedChain += "/" + bearerExtension;
    }

    // Now append the rest of the sites chain
    if (chainText) {
      formattedChain += `/${chainText}`;
    }

    // Add WhatsApp bold formatting for bearer site in copied chain
    formattedChain = formattedChain.replace(bearerSite, `*${bearerSite}*`);

    // Return the formatted chain and the site count
    return `${formattedChain}`;
    // return `${formattedChain}\nNumber of Sites: ${siteCount}`;
  };

  const { sites, dates } = cleanSitesInput(siteInput, dateInput);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        multiline
        fullWidth
        rows={4}
        value={siteInput}
        onChange={handleSiteChange}
        placeholder="Coller des sites à chainer"
      />

      <TextField
        multiline
        fullWidth
        rows={4}
        value={dateInput}
        onChange={handleDateChange}
        placeholder="Coller des dates correspondantes"
      />

      {sites.length > 0 && (
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedSites.length === sites.length}
                onChange={handleSelectAll}
              />
            }
            label="Sélectionner tout"
          />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {sites.map((site) => (
              <Button
                key={site}
                variant={
                  selectedSites.includes(site) ? "contained" : "outlined"
                }
                onClick={() => handleSelectSite(site)}
              >
                {site}
              </Button>
            ))}
          </Box>
        </Box>
      )}

      {selectedSites.length > 0 && (
        <Box>
          <Typography variant="h6">Sélectionnez le site porteur :</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {selectedSites.map((site) => (
              <Button
                key={site}
                variant={bearerSite === site ? "contained" : "outlined"}
                onClick={() => handleSetBearer(site)}
              >
                {site}
              </Button>
            ))}
          </Box>
        </Box>
      )}

      {dates.length > 0 && (
        <Box>
          <Typography variant="h6">Sélectionnez une date :</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {dates.map((date) => (
              <Button
                key={date}
                variant={selectedDate === date ? "contained" : "outlined"}
                onClick={() => handleSelectDate(date)}
              >
                {date}
              </Button>
            ))}
          </Box>
        </Box>
      )}

      <TextField
        multiline
        fullWidth
        variant="outlined"
        rows={4}
        value={getFormattedChain()}
        placeholder="Votre chaîne de sites"
        slotProps={{ input: { readOnly: true } }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCopy}
          disabled={!getFormattedChain()}
        >
          Copier la chaîne
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
        <Typography variant="body1">
          Number of Sites:{" "}
          {selectedSites.filter((site) => !site.endsWith("_EXT")).length}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChainSites;
