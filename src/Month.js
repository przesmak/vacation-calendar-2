import { CircularProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

export class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: this.props.days,
      stateChanged: false,
      isLoading: false
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
    let sumOfHours = 0;
    for (const day of activeDays) {
      sumOfDays += 1;
      if (day.dayState !== 0) {
        availability += 1;
      } else {
        sumOfHours += 7.5;
      }
    }
    return {
      hours: sumOfHours,
      availability: Number((1 - availability / sumOfDays) * 100).toPrecision(3)
    };
  }

  handleSubmit() {
    this.setState({ isLoading: true });
    setTimeout(() => this.setState({ isLoading: false }), 2000);
    this.setState({ stateChanged: false });
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
      <Container>
        {this.state.isLoading && <Progress />}
        <Wrapper disabled={this.state.isLoading}>
          {"Jan Kowalski"}
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
          <button
            disabled={!this.state.stateChanged}
            onClick={() => this.handleSubmit()}
          >
            {"Save"}
          </button>
        </Wrapper>
        {`Availability: ${
          this.sumAvailability(this.state.days).availability
        } % Hours available: ${this.sumAvailability(this.state.days).hours} h`}
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
`;

const Progress = styled(CircularProgress)`
  position: absolute;
  top: 2px;
  left: 8px;
  width: 35px;
  height: 35px;
`;
const Wrapper = styled.div`
  margin-top: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  transition: all 300ms;
  ${(props) =>
    props.disabled &&
    `
      pointer-events: none;
      opacity: 0.4;
    `}
`;

const StyledCheckbox = styled.div`
  margin-top: 2px;
  margin-left: 2px;
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
      return "#f5f5f5";
      break;
    case 1:
      return "#f50057";
      break;
    case 2:
      return "#ffc107";
      break;
    default:
      return "black";
  }
}
