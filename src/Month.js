import React from "react";
import styled from "styled-components";

export class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: this.props.days,
      stateChanged: false
    };
  }

  componentDidMount() {
    if (this.props.update) {
      this.setState({ days: this.props.update });
    }
  }

  sumAvailability(calendar_list) {
    const activeDays = calendar_list.filter((v) => v.disabled === false);
    let availability = 0;
    let sumOfDays = 0;
    for (const day of activeDays) {
      sumOfDays += 1;
      if (day.dayState !== 1) {
        availability += 1;
      }
    }
    return Number((1 - availability / sumOfDays) * 100).toPrecision(3);
  }

  changeDaysState(id, dayS) {
    const oldArray = this.state.days.filter((v) => v.id !== id);
    this.setState({
      days: [...oldArray, { id: id, dayState: (dayS + 1) % 3, disabled: false }]
    });
    this.setState({ stateChanged: true });
  }

  render() {
    return (
      <div>
        <Wrapper>
          {this.state.days
            .sort((a, b) => a.id - b.id)
            .map((item) => (
              <StyledCheckbox
                key={item.id}
                onClick={() => this.changeDaysState(item.id, item.dayState)}
                {...item}
              >
                {item.id}
              </StyledCheckbox>
            ))}
          <button disabled={!this.state.stateChanged}>{"Change"}</button>
        </Wrapper>
        {`Availability: ${this.sumAvailability(this.state.days)} %`}
      </div>
    );
  }
}

const Wrapper = styled.div`
  margin-top: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledCheckbox = styled.div`
  margin-top: 2px;
  margin-left: 2px;
  display: flex;
  width: 40px;
  height: 40px;
  background: ${(props) => switchColor(props.dayState)};
  border-radius: 3px;
  transition: all 150ms;
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    `
      pointer-events: none;
      opacity: 0.4;
      background: #000;
      color: #fff;
    `}
`;

function switchColor(itemValue) {
  switch (itemValue) {
    case 0:
      return "#ffc107";
      break;
    case 1:
      return "#f5f5f5";
      break;
    case 2:
      return "#f50057";
      break;
    default:
      return "black";
  }
}
