"use client";

import { AreaChart } from "@tinybirdco/charts";

export function StarsGraph(params: {
  org_name?: string;
  repo_name?: string;
  timeframe?: string;
  start_date: string;
  end_date: string;
}) {
  // Format dates to YYYY/MM/DD if they exist
  const start = new Date(params.start_date);
  const end = new Date(params.end_date);
  const diffInDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  let group_by = "year";
  if (diffInDays <= 31) {
    group_by = "day";
  } else if (diffInDays <= 180) {
    group_by = "week";
  } else if (diffInDays <= 1825) {
    // 5 years * 365 days
    group_by = "month";
  }

  return (
    <>
      <h2 className="text-xl font-bold mt-6 mb-2">Repository Stars</h2>
      <AreaChart
        endpoint="https://api.tinybird.co/v0/pipes/stars_endpoint.json"
        token={process.env.NEXT_PUBLIC_TINYBIRD_TOKEN}
        index="DATE"
        categories={["STAR_COUNT"]}
        colorPalette={[
          "#27F795",
          "#037D5F",
          "#12C7D1",
          "#9263AF",
          "#5A6FC0",
          "#86BFDB",
          "#FFC145",
          "#FF6B6C",
          "#DC82C8",
          "#BE5EA9",
        ]}
        groupBy="REPO_NAME"
        height="500px"
        params={params}
      />
    </>
  );
}
