# Arcology Website<br />
To run the site locally you must first have a Docker installed<br />
To launch run: docker-compose up<br />
![Alt text](https://github.com/colinsheppard10/arcology_website/blob/master/client/public/images/siteSetup.png "Optional title")
<br />
The main react front end is served from 3050:/ <br />
The site is setup to allow more services to be added <br />
An example of an added service is the (dummy) API service <br />
To add a new service, look at how the API service gets routed in the /nginx/default.conf file. You can add a new service in the same way!