const receiptArea = document.getElementById("output-box");
const calculatebutton = document.querySelector("button");

const calc = () => {
  // Get Value from HTML
  const onpeakhours = parseFloat(document.getElementById("onpeak").value);
  const offpeakhours = parseFloat(document.getElementById("offpeak").value);

  // Check for NaN values
  if (isNaN(onpeakhours) || isNaN(offpeakhours)) {
    alert("Enter hours!!!");
    return false;
  }

  // Rates
  const onpeakrate = 0.132;
  const offpeakrate = 0.065;
  const hstrate = 0.13;
  const rebaterate = 0.08;

  // Calculations
  const onpeak = onpeakhours * onpeakrate;
  const offpeak = offpeakhours * offpeakrate;
  const gross = onpeak + offpeak;
  const hst = gross * hstrate;
  let rebate;
  let net;

  // Provincial Rebate Check
  const province = document.querySelector("select").value;
  if (province == "bc") {
    rebate = gross * rebaterate;
    net = gross + hst - rebate;
  } else {
    rebate = 0;
    net = gross + hst;
  }

  // Output
  const receiptHTML = `
  <div id="result-boxes">
  <div id="onpeakbox">
  <p id="onpeakbox">ON PEAK USAGE<br><span id="onpeakprice">$${onpeak.toFixed(
    2
  )}</span><br><span id="onpeakinfo">${onpeakhours} kWh @ $${onpeakrate}/hr</span></p>
    </div>
    <div id="offpeakbox">
    <p id="offpeakbox">OFF PEAK USAGE<br><span id="offpeakprice">$${offpeak.toFixed(
      2
    )}</span><br><span id="offpeakinfo">${offpeakhours} kWh @ $${offpeakrate}/hr</span></p>
      </div>
      </div>
      <div id="charges-box">
      <p>Gross Consumption Charges: $${gross.toFixed(2)}</p>
      <p>Sales Tax (13%): $${hst.toFixed(2)}</p>
      <p>Provincial Rebate: -$${rebate.toFixed(2)}</p>
      </div>
      <div id="total-box">
      <p id="total-text"><span id="spantotaltext">TOTAL TO PAY</span><br><span id="total-value"> $${net.toFixed(
        2
      )}</span></p>
        </div>
        `;

  // Update the receipt area content and show it
  receiptArea.innerHTML = receiptHTML;
  receiptArea.style.display = "block";

  console.log("Console Log Values !!!");
  console.log("ON PEAK HOURS : " + onpeakhours.toFixed(2));
  console.log("OFF PEAK HOURS : " + offpeakhours.toFixed(2));
  console.log("ON PEAK RATE : " + onpeak.toFixed(2));
  console.log("OFF PEAK RATE : " + offpeak.toFixed(2));
  console.log("GROSS CHARGES : " + gross.toFixed(2));
  console.log("HST (13%) : " + hst.toFixed(2));
  console.log("PROVINCE SELECTED : " + province);
  console.log("TOTAL REBATE : " + rebate.toFixed(2));
  console.log("NET AMOUNT : " + net.toFixed(2));
};

calculatebutton.addEventListener("click", calc);
