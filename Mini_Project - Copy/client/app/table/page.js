import React from "react";
import TableImage from "@/components/TableImage";
import ReservationForm from "@/components/ReservationForm";
import { Col, Container, Row } from "react-bootstrap";

const Page = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <TableImage />
        </Col>
        <Col xs={12} md={6}>
          <ReservationForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Page;
