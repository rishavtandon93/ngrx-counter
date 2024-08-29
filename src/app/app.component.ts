.email-container {
  padding: 20px;
  max-width: 600px; /* Constrain width for readability */
  margin: 0 auto; /* Center align the container */
  background-color: #000; /* Black background */
  border-radius: 5px; /* Rounded corners for a modern look */
  border: 1px solid #444; /* Border around the container */
}

.email-table {
  width: 100%;
  border-collapse: collapse; /* Remove spacing between cells */
  color: white; /* White text for black background */
}

.email-table td {
  padding: 10px;
  vertical-align: top; /* Align text to the top for consistent look */
}

.email-label {
  font-weight: bold;
  text-align: right; /* Align labels to the right */
  padding-right: 20px; /* Space between label and value */
  width: 30%; /* Set a fixed width for labels for consistency */
}


Copy code
<div class="email-container">
  <table class="email-table">
    <tbody>
      <tr>
        <td class="email-label">To:</td>
        <td>{{ data.to }}</td>
      </tr>
      <tr>
        <td class="email-label">From:</td>
        <td>{{ data.from }}</td>
      </tr>
      <tr>
        <td class="email-label">Subject:</td>
        <td>{{ data.subject }}</td>
      </tr>
      <tr>
        <td class="email-label">Exchange ID:</td>
        <td>{{ data.exchangeId }}</td>
      </tr>
    </tbody>
  </table>
</div>
