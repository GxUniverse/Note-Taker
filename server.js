const express = require('express');


const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

const APIroutes = require("./Routes/APIroutes");
const htmlRoutes = require("./Routes/htmlRoutes");

app.use(APIroutes)
app.use(htmlRoutes)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


