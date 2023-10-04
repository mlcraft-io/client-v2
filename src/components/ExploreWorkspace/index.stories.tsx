import RootLayout from "@/layouts/RootLayout";

import ExploreWorkspace from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreWorkspace",
  component: ExploreWorkspace,
} as Meta<typeof ExploreWorkspace>;

const Template: StoryFn<typeof ExploreWorkspace> = (args) => (
  <RootLayout>
    <ExploreWorkspace {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  basePath:
    "/~/explore/35c549a8-c38a-4ff1-90a5-b3081a35aa93/b24d941c-94ac-4bca-8a3a-9e179a4fc06e",
  loading: false,
  meta: [
    {
      dimensions: [
        {
          isVisible: true,
          name: "Airports.airportid",
          shortTitle: "Airportid",
          suggestFilterValues: true,
          title: "Airports Airportid",
          type: "string",
        },
        {
          isVisible: true,
          name: "Airports.name",
          shortTitle: "Name",
          suggestFilterValues: true,
          title: "Airports Name",
          type: "string",
        },
        {
          isVisible: true,
          name: "Airports.city",
          shortTitle: "City",
          suggestFilterValues: true,
          title: "Airports City",
          type: "string",
        },
        {
          isVisible: true,
          name: "Airports.country",
          shortTitle: "Country",
          suggestFilterValues: true,
          title: "Airports Country",
          type: "string",
        },
        {
          isVisible: true,
          name: "Airports.iata",
          shortTitle: "Iata",
          suggestFilterValues: true,
          title: "Airports Iata",
          type: "string",
        },
        {
          isVisible: true,
          name: "Airports.icao",
          shortTitle: "Icao",
          suggestFilterValues: true,
          title: "Airports Icao",
          type: "string",
        },
        {
          isVisible: true,
          name: "Airports.latitude",
          shortTitle: "Latitude",
          suggestFilterValues: true,
          title: "Airports Latitude",
          type: "string",
        },
        {
          isVisible: true,
          name: "Airports.longitude",
          shortTitle: "Longitude",
          suggestFilterValues: true,
          title: "Airports Longitude",
          type: "string",
        },
        {
          isVisible: true,
          name: "Airports.timezone",
          shortTitle: "Timezone",
          suggestFilterValues: true,
          title: "Airports Timezone",
          type: "string",
        },
        {
          isVisible: true,
          name: "Airports.dst",
          shortTitle: "Dst",
          suggestFilterValues: true,
          title: "Airports Dst",
          type: "string",
        },
        {
          isVisible: true,
          name: "Airports.tz",
          shortTitle: "Tz",
          suggestFilterValues: true,
          title: "Airports Tz",
          type: "string",
        },
        {
          isVisible: true,
          name: "Airports.type",
          shortTitle: "Type",
          suggestFilterValues: true,
          title: "Airports Type",
          type: "string",
        },
        {
          isVisible: true,
          name: "Airports.source",
          shortTitle: "Source",
          suggestFilterValues: true,
          title: "Airports Source",
          type: "string",
        },
      ],
      measures: [
        {
          aggType: "count",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: {
            dimensions: [],
            measures: [],
          },
          isVisible: true,
          name: "Airports.count",
          shortTitle: "Count",
          title: "Airports Count",
          type: "number",
        },
      ],
      name: "Airports",
      public: true,
      segments: [],
      title: "Airports",
      type: "cube",
    },
    {
      dimensions: [
        {
          isVisible: true,
          name: "Tripdata.guid",
          shortTitle: "Guid",
          suggestFilterValues: true,
          title: "Tripdata Guid",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.vendorId",
          shortTitle: "Vendor Id",
          suggestFilterValues: true,
          title: "Tripdata Vendor Id",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.tripDistance",
          shortTitle: "Trip Distance",
          suggestFilterValues: true,
          title: "Tripdata Trip Distance",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.pickupLongitude",
          shortTitle: "Pickup Longitude",
          suggestFilterValues: true,
          title: "Tripdata Pickup Longitude",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.pickupLatitude",
          shortTitle: "Pickup Latitude",
          suggestFilterValues: true,
          title: "Tripdata Pickup Latitude",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.rateCodeId",
          shortTitle: "Rate Code Id",
          suggestFilterValues: true,
          title: "Tripdata Rate Code Id",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.storeAndFwdFlag",
          shortTitle: "Store and Fwd Flag",
          suggestFilterValues: true,
          title: "Tripdata Store and Fwd Flag",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.dropoffLongitude",
          shortTitle: "Dropoff Longitude",
          suggestFilterValues: true,
          title: "Tripdata Dropoff Longitude",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.dropoffLatitude",
          shortTitle: "Dropoff Latitude",
          suggestFilterValues: true,
          title: "Tripdata Dropoff Latitude",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.paymentType",
          shortTitle: "Payment Type",
          suggestFilterValues: true,
          title: "Tripdata Payment Type",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.fareAmount",
          shortTitle: "Fare Amount",
          suggestFilterValues: true,
          title: "Tripdata Fare Amount",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.extra",
          shortTitle: "Extra",
          suggestFilterValues: true,
          title: "Tripdata Extra",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.mtaTax",
          shortTitle: "Mta Tax",
          suggestFilterValues: true,
          title: "Tripdata Mta Tax",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.tipAmount",
          shortTitle: "Tip Amount",
          suggestFilterValues: true,
          title: "Tripdata Tip Amount",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.tollsAmount",
          shortTitle: "Tolls Amount",
          suggestFilterValues: true,
          title: "Tripdata Tolls Amount",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.improvementSurcharge",
          shortTitle: "Improvement Surcharge",
          suggestFilterValues: true,
          title: "Tripdata Improvement Surcharge",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.totalAmount",
          shortTitle: "Total Amount",
          suggestFilterValues: true,
          title: "Tripdata Total Amount",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.junk1",
          shortTitle: "Junk1",
          suggestFilterValues: true,
          title: "Tripdata Junk1",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.junk2",
          shortTitle: "Junk2",
          suggestFilterValues: true,
          title: "Tripdata Junk2",
          type: "string",
        },
        {
          isVisible: true,
          name: "Tripdata.pickupDate",
          shortTitle: "Pickup Date",
          suggestFilterValues: true,
          title: "Tripdata Pickup Date",
          type: "time",
        },
        {
          isVisible: true,
          name: "Tripdata.pickupDatetime",
          shortTitle: "Pickup Datetime",
          suggestFilterValues: true,
          title: "Tripdata Pickup Datetime",
          type: "time",
        },
        {
          isVisible: true,
          name: "Tripdata.dropoffDatetime",
          shortTitle: "Dropoff Datetime",
          suggestFilterValues: true,
          title: "Tripdata Dropoff Datetime",
          type: "time",
        },
      ],
      measures: [
        {
          aggType: "count",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: {
            dimensions: [],
            measures: [],
          },
          isVisible: true,
          name: "Tripdata.count",
          shortTitle: "Count",
          title: "Tripdata Count",
          type: "number",
        },
        {
          aggType: "sum",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: {
            dimensions: [],
            measures: [],
          },
          isVisible: true,
          name: "Tripdata.passengerCount",
          shortTitle: "Passenger Count",
          title: "Tripdata Passenger Count",
          type: "number",
        },
      ],
      name: "Tripdata",
      public: true,
      segments: [],
      title: "Tripdata",
      type: "cube",
    },
  ],
  params: {
    dataSourceId: "35c549a8-c38a-4ff1-90a5-b3081a35aa93",
    explorationId: "b24d941c-94ac-4bca-8a3a-9e179a4fc06e",
    tabId: null,
    chartId: null,
    screenshotMode: false,
  },
  source: {
    id: "35c549a8-c38a-4ff1-90a5-b3081a35aa93",
    name: "github.demo.altinity.cloud",
    db_type: "CLICKHOUSE",
    db_params: {
      ssl: true,
      host: "github.demo.altinity.cloud",
      port: "8443",
      user: "demo",
      database: "default",
      password: "demo",
    },
    created_at: "2021-09-09T11:52:58.347143+00:00",
    updated_at: "2023-08-25T07:04:44.238898+00:00",
  },
};