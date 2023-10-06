import RootLayout from "@/layouts/RootLayout";

import ExploreCubes from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreCubes",
  component: ExploreCubes,
} as Meta<typeof ExploreCubes>;

const Template: StoryFn<typeof ExploreCubes> = (args) => (
  <RootLayout>
    <ExploreCubes {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  availableQueryMembers: {
    Airports: {
      measures: {
        "Airports.count": {
          aggType: "count",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: { dimensions: [], measures: [] },
          isVisible: true,
          name: "Airports.count",
          shortTitle: "Count",
          title: "Airports Count",
          type: "number",
        },
      },
      dimensions: {
        "Airports.airportid": {
          isVisible: true,
          name: "Airports.airportid",
          shortTitle: "Airportid",
          suggestFilterValues: true,
          title: "Airports Airportid",
          type: "string",
        },
        "Airports.name": {
          isVisible: true,
          name: "Airports.name",
          shortTitle: "Name",
          suggestFilterValues: true,
          title: "Airports Name",
          type: "string",
        },
        "Airports.city": {
          isVisible: true,
          name: "Airports.city",
          shortTitle: "City",
          suggestFilterValues: true,
          title: "Airports City",
          type: "string",
        },
        "Airports.country": {
          isVisible: true,
          name: "Airports.country",
          shortTitle: "Country",
          suggestFilterValues: true,
          title: "Airports Country",
          type: "string",
        },
        "Airports.iata": {
          isVisible: true,
          name: "Airports.iata",
          shortTitle: "Iata",
          suggestFilterValues: true,
          title: "Airports Iata",
          type: "string",
        },
        "Airports.icao": {
          isVisible: true,
          name: "Airports.icao",
          shortTitle: "Icao",
          suggestFilterValues: true,
          title: "Airports Icao",
          type: "string",
        },
        "Airports.latitude": {
          isVisible: true,
          name: "Airports.latitude",
          shortTitle: "Latitude",
          suggestFilterValues: true,
          title: "Airports Latitude",
          type: "string",
        },
        "Airports.longitude": {
          isVisible: true,
          name: "Airports.longitude",
          shortTitle: "Longitude",
          suggestFilterValues: true,
          title: "Airports Longitude",
          type: "string",
        },
        "Airports.timezone": {
          isVisible: true,
          name: "Airports.timezone",
          shortTitle: "Timezone",
          suggestFilterValues: true,
          title: "Airports Timezone",
          type: "string",
        },
        "Airports.dst": {
          isVisible: true,
          name: "Airports.dst",
          shortTitle: "Dst",
          suggestFilterValues: true,
          title: "Airports Dst",
          type: "string",
        },
        "Airports.tz": {
          isVisible: true,
          name: "Airports.tz",
          shortTitle: "Tz",
          suggestFilterValues: true,
          title: "Airports Tz",
          type: "string",
        },
        "Airports.type": {
          isVisible: true,
          name: "Airports.type",
          shortTitle: "Type",
          suggestFilterValues: true,
          title: "Airports Type",
          type: "string",
        },
        "Airports.source": {
          isVisible: true,
          name: "Airports.source",
          shortTitle: "Source",
          suggestFilterValues: true,
          title: "Airports Source",
          type: "string",
        },
      },
      segments: {},
      timeDimensions: {},
    },
    Tripdata: {
      measures: {
        "Tripdata.count": {
          aggType: "count",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: { dimensions: [], measures: [] },
          isVisible: true,
          name: "Tripdata.count",
          shortTitle: "Count",
          title: "Tripdata Count",
          type: "number",
        },
        "Tripdata.passengerCount": {
          aggType: "sum",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: { dimensions: [], measures: [] },
          isVisible: true,
          name: "Tripdata.passengerCount",
          shortTitle: "Passenger Count",
          title: "Tripdata Passenger Count",
          type: "number",
        },
      },
      dimensions: {
        "Tripdata.guid": {
          isVisible: true,
          name: "Tripdata.guid",
          shortTitle: "Guid",
          suggestFilterValues: true,
          title: "Tripdata Guid",
          type: "string",
        },
        "Tripdata.vendorId": {
          isVisible: true,
          name: "Tripdata.vendorId",
          shortTitle: "Vendor Id",
          suggestFilterValues: true,
          title: "Tripdata Vendor Id",
          type: "string",
        },
        "Tripdata.tripDistance": {
          isVisible: true,
          name: "Tripdata.tripDistance",
          shortTitle: "Trip Distance",
          suggestFilterValues: true,
          title: "Tripdata Trip Distance",
          type: "string",
        },
        "Tripdata.pickupLongitude": {
          isVisible: true,
          name: "Tripdata.pickupLongitude",
          shortTitle: "Pickup Longitude",
          suggestFilterValues: true,
          title: "Tripdata Pickup Longitude",
          type: "string",
        },
        "Tripdata.pickupLatitude": {
          isVisible: true,
          name: "Tripdata.pickupLatitude",
          shortTitle: "Pickup Latitude",
          suggestFilterValues: true,
          title: "Tripdata Pickup Latitude",
          type: "string",
        },
        "Tripdata.rateCodeId": {
          isVisible: true,
          name: "Tripdata.rateCodeId",
          shortTitle: "Rate Code Id",
          suggestFilterValues: true,
          title: "Tripdata Rate Code Id",
          type: "string",
        },
        "Tripdata.storeAndFwdFlag": {
          isVisible: true,
          name: "Tripdata.storeAndFwdFlag",
          shortTitle: "Store and Fwd Flag",
          suggestFilterValues: true,
          title: "Tripdata Store and Fwd Flag",
          type: "string",
        },
        "Tripdata.dropoffLongitude": {
          isVisible: true,
          name: "Tripdata.dropoffLongitude",
          shortTitle: "Dropoff Longitude",
          suggestFilterValues: true,
          title: "Tripdata Dropoff Longitude",
          type: "string",
        },
        "Tripdata.dropoffLatitude": {
          isVisible: true,
          name: "Tripdata.dropoffLatitude",
          shortTitle: "Dropoff Latitude",
          suggestFilterValues: true,
          title: "Tripdata Dropoff Latitude",
          type: "string",
        },
        "Tripdata.paymentType": {
          isVisible: true,
          name: "Tripdata.paymentType",
          shortTitle: "Payment Type",
          suggestFilterValues: true,
          title: "Tripdata Payment Type",
          type: "string",
        },
        "Tripdata.fareAmount": {
          isVisible: true,
          name: "Tripdata.fareAmount",
          shortTitle: "Fare Amount",
          suggestFilterValues: true,
          title: "Tripdata Fare Amount",
          type: "string",
        },
        "Tripdata.extra": {
          isVisible: true,
          name: "Tripdata.extra",
          shortTitle: "Extra",
          suggestFilterValues: true,
          title: "Tripdata Extra",
          type: "string",
        },
        "Tripdata.mtaTax": {
          isVisible: true,
          name: "Tripdata.mtaTax",
          shortTitle: "Mta Tax",
          suggestFilterValues: true,
          title: "Tripdata Mta Tax",
          type: "string",
        },
        "Tripdata.tipAmount": {
          isVisible: true,
          name: "Tripdata.tipAmount",
          shortTitle: "Tip Amount",
          suggestFilterValues: true,
          title: "Tripdata Tip Amount",
          type: "string",
        },
        "Tripdata.tollsAmount": {
          isVisible: true,
          name: "Tripdata.tollsAmount",
          shortTitle: "Tolls Amount",
          suggestFilterValues: true,
          title: "Tripdata Tolls Amount",
          type: "string",
        },
        "Tripdata.improvementSurcharge": {
          isVisible: true,
          name: "Tripdata.improvementSurcharge",
          shortTitle: "Improvement Surcharge",
          suggestFilterValues: true,
          title: "Tripdata Improvement Surcharge",
          type: "string",
        },
        "Tripdata.totalAmount": {
          isVisible: true,
          name: "Tripdata.totalAmount",
          shortTitle: "Total Amount",
          suggestFilterValues: true,
          title: "Tripdata Total Amount",
          type: "string",
        },
        "Tripdata.junk1": {
          isVisible: true,
          name: "Tripdata.junk1",
          shortTitle: "Junk1",
          suggestFilterValues: true,
          title: "Tripdata Junk1",
          type: "string",
        },
        "Tripdata.junk2": {
          isVisible: true,
          name: "Tripdata.junk2",
          shortTitle: "Junk2",
          suggestFilterValues: true,
          title: "Tripdata Junk2",
          type: "string",
        },
        "Tripdata.pickupDate": {
          isVisible: true,
          name: "Tripdata.pickupDate",
          shortTitle: "Pickup Date",
          suggestFilterValues: true,
          title: "Tripdata Pickup Date",
          type: "time",
        },
        "Tripdata.pickupDatetime": {
          isVisible: true,
          name: "Tripdata.pickupDatetime",
          shortTitle: "Pickup Datetime",
          suggestFilterValues: true,
          title: "Tripdata Pickup Datetime",
          type: "time",
        },
        "Tripdata.dropoffDatetime": {
          isVisible: true,
          name: "Tripdata.dropoffDatetime",
          shortTitle: "Dropoff Datetime",
          suggestFilterValues: true,
          title: "Tripdata Dropoff Datetime",
          type: "time",
        },
      },
      segments: {},
      timeDimensions: {
        "Tripdata.pickupDate": {
          isVisible: true,
          name: "Tripdata.pickupDate",
          shortTitle: "Pickup Date",
          suggestFilterValues: true,
          title: "Tripdata Pickup Date",
          type: "time",
        },
        "Tripdata.pickupDatetime": {
          isVisible: true,
          name: "Tripdata.pickupDatetime",
          shortTitle: "Pickup Datetime",
          suggestFilterValues: true,
          title: "Tripdata Pickup Datetime",
          type: "time",
        },
        "Tripdata.dropoffDatetime": {
          isVisible: true,
          name: "Tripdata.dropoffDatetime",
          shortTitle: "Dropoff Datetime",
          suggestFilterValues: true,
          title: "Tripdata Dropoff Datetime",
          type: "time",
        },
      },
    },
  },
  selectedQueryMembers: {
    measures: [],
    dimensions: [
      {
        index: 0,
        isVisible: true,
        name: "Airports.airportid",
        shortTitle: "Airportid",
        suggestFilterValues: true,
        title: "Airports Airportid",
        type: "string",
      },
      {
        index: 1,
        isVisible: true,
        name: "Airports.name",
        shortTitle: "Name",
        suggestFilterValues: true,
        title: "Airports Name",
        type: "string",
      },
      {
        index: 2,
        isVisible: true,
        name: "Airports.city",
        shortTitle: "City",
        suggestFilterValues: true,
        title: "Airports City",
        type: "string",
      },
    ],
    segments: [],
    timeDimensions: [],
    filters: [],
  },
};
