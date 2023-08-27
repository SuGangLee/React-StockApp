import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdStarBorder,
  MdStar,
} from "react-icons/md";

import { FaPlusSquare } from "react-icons/fa";
import Chart from "react-apexcharts";
import { Modal } from "react-bootstrap";
import { Row, Col, Button } from "react-bootstrap";
import { addLike, buyStock, removeLike } from "../store/userSlice";

const companyList = [
  {
    srtnCd: "005930",
    name: "삼성전자",
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/800px-Samsung_Logo.svg.png",
    coment: "Korea eletronic company",
  },
  {
    srtnCd: "005380",
    name: "현대차",
    imgUrl:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5752%2F2020%2F12%2F31%2F0000017374_001_20201231113244192.png&type=sc960_832",
    coment: "Korean automobile company",
  },
  {
    srtnCd: "000660",
    name: "SK하이닉스",
    imgUrl:
      "https://search.pstatic.net/sunny/?src=https%3A%2F%2Ffile.bodnara.co.kr%2Fup%2Fnews%2F126131-suma1.jpg&type=sc960_832",
    coment: "Korean semiconductor company",
  },
  {
    srtnCd: "035420",
    name: "네이버",
    imgUrl:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20160504_295%2Fzzlidde_1462360339348GT0M2_PNG%2F2016-05-04_20.11.40.png&type=sc960_832",
    coment: "Korean IT company",
  },
  {
    srtnCd: "105560",
    name: "국민은행",
    imgUrl:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzAyMDdfMTQ5%2FMDAxNDg2NDQ5NTkzODIz.5hqFXL_1kIxpfOc4TwoCODu_7igYAGv-4k3VVYSZINcg.U_-Phv0Lw1FdAILCIiZTNGZdXNMT3tbJW88D09IPZoog.JPEG.wind_shop%2F%25B1%25B9%25B9%25CE%25C0%25BA%25C7%25E0%25B7%25CE%25B0%25ED-2.jpg&type=sc960_832",
    coment: "Korean Bank",
  },
];

function ChartComponent() {
  const [index, setIndex] = useState(0);

  const user = useSelector((state) => state.user);

  let dispatch = useDispatch();

  const [company, setCompany] = useState({
    name: "",
    code: "",
    최종가: 0,
    등락: 0,
    등락율: 0,
    시가: 0,
    최고가: 0,
    최저가: 0,
  });
  const [series, setSeries] = useState([]);
  const [buying, setBuying] = useState("");
  const [num, setNum] = useState(1);

  const chartOptions = {
    chart: {
      type: "area",
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    colors: ["#E91E63"],
    yaxis: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    grid: { show: false },
    dataLabels: {
      enabled: false,
    },
  };
  function getStockData(index) {
    let list = [];

    try {
      axios
        .get(
          `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=hfJvdPemckjU7lcCQD1MgH2xtoQpmcD%2B5aw%2BGcZN1kxZ9dZuhUReliPXJLBugToIa9OBq5uAhofMspWKq0HMuQ%3D%3D&beginBasDt=20230101&likeSrtnCd=${companyList[index].srtnCd}&resultType=json&numOfRows=100`
        )
        .then((response) => {
          let result = response.data.response.body.items.item;

          setCompany((prestate) => {
            return {
              ...prestate,
              name: result[0].itmsNm,
              code: result[0].srtnCd,
              최종가: result[0].clpr,
              등락: result[0].vs,
              등락율: result[0].fltRt,
              시가: result[0].mkp,
              최고가: result[0].hipr,
              최저가: result[0].lopr,
            };
          });
          for (var i = 0; i < result.length; i++) {
            list.push(result[i].clpr);
          }
          setSeries([
            {
              name: "종가",
              data: list,
            },
          ]);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getStockData(index);
  }, [index]);

  return (
    <>
      <Row>
        <Col className="text-end">
          {user.like.includes(company.code) ? (
            <MdStar
              size={25}
              className="mx-2"
              color="gray"
              onClick={() => {
                dispatch(removeLike(company.code));
              }}
            />
          ) : (
            <MdStarBorder
              size={25}
              className="mx-2"
              color="gray"
              onClick={() => {
                dispatch(addLike(company.code));
              }}
            />
          )}
        </Col>
      </Row>

      <Row className="align-items-center pb-2 text-center  ">
        <Col>
          <MdKeyboardArrowLeft
            size={24}
            onClick={() => {
              let i = (index + 4) % 5;

              setIndex(i);
            }}
          />
        </Col>
        <Col xs={8}>
          <h2 className="fw-bold">{company.name}</h2>
        </Col>
        <Col>
          <MdKeyboardArrowRight
            size={24}
            onClick={() => {
              let i = (index + 1) % 5;

              setIndex(i);
            }}
          />
        </Col>
      </Row>

      <div className="d-flex justify-content-between">
        <h1 className="fw-bold">{company.최종가}</h1>
        <div className="d-flex ">
          <Button
            className="mx-2"
            onClick={() => {
              setBuying("buy");
            }}
          >
            Buy
          </Button>
          <Button
            className="btn-danger"
            onClick={() => {
              setBuying("sell");
            }}
          >
            Sell
          </Button>
        </div>
      </div>
      {console.log(buying)}
      {buying === "" ? null : (
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal.Dialog>
            <Modal.Body className="d-flex ">
              <p>{company.최종가}</p>
              <Button onClick={() => setNum(num + 1)}>+</Button>
              수량:{num}
              <br />
              금액:{num * company.최종가}
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setBuying("");
                }}
              >
                닫기
              </Button>
              {buying == "buy" ? (
                <Button
                  variant="primary"
                  onClick={() => {
                    if (user.balance - num * company.최종가 < 0) {
                      return alert("잔고부족");
                    } else {
                      dispatch(
                        buyStock({
                          srtnCd: company.code,
                          num: num,
                          price: company.최종가,
                          totalPrice: num * company.최종가,
                          date: new Date().toLocaleDateString(),
                        })
                      );
                      alert("구매완료");
                    }
                  }}
                >
                  구매하기
                </Button>
              ) : (
                <Button variant="danger">판매하기</Button>
              )}
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
      <div
        style={
          company.등락[0] !== "-" ? { color: redColor } : { color: "blue" }
        }
      >
        <p>
          {company.등락} ({parseFloat(company.등락율)}%)
        </p>
        <Chart
          options={chartOptions}
          series={series}
          type="area"
          className="m-0 p-0 "
        ></Chart>
        <Row className="text-center fw-semibold ">
          <Col>
            <Row>
              <Col style={{ color: "black" }}>open</Col>
              <Col>{company.시가}</Col>
            </Row>
            <Row>
              <Col style={{ color: "black" }}>high</Col>
              <Col style={{ color: "green" }}>{company.최고가}</Col>
            </Row>
            <Row>
              <Col style={{ color: "black" }}>Low</Col>
              <Col>{company.최저가}</Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ChartComponent;
export { companyList };

const redColor = "#E0144C";
