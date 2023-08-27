import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import { Button, Form, Row, Col } from "react-bootstrap";
import ChartComponent from "../components/Chart";
import { companyList } from "../components/Chart";

function Home() {
  return (
    <>
      <Form>
        <Form.Group
          className="mt-2 d-flex bg-white ms-3 mx-3 border rounded align-items-center "
          controlId="formBasicPassword"
        >
          <Form.Control
            className=" border-0"
            type="text"
            placeholder="search"
          />
          <Button className="btn btn-light">
            <MdSearch size={30} color="gray" />
          </Button>
        </Form.Group>
      </Form>
      <StockContainer>
        <ChartComponent />
      </StockContainer>
      <Rank>
        <RankButton>
          <button>Top gainer</button>
          <button>Top loser</button>
        </RankButton>
        <RankItems>
          {companyList.map((company) => {
            return (
              <Row
                key={company.srtnCd}
                className="align-items-center mt-2 m-0 "
              >
                <Col className="col-2 text-center">
                  <img
                    src={company.imgUrl}
                    alt="로딩중"
                    width="100%"
                    height="100%"
                    className="rounded-circle"
                  />
                </Col>
                <Col className="col-7">
                  <div>
                    <h4 className="title"> {company.name}</h4>
                    <p className="content">{company.coment}</p>
                  </div>
                </Col>
                <Col className="col-3 text-end">가격</Col>
              </Row>
            );
          })}
        </RankItems>
      </Rank>
    </>
  );
}

const StockContainer = styled.div`
  margin: 2% 5% 0 5%;

  align-items: center;
`;

const Rank = styled.div`
  margin: 0% 5% 0% 5%;
  align-items: center;
`;

const RankButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 7%;
  margin-top: 3%;

  > * {
    width: 40%;
    padding: 1%;
    background: F2F4F6;
    border: none;
    border-radius: 1em;
    color: black;
    font-size: 0.9em;
    font-weight: 500;
    &:hover {
      background: #2e3032;
      color: white;
    }
    &:active {
      background-color: lightgray;
    }
  }
`;

const RankItems = styled.div`
  .title {
    font-size: 1em;
    font-weight: 600;
    margin: 0;
  }
  .content {
    margin: 0;

    font-size: 0.9em;
    color: gray;
  }
`;

export default Home;
