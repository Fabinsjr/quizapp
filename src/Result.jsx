import { useState, useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";
import emailjs from "@emailjs/browser";
export default function result() {
  function handleEmail() {
    fetch("https://api.pdf.co/v1/pdf/convert/from/html", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        // * Get your own by registering at https://app.pdf.co/documentation/api
        "x-api-key":
          "arjun8107@gmail.com_d4a7ffa28f8ba1685ce8c47dadc41cf8bc60f2a72efa9f068ec0bd7aa1c12cdf0d6941d2",
      },
      body: JSON.stringify({
        templateId: "777",
        name: "certificate.pdf",
        orientation: "Landscape",
        templateData: JSON.stringify({
          name: localStorage.getItem("name"),
          marks: localStorage.getItem("marks"),
        }),
      }),
    }).then((response) => {
      response.json().then((data) => {
        emailjs.init("AkMBUDYW6-dVuoScV");
        var templateParams = {
          name: localStorage.getItem("name"),
          message: data.url,
          reply: localStorage.getItem("email"),
        };
        emailjs
          .send("service_0nm3ebm", "template_p7rv1ex", templateParams)
          .then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
      });
    });
  }

  useEffect(() => {
    if (
      localStorage.getItem("name") === null ||
      localStorage.getItem("email") === null
    ) {
      navigate("/");
    }
    Number(localStorage.getItem("marks")) > 4 && handleEmail();
  });
  return (
    <Box
      minH={"100vh"}
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      flexDirection="column"
    >
      <Text fontSize="2xl">Result</Text>
      <Text fontSize="xl">Your score is: {localStorage.getItem("marks")}</Text>
      {Number(localStorage.getItem("marks")) > 4 ? (
        <Text fontSize="xl">Check your email for the certificate!</Text>
      ) : (
        <Text fontSize="xl">
          You need to score at least 5 marks to get the certificate!
        </Text>
      )}
    </Box>
  );
}
