









export const cleanSitesInput = (siteInput: string, dateInput?: string) => {
  const siteLines = siteInput.split("\n").map(line => line.trim()).filter(line => line);
  const dateLines = dateInput ? dateInput.split("\n").map(line => line.trim()).filter(line => line) : [];

  const sites: string[] = [];
  const dates = new Set<string>();

  siteLines.forEach(line => {
    const match = line.match(/^(\d{2}\/\d{2}\/\d{4})?\s*(\d{2}:\d{2})?\s*(.+)$/);
    if (match) {
      const [, date, , site] = match; // Ignorer le 'time' inutilisé
      sites.push(site.trim());
      if (date) dates.add(date);
    }
  });

  return {
    sites,
    dates: Array.from(dates.size > 0 ? dates : new Set(dateLines)), // Assure que dates est bien un tableau
  };
};















export const cleanTheSitesInput = (input: string): string[] => {
  return input
    .trim()
    .split(/[\s,;/\r\n]+/) // Split on spaces, commas, semicolons, and slashes
    // .map(site => site.replace(/[0-9]/g, ''))
    .filter(site => site.length > 0)
    .map(site => site.trim().toUpperCase())
    .filter(site => {
      // Reject pure numbers
      if (!/[A-Z]/.test(site)) return false;
      // if (/^\d+$/.test(site)) return false;

      // Reject names ending with "_EXT"
      // if (site.endsWith("_EXT")) return false;

      // Allow names starting with 2G_, 3G_, 4G_, or 5G_
      if (/^[2345]G_[A-Z0-9-]+$/.test(site)) return true;

      // Otherwise, must be alphabetical or alphanumeric without underscores
      return /^[A-Z0-9-]+$/.test(site);

      //must be alphanumeric with at most one hyphen
      // return /^[A-Z0-9]+(-[A-Z0-9]+)?$/.test(site);
    })
    .filter((site, index, self) => self.indexOf(site) === index); // Remove duplicates
};




export const cleanSitesInput2 = (input: string): { sites: string[]; count: number } => {
  const rawSites = input
    .trim()
    .split(/[\s,;/\r\n]+/) // Split on spaces, commas, semicolons, and slashes
    .filter(site => site.length > 0)
    .map(site => site.trim().toUpperCase());
    // .filter(site => {
    //   // Reject pure numbers
    //   if (!/[A-Z]/.test(site)) return false;

    //   // Allow names starting with 2G_, 3G_, 4G_, or 5G_
    //   if (/^[2345]G_[A-Z0-9-]+$/.test(site)) return true;

    //   // Otherwise, must be alphabetical or alphanumeric without underscores
    //   return /^[A-Z0-9-]+$/.test(site);
    // })
    // // Remove duplicates;
    // .filter((site, index, self) => self.indexOf(site) === index);

  const mainSites = new Set<string>();
  const siteMap = new Map<string, string[]>(); // Store sites and their _EXT versions

  rawSites.forEach(site => {
    if (site.endsWith("_EXT")) {
      const baseName = site.replace("_EXT", "");
      if (mainSites.has(baseName)) {
        siteMap.get(baseName)?.push(site);
      }
    } else {
      mainSites.add(site);
      siteMap.set(site, [site]);
    }
  });

  const orderedSites = Array.from(mainSites).flatMap(site => siteMap.get(site) || [site]);

  return { sites: orderedSites, count: mainSites.size };
};


export const parseSitesInput = (input: string): { sites: string[]; dates: string[] } => {
  const lines = input.trim().split(/\r?\n/);
  const sites: string[] = [];
  const dates: string[] = [];

  lines.forEach(line => {
    const match = line.match(/(\d{2}\/\d{2}\/\d{4})(?:\s(\d{2}:\d{2}))?\s+(\S+)/);
    if (match) {
      const [, date, time, site] = match;
      dates.push(time ? `${date} ${time}` : date);
      sites.push(site.toUpperCase());
    }
  });

  return { sites, dates };
};