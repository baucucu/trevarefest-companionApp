
import HomePage from '../pages/home.jsx';
import FlightsPage from '../pages/flights.jsx'
import FlightPage from '../pages/flight.jsx'
import ShuttlesPage from '../pages/shuttles.jsx'
import ShuttlePage from '../pages/shuttle.jsx'
import PeoplePage from '../pages/people.jsx'
import PersonPage from '../pages/person.jsx'
import PassengerPage from '../pages/passenger.jsx'
import ActivitiesPage from '../pages/activities.jsx'
import AboutPage from '../pages/about.jsx';
import FormPage from '../pages/form.jsx';

import LeftPage1 from '../pages/left-page-1.jsx';
import LeftPage2 from '../pages/left-page-2.jsx';
import DynamicRoutePage from '../pages/dynamic-route.jsx';
import RequestAndLoad from '../pages/request-and-load.jsx';
import NotFoundPage from '../pages/404.jsx';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/flights/',
    component: FlightsPage,
  },
  {
    path: '/flights/:flightId',
    component: FlightPage,
  },
  {
    path: '/shuttles/',
    component: ShuttlesPage,
    options: {
      clearPreviousHistory: true
    }
  },
  {
    path: '/shuttles/new',
    component: ShuttlePage,
  },
  {
    path: '/shuttles/:shuttleId',
    component: ShuttlePage,
  },
  {
    path: '/people/',
    component: PeoplePage,
  },
  {
    path: '/people/:personId',
    component: PersonPage,
  },
  {
    path: '/passenger/',
    component: PassengerPage,
  },
  {
    path: '/activities/',
    component: ActivitiesPage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },

  {
    path: '/left-page-1/',
    component: LeftPage1,
  },
  {
    path: '/left-page-2/',
    component: LeftPage2,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
