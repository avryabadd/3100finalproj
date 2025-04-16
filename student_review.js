document.querySelector("#btnsubmitReview").addEventListener("click", () => {
    const strPeer = document.querySelector("#selectPeer").value;
    const intScore = document.querySelector("#reviewScore").value.trim();
    const strPrivateFeedback = document.querySelector("#privateFeedback").value.trim();
    const strPublicFeedback = document.querySelector("#publicFeedback").value.trim();
  
    let blnError = false;
    let strMessage = "";
  
    if (!strPeer || strPeer === "Select...") {
      blnError = true;
      strMessage += "<p>Please select a peer to review.</p>";
    }
  
    if (!intScore || isNaN(intScore) || intScore < 0 || intScore > 100) {
      blnError = true;
      strMessage += "<p>Please enter a valid score between 0 and 100.</p>";
    }
  
    if (strPrivateFeedback.length < 1) {
      blnError = true;
      strMessage += "<p>Private feedback must not be empty.</p>";
    }
  
    if (strPublicFeedback.length < 1) {
      blnError = true;
      strMessage += "<p>Public feedback must not be empty.</p>";
    }
  
    if (blnError) {
      Swal.fire({
        title: "Review Error",
        html: strMessage,
        icon: "error"
      });
      return;
    }
  
    // ✅ Everything is valid
    Swal.fire({
      title: "Review Submitted",
      icon: "success",
      text: "Your peer review has been submitted"
    });
  });
  