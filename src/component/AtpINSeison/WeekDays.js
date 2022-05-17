import React from "react";

function WeekDays(props) {
  return (
    <div className="col-lg-4 ">
      <div className="pl-3 react_right_line ">
        <div className="week_details ">
          <div className="week_heading">
            Day &nbsp;{" "}
            <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
          </div>

          {Array.from(Array(7).keys()).map((index) => (
            <button
              className="add_Seven_day_Atp"
              key={index}
              onClick={() => props.annual_training_program_week_days(index)}
            >
              Day {index + 1}
            </button>
          ))}

          <div className="home_sc workout_data_week_day">
            {props.dayLoader === true ? (
              <i
                className="fa fa-spinner fa-spin fa-3x fa-fw"
                style={{
                  color: "var(--appBlue2)",
                  fontSize: "60px",
                }}
              />
            ) : (
              <div>
                {props.dayArray &&
                  props.dayArray.map((item, index) => {
                    return (
                      <div className="home_sc_inner text-center" key={item.id}>
                        <button
                          className="week_day_button"
                          onClick={() => props.weekDayButton(item, index)}
                        >
                          {item.day_number}
                        </button>
                        <div
                          className="d-flex justify-content-between  "
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                          }}
                        >
                          <button
                            type="button"
                            className="btn week_btn"
                            onClick={() =>
                              props.clone_annual_training_program_day(item)
                            }
                          >
                            <i className="fa fa-clone"></i>
                          </button>
                          <button
                            type="button"
                            className="btn week_btn"
                            onClick={() => props.deleteDaysModal(index)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeekDays;
