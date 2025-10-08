import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  url: string;
  name: string;
  email: string;
}

export const ResetPasswordEmailTemplate = ({
  url,
  name,
  email,
}: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Reset your password with Better Auth</Preview>
      <Container style={container}>
        <Heading style={heading}>Hi {name}!</Heading>
        <Section style={buttonContainer}></Section>
        <Text style={paragraph}>
          We received a password reset request for your account associated with
          <strong>{email}</strong>
        </Text>
        <Text style={paragraph}>
          Click the link below to create a new password. This link will expire
          in 24 hours for security reasons.
        </Text>
        <Hr style={hr} />
        <Link href={url} style={reportLink}>
          Reset password
        </Link>
        <Text style={paragraph}>
          {url}
        </Text>
      </Container>
    </Body>
  </Html>
);

ResetPasswordEmailTemplate.PreviewProps = {
  url: "https://example.com/reset-password",
  name: "Brett",
  email: 'brett@example.com'
} as ResetPasswordEmailProps;

export default ResetPasswordEmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const reportLink = {
  fontSize: "14px",
  color: "#b4becc",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};
