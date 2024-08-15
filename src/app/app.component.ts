this.gridApi.forEachNodeAfterFilter((node) => nodes.push(node));

const siteMaxIdMap = new Map<string, number>();

nodes
  .filter((node) => node.key === null && !!node.data)
  .forEach((node) => {
    const curr = node.data;
    const maxId = siteMaxIdMap.get(curr.site);
    if (maxId === undefined || curr.id > maxId) {
      siteMaxIdMap.set(curr.site, curr.id);
    }
  });

// Convert the Map to an array of filter criteria
const latestData = Array.from(siteMaxIdMap.entries()).map(([site, id]) => ({
  site,
  id,
}));
