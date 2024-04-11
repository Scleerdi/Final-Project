import express from "express";
import * as Sentry from "@sentry/node";

import bookingsRouter from "./routes/bookings.js";
import amenitiesRouter from "./routes/amenities.js";
import hostsRouter from "./routes/hosts.js";
import loginRouter from "./routes/login.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/reviews.js";
import usersRouter from "./routes/users.js";
import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import "dotenv/config.js";

const app = express();
app.use(express.json()); //always near const app = express();
app.use(log);

Sentry.init({
  //also always near const app = express();
  dsn: "https://b98f506f97da88ceb7f32f68c82adb53@o4506036808515584.ingest.sentry.io/4506178765651968",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());
// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

app.use("/bookings", bookingsRouter);
app.use("/amenities", amenitiesRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
