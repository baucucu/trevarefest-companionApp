import NotFoundPage from '../pages/404.jsx';
import TransportationPage from '../pages/transportation'
import TransportationDetailsPage from '../pages/transportationDetails.jsx'
import TransportationRequestPage from '../pages/transportationRequest.jsx'
import TransportationPendingPage from '../pages/transportationPending.jsx'

var _ = require('lodash');
var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)

const axios = require('axios');

var routes = [
    {
        path: '/transportation/:transportationId',
        async: function ({ router, to, resolve }) {
          // App instance
          var app = router.app;
    
          // Show Preloader
          app.preloader.show();
          
          console.log("transportation details router: ", to.params)
          const transportationId = to.params.transportationId
    
          function getTransportation(transportationId) {
            return axios({
              url: `https://api.airtable.com/v0/appw2hvpKRTQCbB4O/tbleaxo1OqwVqJwBk/${transportationId}`,
              method: 'get',
              headers: {
                "Authorization": "Bearer keyYNFILTvHzPsq1B"
              }
            })
          }
    
          Promise.all([getTransportation(transportationId)])
          .then(response => {
            console.log("preloading data: ",response)
            
            app.preloader.hide();
            // Resolve route to load page
            resolve(
              {
                component: TransportationDetailsPage,
              },
              {
                props: {
                  transportation: response[0].data,
                }
              }
            );
          })
          .catch(err => {
            console.log(err)
          })
        },
    },
  {
    path: '/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      
    //   var userId = to.query.userId;

      function getTransportation() {
        return axios({
          url: `https://api.airtable.com/v0/appw2hvpKRTQCbB4O/tbleaxo1OqwVqJwBk`,
          method: 'get',
          headers: {
            "Authorization": "Bearer keyYNFILTvHzPsq1B"
          }
        })
      }

      Promise.all([getTransportation()])
      .then(response => {
        console.log("preloading data: ",response)
        
        app.preloader.hide();
        // Resolve route to load page
        resolve(
          {
            component: TransportationPage,
          },
          {
            props: {
              transportation: response[0].data.records,
            }
          }
        );
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;