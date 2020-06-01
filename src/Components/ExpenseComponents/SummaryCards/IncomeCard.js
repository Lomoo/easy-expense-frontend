import React, {  useContext } from "react";
import { GlobalContext } from "../../Context/GlobalState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const IconBox = styled.span.attrs({
  className: "icon",
})`
  font-size: 36px;
  width: 56px;
  height: 56px;
`;
const IconBox2 = styled.div.attrs({
  className: "is-4",
})`
  padding: 15px;
  float: left;
  margin-top: -30px;
  margin-right: 15px;
  border-radius: 3px;
  background-color: #999;
  background: linear-gradient(60deg, #26c6da, #00acc1);
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14),
    0 7px 10px -5px rgba(0, 172, 193, 0.4);
`;

export const IncomeCard = () => {
  const { incomes } = useContext(GlobalContext);
  const amounts = incomes.map((income) => income.income);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <>
      <div className="card box">
        <div className="media">
          <div className="media-left">
            <IconBox2>
              <IconBox>
                <FontAwesomeIcon
                  icon="money-check-alt"
                  size="lg"
                  color="white"
                />
              </IconBox>
            </IconBox2>
          </div>
          <div className="media-content text-is-aligned-right">
            <p className="subtitle is-6 ">Your Income</p>
            <p className="title is-size-4-desktop is-size-4-mobile has-text-primary">
              ${total}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncomeCard;
