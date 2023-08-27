import styled from "styled-components";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Col, Row } from "react-bootstrap";

import { useEffect, useState } from "react";
import axios from "axios";
function Portfoilo() {
  const user = useSelector((state) => state.user);
  const [myStockList, setMyStockList] = useState([]);
  const [totalInvest, setTotalInvest] = useState(0);
  let list = [];
  useEffect(() => {
    user.stock.map((myStock) => {
      try {
        axios
          .get(
            `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=hfJvdPemckjU7lcCQD1MgH2xtoQpmcD%2B5aw%2BGcZN1kxZ9dZuhUReliPXJLBugToIa9OBq5uAhofMspWKq0HMuQ%3D%3D&likeSrtnCd=${myStock.srtnCd}&resultType=json&numOfRows=1`
          )
          .then((response) => {
            let result = response.data.response.body.items.item;

            list.push({
              name: result[0].itmsNm,
              srtnCd: result[0].srtnCd,
              최종가: parseFloat(result[0].clpr),
              date: result[0].basDt,
              구매가: parseFloat(myStock.price),
              구매개수: myStock.num,
              총구매액: parseFloat(myStock.totalPrice),
            });
            setTotalInvest(totalInvest + myStock.totalPrice);
          });
      } catch (e) {
        console.log(e);
      }
    });
    setMyStockList(list);
  }, []);
  console.log(myStockList);

  return (
    <>
      <PortCard>
        Portfolio
        <br />
        <h1 className="fw-bold">{totalInvest}</h1>
        <Row className="pt-3 pb-2 justify-content-between">
          <Col className="text-start">
            Profit/Loss
            <br />
            -96.877
          </Col>
          <Col>
            Capital Gain
            <br />
            -96.877
          </Col>
          <Col className="text-end">
            Total <br />
            -96.877
          </Col>
        </Row>
      </PortCard>
      <StockList>
        <h3 className="fw-bold">Stock List</h3>

        <StockItems>
          <Row className="align-items-center mt-2 m-0 ">
            {myStockList.length > 0
              ? myStockList.map((myStockList) => (
                  <>
                    <Col className="col-9">
                      <div>
                        <h4 className="title"> {myStockList.name}</h4>
                      </div>
                    </Col>
                    <Col className="col-3 text-end">가격</Col>

                    <Row className="p-1 stock-data border-bottom">
                      <Col className="text-start  ">
                        Profit/Loss
                        <br />
                        {myStockList.최종가 - myStockList.구매가}
                      </Col>
                      <Col className="text-center  ">
                        Capital Gain
                        <br />
                        {(1 - myStockList.최종가 / myStockList.구매가) * 100}%
                      </Col>
                      <Col className="text-end  ">
                        Total <br />
                        {(myStockList.최종가 - myStockList.구매가) *
                          myStockList.구매개수}
                      </Col>
                    </Row>
                  </>
                ))
              : null}
          </Row>
        </StockItems>
      </StockList>
    </>
  );
}

export default Portfoilo;

const PortCard = styled.div`
  margin: 5% 5% 5% 5%;
  padding: 4% 3% 3% 3%;

  text-align: center;
  background: #e5f64a;
  border-radius: 30px;
`;

const StockList = styled.div`
  margin: 5% 5% 5% 5%;
`;

const StockItems = styled.div`
  .title {
    font-size: 1em;
    font-weight: 600;
    margin: 0;
  }

  .content {
    margin: 0;
    font-size: 0.8em;
    color: gray;
  }
  .stock-data {
    margin: 0;

    font-size: 0.8em;
  }
`;
