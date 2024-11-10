import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  userName: string;
  otp: string;
}

export default function VerificationEmail({ userName, otp }: VerificationEmailProps) {
  return (
      <Html lang="en" dir="ltr">
          <Head>
              <title>Verification Code</title>
              <Font
                  fontFamily="Roboto"
                  fallbackFontFamily="Verdana"
                  webFont={{
                      url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                      format: "woff2",
                  }}
                  fontWeight={400}
                  fontStyle="normal"
              />
              <style>
                  {`
                      /* Basic Reset */
                      body, html {
                          margin: 0;
                          padding: 0;
                          font-family: Roboto, Verdana, sans-serif;
                          background-color: #f4f4f9;
                          color: #333;
                      }
                      
                      /* Animation for verification code */
                      .otp-code {
                          font-size: 24px;
                          font-weight: bold;
                          color: #4a90e2;
                          background-color: #f0f8ff;
                          padding: 10px;
                          border-radius: 8px;
                          text-align: center;
                          margin: 20px 0;
                          display: inline-block;
                          animation: fadeIn 1.5s ease-in-out;
                      }

                      /* Keyframes for fade-in animation */
                      @keyframes fadeIn {
                          from { opacity: 0; }
                          to { opacity: 1; }
                      }

                      /* Responsive styling */
                      @media (max-width: 600px) {
                          .email-container {
                              padding: 20px 10px;
                          }
                          .otp-code {
                              font-size: 20px;
                          }
                      }
                  `}
              </style>
          </Head>
          <Preview>Here's your verification code: {otp}</Preview>
          <Section style={{ padding: "20px", backgroundColor: "#ffffff", maxWidth: "600px", margin: "0 auto", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <Row>
                  <Heading as="h2" style={{ fontSize: "24px", fontWeight: "bold", color: "#333", marginBottom: "20px" }}>
                      Hi <span style={{ color: "#6a1b9a" }}>{userName}</span>,
                  </Heading>
              </Row>
              <Row>
                  <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#555" }}>
                      Thanks for joining <strong>@Ali-Portfolio</strong>! Please use the following verification code to complete your registration:
                  </Text>
              </Row>
              <Row>
                  <div className="otp-code">{otp}</div>
              </Row>
              <Row>
                  <Text style={{ fontSize: "14px", color: "#777", marginTop: "20px" }}>
                      If you didn't request this code, please ignore this email.
                  </Text>
              </Row>
          </Section>
      </Html>
  );
}

