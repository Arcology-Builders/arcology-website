# Overview

This Ruby code scrapes data from https://www.waynecountytreasurermi.com in order to build a Google Map showing properties listed on the auction.

# Install

I recommend using rvm or rbenv to ensure you use the appropriate version of Ruby (2.2.4). This will likely work fine on a newer version of Ruby but I haven't tested it.

```
bundle install

ruby create_map_csv.rb

```

# How To Use

1. If you don't have an account, sign up for one at: [https://www.waynecountytreasurermi.com/](https://www.waynecountytreasurermi.com)
1. Login to your account
1. Determine the Status and Batch ID range of the batches you want to scrape on this page: https://www.waynecountytreasurermi.com/AuctionBatch.aspx
1. Update this line of code at the end of the file with the batch number range: `get_auction_properties(<START BATCH ID>, <END BATCH ID (on last page)>, "inprogress_Oct-20-2021.csv")`
1. Run `ruby create_map_csv.rb` to generate the CSV file
1. Go to Google My Maps: https://www.google.com/maps/d
1. Click Create a new map
1. Click Import button on the left
1. Drag the output .csv file the script created into Google My Maps to upload it to your map
1. Select the "full address" column to position placemarks as well as for the placemark titles