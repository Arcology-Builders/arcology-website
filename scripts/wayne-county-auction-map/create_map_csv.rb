require 'csv'
require 'nokogiri'
require 'uri'
require 'net/http'
require 'byebug'

def get_auction_properties(start_batch_id, end_batch_id, output_csv_filename)
  CSV.open( output_csv_filename, "w" ) do |output_csv|
    output_csv << ["parcel_id", "full_address"] 

    for batch_number in start_batch_id..end_batch_id
      url_params = {
        "TYPE" => "OTH",
        "AB_ID" => batch_number
      }
      html_page = issue_api_query("https://www.waynecountytreasurermi.com/AuctionBatchItems.aspx", url_params, false)
      
      fragment = Nokogiri::HTML.fragment(html_page)
      td_nodeset = fragment.css('#ContentPlaceHolder1_grvProperty td')
      for i in 0..td_nodeset.length-1
        cur_node = td_nodeset[i]

        # Only get properties in Detroit
        if td_nodeset[i].content.downcase.strip == "detroit"
          full_address = td_nodeset[i - 1].content + ", Detroit, MI " + td_nodeset[i + 1].content
          
          # Lines below not yet working properly
          parcel_id = "-"
          # parcel_id = td_nodeset[1].content.strip
          # street_view_url = "http://maps.google.com/maps?q=&layer=c&cbll=31.33519,-89.28720"

          # Don't include properties marked as removed
          if !parcel_id.downcase.include? "removed"
            output_csv << [parcel_id, full_address]
          end
        end
      end

    end # END: for batch_number

  end # END: CSV.open
end

def issue_api_query(api_endpoint, params = {}, parse_json = true, headers = nil)
  uri = URI(api_endpoint)
  uri.query = URI.encode_www_form(params)
  puts "API QUERY: " + uri.to_s + "\n"
        
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  request = Net::HTTP::Get.new(uri.request_uri)

  if headers
    request.initialize_http_header(headers)
  end
  response = http.request(request)
  
  if response.is_a?(Net::HTTPSuccess)
    if parse_json
      return JSON::parse(response.body, :max_nesting => false)  
    end
    return response.body
  else
    puts "Error querying " + api_endpoint + ": " + response.to_s
    return nil
  end
end

### START: MAIN EXECUTION

get_auction_properties(1, 51, "inprogress_Oct-20-2021.csv")

### END: MAIN EXECUTION 

