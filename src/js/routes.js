
import HomePage from '../pages/home.jsx';
import TransportationPage from '../pages/transportation.jsx'
import TransportationDetailsPage from '../pages/transportationDetails.jsx'
import TransportationRequestPage from '../pages/transportationRequest.jsx'
import TransportationPendingPage from '../pages/transportationPending.jsx'
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
    path: '/transportation/',
    component: TransportationPage,
  },
  {
    path: '/transportation/pending',
    component: TransportationPendingPage,
  },
  {
    path: '/transportation/request',
    component: TransportationRequestPage,
  },
  {
    path: '/transportation/:transportationId',
    component: TransportationDetailsPage,
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
