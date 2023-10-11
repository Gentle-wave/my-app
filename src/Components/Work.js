import React from "react";
import PickMeals from "../Assets/pick-meals-image.png";
import ChooseMeals from "../Assets/choose-image.png";
import DeliveryMeals from "../Assets/delivery-image.png";

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Free Meals?",
      text: "Yes, you stand the chance to win a free meal delivered to your door step's when your candidate win",
    },
    {
      image: ChooseMeals,
      title: "Choose your prefered candidate",
      text: "you have the power to chhose and vote for any candidate of your choice",
    },
    {
      image: DeliveryMeals,
      title: "Live updates",
      text: "Your votes counts and are updated in real time ",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          you can either join an ongoing competition, create your own personal competition or vote for any candidate of your choicein any competition.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
