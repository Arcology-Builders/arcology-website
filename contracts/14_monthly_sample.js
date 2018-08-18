// The advantage of a JS var versus plain JSON is the addition of comments.
var params = {
  type: "monthly",
  sublesseeName: "Irving Q. Mojo ",
  sublesseeEmail: "irving@mojo.com",
  maxSubleaseMonths: 6,
  moveInDate: "1 September 2018", // should always be the 1st day
  finalMoveOutDate: "31 March 2019", // should always be the last calendar day of month
  noticeDays: 0, // setting this to 0 makes it a normal monthly contract
  gracePeriod: 3,
  furniture: "a stack of mattresses with a pea hidden in them",
  bedList: [
    {
      bedNumber: "4P",
      airbnbUrl: "https://www.airbnb.com/rooms/24063724",
      moveInDate: "1 September 2018",
      moveOutDate: "on the last day of a future month, 31 March 2019 at the latest",
    }
  ],
  projectList: [
    { hours: "1 hour per month", // of the form "hours" or "hours per week"
      desc: 'enhancing the house website hosted at <a href="http://arcology.nyc">http://arcology.nyc</a>'
    }
  ],
  monthlyTotalAmountNumber: 1161,
  monthlyRentAmountNumber: 1111,
  lastMonthAmountNumber: 1111,
  monthlyCleaningAmountNumber: 50,
  depositAmountNumber: 1111,
  moveInAmountNumber: 3383,
};
