import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useState } from "react";
import StyleSheet, { styled } from "styled-components";
import { Col, Row, Form, Button } from "react-bootstrap";
import { MdKeyboardArrowLeft, MdSearch } from "react-icons/md";
import { companyList } from "../components/Chart";
function LikePage() {
  const user = useSelector((state) => state.user);

  const [likeCompany, setLikeCompany] = useState([]);
  useEffect(() => {
    let liked = [];
    user.like.map((likedStockId) => {
      liked.push(
        ...companyList.filter(
          (companyList) => likedStockId == companyList.srtnCd
        )
      );
    });
    setLikeCompany(liked);
  }, [user]);

  return (
    <>
      <div className="d-flex align-items-center mb-4">
        <MdKeyboardArrowLeft size={35} className="p-0 mx-2 " />

        <Form className="w-75">
          <Form.Group className="mt-2 d-flex bg-white  border rounded ">
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
      </div>
      <hr className="mx-3" />
      <RankItems>
        {likeCompany.map((company) => {
          return (
            <Row
              key={company.srtnCd}
              className="align-items-center mb-2 m-0 pb-2 border-bottom"
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
    </>
  );
}

const RankItems = styled.div`
  margin: 3% 3% 3% 3%;
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

export default LikePage;
